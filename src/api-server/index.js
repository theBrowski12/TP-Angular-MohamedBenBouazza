const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "secret_key";
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const orderRoutes = require('./routes/order.routes');

// In your API endpoint (api-server.js)
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200', // Your Angular app URL
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/api/orders', orderRoutes);
const { router: authRoutes, authenticateToken } = require('./auth');
let cart = [];
let users = [];

app.use(express.static('public')); // Serve static files

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'public/assets/images/products';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'image-' + uniqueSuffix + path.extname(file.originalname));
  }
});

app.use('/api/auth', authRoutes);

let products = [];
products = [
  {
      productID: "P01",
      productTitle: "iPhone 14 Pro",
      productImage: "assets/images/iphone-14.png",
      productPrice: "6999.99",
      productDescription: "Latest iPhone 14 model with advanced features."
    },
    {
      productID: "P02",
      productTitle: "Samsung TV",
      productImage: "assets/images/tv-samsung-48.png",
      productPrice: "12999.99",
      productDescription: "Samsung 48 inch TV with 4K resolution."
    },
    {
      productID: "P03",
      productTitle: "Tablette",
      productImage: "assets/images/samsung-tab-12.png",
      productPrice: "1999.99",
      productDescription: "12 inch tablet with high resolution display."
    },
    {
      productID: "P04",
      productTitle: "Samsung Tab",
      productImage: "assets/images/samsung-tab-12.png",
      productPrice: "2999.99",
      productDescription: "Samsung Tab with 12 inch display and high performance."
    },
    {
      productID: "P05",
      productTitle: "iPhone 14 Pro Max",
      productImage: "assets/images/iphone-14.png",
      productPrice: "8999.99",
      productDescription: "iPhone 14 Pro Max with larger display and advanced features."
    },
    {
      productID: "P06",
      productTitle: "Trotinette Xiaomi",
      productImage: "assets/images/trotinette.jpg",
      productPrice: "5999.99",
      productDescription: "Xiaomi electric scooter with long battery life."
    },
    {
      productID: "P07",
      productTitle: "Trotinette EcoXtreme",
      productImage: "assets/images/trotinette.jpg",
      productPrice: "8999.99",
      productDescription: "Bison electric scooter with fast acceleration and endures heavy weights"
    },
    {
      productID: "P08",
      productTitle: "Xiaomi TV",
      productImage: "assets/images/tv-samsung-48.png",
      productPrice: "3999.99",
      productDescription: "Xiaomi TV, Enjoy High resolution with low price."
    }
];
app.get("/api/products", (req, res) => {
  res.send(products);
});
app.post("/api/cart", (req, res) => {
  cart = req.body;
  setTimeout(() => res.status(201).send(), 20);
});

app.get("/api/cart", (req, res) => res.send(cart));

const port = 3000;
app.get("/api/admin-data", authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }

  res.json({ message: "Bienvenue administrateur", user: req.user });
});

app.get("/api/user-data", authenticateToken, (req, res) => {
  res.json({ message: "Bienvenue utilisateur authentifié", user: req.user });
});


app.listen(port, () => console.log(`API Server listening on port ${port}`));

app.delete('/api/cart/:productId', (req, res) => {
  const productId = req.params.productId;
  cart = cart.filter(item => item.itemProduct.productID !== productId);
  res.sendStatus(200);
});
// api-server.js
app.get('/api/products/search', (req, res) => {
  const term = req.query.q?.toLowerCase() || '';
  
  const results = products.filter(p => 
    p.productTitle.toLowerCase().includes(term) ||
    p.productDescription.toLowerCase().includes(term)
  );

  res.json(results);
});
app.post('/api/products', 
  authenticateToken,
  multer({ storage }).single('image'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    // Generate correct URL for the uploaded image
    const imageUrl = `/assets/images/products/${req.file.filename}`;

    const newProduct = {
      productID: `P${products.length + 1}`,
      productTitle: req.body.productTitle,
      productPrice: parseFloat(req.body.productPrice),
      productImage: imageUrl,  // Use the relative path
      productDescription: req.body.productDescription
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
  }
);