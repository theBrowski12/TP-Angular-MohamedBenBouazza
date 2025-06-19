import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order, OrderStatus } from '../../models/order.model';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
  imports: [CommonModule, FormsModule ],
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  isLoading = true;
  statusFilter: OrderStatus | 'ALL' = 'ALL';

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.authService.currentUser$
      .pipe(
        take(1), // Prend la première valeur et complète l'observable
        map(user => user?.username) // Extrait le userId si user existe
      )
      .subscribe(userId => {
        if (userId) {
          this.orderService.getOrders(String(userId)).subscribe({
            next: (orders) => {
              this.orders = orders;
              this.isLoading = false;
            },
            error: (err) => {
              console.error('Failed to load orders', err);
              this.isLoading = false;
            }
          });
        } else {
          this.isLoading = false;
          // Redirigez vers la page de connexion si nécessaire
          // this.router.navigate(['/login']);
        }
      });
  }

  get filteredOrders(): Order[] {
    return this.statusFilter === 'ALL'
      ? this.orders
      : this.orders.filter(o => o.status === this.statusFilter);
  }

  getStatusClass(status: OrderStatus): string {
    return status.toLowerCase().replace('é', 'e');
  }
}