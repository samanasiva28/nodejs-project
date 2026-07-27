const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mock Database for Home Appliances
const appliances = [
  {
    id: 1,
    name: "Smart Refrigerator 500L",
    category: "Kitchen",
    price: 1299,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=500&q=80",
    description: "Multi-door refrigerator with AI temperature control and touch display."
  },
  {
    id: 2,
    name: "Front Load Washing Machine 8kg",
    category: "Laundry",
    price: 749,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&q=80",
    description: "Inverter direct drive with steam wash and Wi-Fi connectivity."
  },
  {
    id: 3,
    name: "Smart Inverter Air Conditioner 1.5 Ton",
    category: "Climate",
    price: 899,
    status: "Limited Stock",
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=500&q=80",
    description: "Fast cooling dual inverter AC with voice assistant support."
  },
  {
    id: 4,
    name: "Robotic Vacuum Cleaner Pro",
    category: "Cleaning",
    price: 499,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&q=80",
    description: "LiDAR navigation, mop feature, and auto-empty dock platform."
  }
];

// API Routes
app.get('/api/appliances', (req, res) => {
  res.json(appliances);
});

app.get('/api/health', (req, res) => {
  res.json({ status: "UP", timestamp: new Date() });
});

// Serve Frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
