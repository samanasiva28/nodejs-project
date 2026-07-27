const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 1. Serve ALL static files from the 'public' folder first
app.use(express.static(path.join(__dirname, 'public')));

// Mock Database
const appliances = [
  {
    id: 1,
    name: "Ultra HD 4K Smart OLED TV 55\"",
    category: "Entertainment",
    price: 1199,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80",
    description: "Experience vibrant colors and deep blacks with Dolby Atmos sound and built-in streaming apps."
  },
  {
    id: 2,
    name: "Smart Refrigerator 500L",
    category: "Kitchen",
    price: 1299,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=600&q=80",
    description: "Multi-door refrigerator with AI temperature control and touch display."
  },
  {
    id: 3,
    name: "Front Load Washing Machine 8kg",
    category: "Laundry",
    price: 749,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&q=80",
    description: "Inverter direct drive with steam wash and Wi-Fi connectivity."
  },
  {
    id: 4,
    name: "Robotic Vacuum Cleaner Pro",
    category: "Cleaning",
    price: 499,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&q=80",
    description: "LiDAR navigation, mop feature, and auto-empty dock platform."
  }
];

// 2. API Routes
app.get('/api/appliances', (req, res) => {
  res.json(appliances);
});

app.get('/api/appliances/:id', (req, res) => {
  const item = appliances.find(a => a.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: "Product not found" });
  res.json(item);
});

app.get('/api/health', (req, res) => {
  res.json({ status: "UP", timestamp: new Date() });
});

// 3. Fallback Route: Direct unknown requests to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
