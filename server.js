const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend assets from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Detailed Product Catalog Database
const catalog = {
  categories: [
    { id: "tv", name: "Smart TVs", icon: "📺", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80", count: "12 Models Available" },
    { id: "ac", name: "Air Conditioners", icon: "❄️", image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&q=80", count: "8 Models Available" },
    { id: "fan", name: "Ceiling & Pedestal Fans", icon: "🌀", image: "https://images.unsplash.com/photo-1618941709602-92809d813292?w=600&q=80", count: "10 Models Available" },
    { id: "mixer", name: "Mixers & Grinders", icon: "⚡", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&q=80", count: "6 Models Available" }
  ],
  products: {
    tv: [
      { id: "tv-1", brand: "Samsung", name: "Crystal 4K Ultra HD Smart TV", sizes: ["32 inch", "43 inch", "50 inch", "55 inch"], priceRange: "$299 - $699", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80", rating: "4.8 ★", specs: "HDR 10+, Dolby Audio, Tizen OS" },
      { id: "tv-2", brand: "LG", name: "OLED C3 Series 4K TV", sizes: ["43 inch", "50 inch", "55 inch", "65 inch"], priceRange: "$499 - $1,299", image: "https://images.unsplash.com/photo-1577979749830-f1d742b96791?w=600&q=80", rating: "4.9 ★", specs: "120Hz Refresh, webOS, α9 AI Processor" },
      { id: "tv-3", brand: "Sony", name: "Bravia XR Full Array LED", sizes: ["32 inch", "43 inch", "55 inch"], priceRange: "$399 - $899", image: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&q=80", rating: "4.7 ★", specs: "Cognitive Processor XR, Google TV" },
      { id: "tv-4", brand: "TCL", name: "4-Series 4K UHD Smart Roku TV", sizes: ["32 inch", "43 inch", "50 inch"], priceRange: "$199 - $399", image: "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=600&q=80", rating: "4.5 ★", specs: "Built-in Roku, Voice Remote" }
    ],
    ac: [
      { id: "ac-1", brand: "Daikin", name: "Inverter Split Air Conditioner", sizes: ["1.0 Ton", "1.5 Ton", "2.0 Ton"], priceRange: "$450 - $850", image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&q=80", rating: "4.8 ★", specs: "5 Star Rating, PM 2.5 Filter, 3D Airflow" },
      { id: "ac-2", brand: "Voltas", name: "Adjustable Inverter AC", sizes: ["1.2 Ton", "1.5 Ton"], priceRange: "$380 - $620", image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&q=80", rating: "4.6 ★", specs: "Copper Condenser, High Ambient Cooling" },
      { id: "ac-3", brand: "LG", name: "Dual Inverter AI Air Conditioner", sizes: ["1.0 Ton", "1.5 Ton", "2.0 Ton"], priceRange: "$490 - $920", image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&q=80", rating: "4.7 ★", specs: "4-in-1 Convertible, Ocean Black Protection" }
    ],
    fan: [
      { id: "fan-1", brand: "Atomberg", name: "Renesa BLDC Motor Ceiling Fan", sizes: ["1200mm (48\")", "1400mm (56\")"], priceRange: "$65 - $95", image: "https://images.unsplash.com/photo-1618941709602-92809d813292?w=600&q=80", rating: "4.8 ★", specs: "Remote Control, 65% Energy Saving, LED Lights" },
      { id: "fan-2", brand: "Havells", name: "Stealth Air High Speed Fan", sizes: ["1200mm (48\")"], priceRange: "$55 - $80", image: "https://images.unsplash.com/photo-1618941709602-92809d813292?w=600&q=80", rating: "4.6 ★", specs: "Dust Resistant Finish, Ultra Quiet Operation" },
      { id: "fan-3", brand: "Orient Electric", name: "Aeroquiet BLDC Smart Fan", sizes: ["1200mm (48\")", "1400mm (56\")"], priceRange: "$70 - $110", image: "https://images.unsplash.com/photo-1618941709602-92809d813292?w=600&q=80", rating: "4.5 ★", specs: "IoT Enabled, Voice Control with Alexa" }
    ],
    mixer: [
      { id: "mixer-1", brand: "Philips", name: "HL7756/00 Mixer Grinder", sizes: ["500W (3 Jars)", "750W (4 Jars)"], priceRange: "$60 - $95", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&q=80", rating: "4.7 ★", specs: "Turbo Power Motor, Leak-Proof Jars" },
      { id: "mixer-2", brand: "Prestige", name: "Iris 750 Watt Grinder", sizes: ["750W (3 Stainless Steel + 1 Juicer)"], priceRange: "$45 - $70", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&q=80", rating: "4.5 ★", specs: "Ergonomic Handles, Overload Protection" },
      { id: "mixer-3", brand: "Bosch", name: "TrueMixx Pro Mixer Grinder", sizes: ["1000W (4 Jars)"], priceRange: "$110 - $150", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&q=80", rating: "4.9 ★", specs: "PoundingBlade Technology, Hands-free Operation" }
    ]
  }
};

// API Endpoints
app.get('/api/categories', (req, res) => {
  res.json(catalog.categories);
});

app.get('/api/category/:type', (req, res) => {
  const categoryType = req.params.type.toLowerCase();
  const products = catalog.products[categoryType];
  
  if (!products) {
    return res.status(404).json({ error: "Category not found" });
  }
  
  const categoryMeta = catalog.categories.find(c => c.id === categoryType);
  res.json({ metadata: categoryMeta, products });
});

app.get('/api/health', (req, res) => {
  res.json({ status: "UP", timestamp: new Date() });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
