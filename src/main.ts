/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';

import { ProductDetailsComponent } from './app/product-details/product-details.component';
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
