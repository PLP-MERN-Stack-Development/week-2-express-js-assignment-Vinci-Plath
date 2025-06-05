require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/productdb';

const seedProducts = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected');

    await Product.deleteMany({});

    const products = [
  {
    name: 'Apple MacBook Pro 14"',
    description: 'M2 Pro chip, 16GB RAM, 512GB SSD, Space Gray',
    price: 1999,
    category: 'Laptops',
    brand: 'Apple',
    stock: 25,
    images: ['https://example.com/macbook.jpg'],
    rating: 4.8,
    reviews: 124,
    isFeatured: true
  },
  {
    name: 'Samsung Galaxy S23',
    description: '6.1" AMOLED, 128GB, Phantom Black',
    price: 799,
    category: 'Smartphones',
    brand: 'Samsung',
    stock: 50,
    images: ['https://example.com/galaxy-s23.jpg'],
    rating: 4.6,
    reviews: 89,
    isFeatured: false
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Wireless Noise Cancelling Headphones',
    price: 399,
    category: 'Audio',
    brand: 'Sony',
    stock: 75,
    images: ['https://example.com/sony-headphones.jpg'],
    rating: 4.7,
    reviews: 210,
    isFeatured: true
  },
  {
    name: 'Dell UltraSharp Monitor 27"',
    description: 'U2723QE 4K USB-C Hub Monitor',
    price: 649,
    category: 'Monitors',
    brand: 'Dell',
    stock: 30,
    images: ['https://example.com/dell-monitor.jpg'],
    rating: 4.5,
    reviews: 60,
    isFeatured: false
  },
  {
    name: 'HP Spectre x360',
    description: '13.5" 2-in-1 Touch, Intel i7, 16GB RAM, 1TB SSD',
    price: 1599,
    category: 'Laptops',
    brand: 'HP',
    stock: 20,
    images: ['https://example.com/hp-spectre.jpg'],
    rating: 4.4,
    reviews: 85,
    isFeatured: true
  },
  {
    name: 'Google Pixel 8',
    description: '128GB, Hazel, Tensor G3, 6.2" OLED Display',
    price: 699,
    category: 'Smartphones',
    brand: 'Google',
    stock: 40,
    images: ['https://example.com/pixel-8.jpg'],
    rating: 4.3,
    reviews: 70,
    isFeatured: false
  },
  {
    name: 'Bose QuietComfort Earbuds II',
    description: 'Noise Cancelling Wireless Earbuds',
    price: 299,
    category: 'Audio',
    brand: 'Bose',
    stock: 60,
    images: ['https://example.com/bose-qc.jpg'],
    rating: 4.6,
    reviews: 150,
    isFeatured: true
  },
  {
    name: 'LG Ultragear 34" Curved Monitor',
    description: '3440x1440 QHD, 160Hz, Nano IPS Display',
    price: 899,
    category: 'Monitors',
    brand: 'LG',
    stock: 15,
    images: ['https://example.com/lg-ultragear.jpg'],
    rating: 4.7,
    reviews: 55,
    isFeatured: false
  },
  {
    name: 'Asus ROG Zephyrus G14',
    description: 'Gaming Laptop, AMD Ryzen 9, RTX 4060, 1TB SSD',
    price: 1799,
    category: 'Laptops',
    brand: 'Asus',
    stock: 18,
    images: ['https://example.com/asus-rog.jpg'],
    rating: 4.5,
    reviews: 95,
    isFeatured: true
  },
  {
    name: 'OnePlus 12',
    description: 'Snapdragon 8 Gen 3, 256GB, Flowy Emerald',
    price: 849,
    category: 'Smartphones',
    brand: 'OnePlus',
    stock: 35,
    images: ['https://example.com/oneplus-12.jpg'],
    rating: 4.4,
    reviews: 65,
    isFeatured: false
  },
  {
    name: 'JBL Flip 6 Bluetooth Speaker',
    description: 'Waterproof Portable Speaker with Bass Boost',
    price: 129,
    category: 'Audio',
    brand: 'JBL',
    stock: 100,
    images: ['https://example.com/jbl-flip6.jpg'],
    rating: 4.6,
    reviews: 200,
    isFeatured: true
  },
  {
    name: 'BenQ PD3220U Monitor',
    description: '32" 4K UHD, HDR10, USB-C, Designer Monitor',
    price: 1099,
    category: 'Monitors',
    brand: 'BenQ',
    stock: 22,
    images: ['https://example.com/benq-pd3220u.jpg'],
    rating: 4.8,
    reviews: 40,
    isFeatured: false
  }
];


    await Product.insertMany(products);
    console.log('✅ Products inserted successfully!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedProducts();
