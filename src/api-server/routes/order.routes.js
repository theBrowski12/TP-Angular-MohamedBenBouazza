const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Order = require('../models/order.model');
const { authenticateToken } = require('../auth');
// Créer une commande
router.post('/', authenticateToken, async (req, res) => {
  try {
    const order = new Order({
      id: uuidv4(),
      userId: req.user.username, 
      ...req.body,
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Récupérer les commandes d'un utilisateur
router.get('/', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mettre à jour le statut
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { id: req.params.id, userId: req.user.userId },
      { status: req.body.status, updatedAt: new Date() },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;