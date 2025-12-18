import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Product from "../models/Product.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/time-to-buy";

const products = [
  // Watches & Clocks (3 items)
  {
    name: "Classic Analog Watch",
    description: "Timeless design with leather strap and stainless steel case. Perfect for formal occasions and everyday wear. Water-resistant up to 50 meters.",
    category: "Watches",
    brand: "TimeCraft",
    price: 2499,
    image:
      "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress",
    rating: 4.5,
    numReviews: 12,
    countInStock: 50,
    isFeatured: true,
  },
  {
    name: "Smart Fitness Watch",
    description: "Track your steps, heart rate, and notifications on the go. Built-in GPS, sleep tracking, and 7-day battery life. Compatible with iOS and Android.",
    category: "Smartwatches",
    brand: "FitPulse",
    price: 4999,
    image:
      "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress",
    rating: 4.2,
    numReviews: 30,
    countInStock: 35,
    isFeatured: true,
  },
  {
    name: "Minimalist Wall Clock",
    description: "Modern wall clock perfect for living rooms and offices. Silent quartz movement, 12-inch diameter, easy to read numbers.",
    category: "Clocks",
    brand: "UrbanTime",
    price: 1499,
    image:
      "https://images.pexels.com/photos/707582/pexels-photo-707582.jpeg?auto=compress",
    rating: 4.0,
    numReviews: 8,
    countInStock: 40,
    isFeatured: false,
  },
  // Shoes (5 items)
  {
    name: "Running Shoes Pro",
    description: "Lightweight running shoes with advanced cushioning technology. Breathable mesh upper, flexible sole, perfect for jogging and daily workouts.",
    category: "Shoes",
    brand: "RunFast",
    price: 3499,
    image:
      "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress",
    rating: 4.6,
    numReviews: 45,
    countInStock: 60,
    isFeatured: true,
  },
  {
    name: "Casual Sneakers",
    description: "Comfortable everyday sneakers with classic design. Durable canvas upper, rubber sole, available in multiple colors. Perfect for casual wear.",
    category: "Shoes",
    brand: "StreetStyle",
    price: 1999,
    image:
      "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress",
    rating: 4.4,
    numReviews: 38,
    countInStock: 75,
    isFeatured: false,
  },
  {
    name: "Formal Leather Shoes",
    description: "Premium leather formal shoes with polished finish. Comfortable fit, durable construction, ideal for business meetings and formal events.",
    category: "Shoes",
    brand: "EliteStep",
    price: 4999,
    image:
      "https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress",
    rating: 4.7,
    numReviews: 28,
    countInStock: 40,
    isFeatured: true,
  },
  {
    name: "Cricket Shoes",
    description: "Professional cricket shoes with spikes for excellent grip on the pitch. Lightweight design, ankle support, and superior traction for quick movements and stability during matches.",
    category: "Shoes",
    brand: "CricketPro",
    price: 5999,
    image:
      "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.5,
    numReviews: 52,
    countInStock: 35,
    isFeatured: false,
  },
  {
    name: "casual Boots",
    description: "Rugged hiking boots with waterproof membrane. Durable construction, excellent traction, ankle support. Perfect for trails and outdoor adventures.",
    category: "Shoes",
    brand: "TrailMaster",
    price: 4499,
    image:
      "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress",
    rating: 4.8,
    numReviews: 33,
    countInStock: 25,
    isFeatured: true,
  },
  // Electronics (3 items)
  {
    name: "iPhone 16 Pro Max",
    description: "Latest flagship iPhone with 256GB storage, 6.9-inch Super Retina XDR display, Pro camera system with 5x optical zoom, A18 Pro chip, and all-day battery life.",
    category: "Electronics",
    brand: "Apple",
    price: 134999,
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop",
    rating: 4.8,
    numReviews: 145,
    countInStock: 25,
    isFeatured: true,
  },
  {
    name: "HP Victus",
    description: "High-performance gaming laptop with RTX graphics, 16GB RAM, 1TB SSD, 15.6-inch 144Hz display. Perfect for gaming, video editing, and multitasking.",
    category: "Electronics",
    brand: "HP",
    price: 89999,
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop",
    rating: 4.6,
    numReviews: 89,
    countInStock: 20,
    isFeatured: true,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Premium flagship smartphone with 256GB storage, 6.8-inch Dynamic AMOLED 2X display, 200MP camera system, S Pen support, and Snapdragon 8 Gen 3 processor.",
    category: "Electronics",
    brand: "Samsung",
    price: 124999,
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop",
    rating: 4.7,
    numReviews: 112,
    countInStock: 28,
    isFeatured: true,
  },
  {
    name: "HP EliteBook 840G",
    description: "Business laptop with Intel Core i7 processor, 16GB RAM, 512GB SSD, 14-inch FHD display, and enterprise-grade security features. Perfect for professionals.",
    category: "Electronics",
    brand: "HP",
    price: 89999,
    image:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop",
    rating: 4.5,
    numReviews: 67,
    countInStock: 18,
    isFeatured: false,
  },
  {
    name: "55-inch 4K Smart TV",
    description: "Ultra HD 4K Smart TV with HDR, built-in streaming apps, voice control, and Dolby Audio. Perfect for movies, gaming, and streaming your favorite shows.",
    category: "Electronics",
    brand: "VisionTech",
    price: 54999,
    image:
      "https://unsplash.com/photos/a-flat-screen-tv-sitting-on-top-of-a-entertainment-center-zULmo_Yxu-0",
    rating: 4.8,
    numReviews: 67,
    countInStock: 15,
    isFeatured: true,
  },
  {
    name: "Double Door Refrigerator",
    description: "Large capacity double door refrigerator with frost-free technology, energy-efficient inverter compressor, and adjustable shelves. Perfect for modern kitchens.",
    category: "Electronics",
    brand: "CoolTech",
    price: 34999,
    image:
      "https://unsplash.com/photos/black-top-mount-refrigerator-with-dispenser-xK8QreBEjcc",
    rating: 4.6,
    numReviews: 94,
    countInStock: 22,
    isFeatured: true,
  },
  {
    name: "Front Load Washing Machine",
    description: "8kg front load washing machine with inverter technology, multiple wash programs, and steam wash feature. Energy-efficient and gentle on clothes.",
    category: "Electronics",
    brand: "WashPro",
    price: 32999,
    image:
      "https://unsplash.com/photos/white-front-load-washing-machine-beside-white-wooden-cabinet-vkpVPcIBU5U",
    rating: 4.5,
    numReviews: 78,
    countInStock: 30,
    isFeatured: false,
  },
  {
    name: "1.5 Ton Split AC",
    description: "Energy-efficient 1.5 ton split air conditioner with inverter technology, 5-star rating, Wi-Fi connectivity, and advanced air purification. Perfect for medium-sized rooms.",
    category: "Electronics",
    brand: "CoolAir",
    price: 39999,
    image:
      "https://unsplash.com/photos/a-person-holding-a-remote-control-in-front-of-a-wall-mounted-air-conditioner-3iLFQj2bXq0",
    rating: 4.7,
    numReviews: 112,
    countInStock: 18,
    isFeatured: true,
  },
  {
    name: "Boat Airpods",
    description: "Wireless earbuds with active noise cancellation, 40 hours battery life, IPX7 water resistance, and premium sound quality. Perfect for music lovers and fitness enthusiasts.",
    category: "Electronics",
    brand: "Boat",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&auto=format&fit=crop",
    rating: 4.5,
    numReviews: 156,
    countInStock: 80,
    isFeatured: true,
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with 360-degree sound, 20W output, 12 hours battery life, and IPX7 waterproof rating. Perfect for parties and outdoor adventures.",
    category: "Electronics",
    brand: "SoundWave",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop",
    rating: 4.4,
    numReviews: 98,
    countInStock: 65,
    isFeatured: false,
  },
  {
    name: "PlayStation 5",
    description: "Next-generation gaming console with ultra-high-speed SSD, ray tracing, 4K gaming, and immersive 3D audio. Includes DualSense wireless controller and supports PS4 games.",
    category: "Electronics",
    brand: "Sony",
    price: 54999,
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop",
    rating: 4.9,
    numReviews: 234,
    countInStock: 15,
    isFeatured: true,
  },
  // Clothes (5 items)
  {
    name: "Cotton T-Shirt",
    description: "Comfortable 100% cotton t-shirt with modern fit. Soft fabric, breathable, available in multiple colors. Perfect for casual everyday wear.",
    category: "Clothes",
    brand: "ComfortWear",
    price: 599,
    image:
      "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.3,
    numReviews: 95,
    countInStock: 100,
    isFeatured: false,
  },
  {
    name: "Denim Jeans",
    description: "Classic fit denim jeans with stretch fabric. Durable construction, comfortable waistband, versatile style that pairs with anything.",
    category: "Clothes",
    brand: "DenimCo",
    price: 1999,
    image:
      "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress",
    rating: 4.5,
    numReviews: 78,
    countInStock: 80,
    isFeatured: true,
  },
  {
    name: "Formal Shirt",
    description: "Premium cotton formal shirt with button-down collar. Wrinkle-resistant fabric, perfect fit, ideal for office and formal occasions.",
    category: "Clothes",
    brand: "FormalFit",
    price: 1499,
    image:
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.4,
    numReviews: 62,
    countInStock: 70,
    isFeatured: false,
  },
  {
    name: "Hooded Sweatshirt",
    description: "Warm and cozy hooded sweatshirt with front pocket. Soft fleece lining, adjustable drawstring hood, perfect for cool weather and casual style.",
    category: "Clothes",
    brand: "CozyWear",
    price: 2499,
    image:
      "https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress",
    rating: 4.6,
    numReviews: 54,
    countInStock: 55,
    isFeatured: true,
  },
  {
    name: "Summer Dress",
    description: "Elegant summer dress with floral pattern. Lightweight fabric, comfortable fit, perfect for parties, dates, and special occasions.",
    category: "Clothes",
    brand: "StyleFashion",
    price: 1799,
    image:
      "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress",
    rating: 4.5,
    numReviews: 41,
    countInStock: 45,
    isFeatured: false,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI, { dbName: "time-to-buy" });

    await User.deleteMany();
    await Product.deleteMany();

    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@timetobuy.com",
      password: "Password123",
      isAdmin: true,
    });

    await Product.insertMany(products);

    console.log("Seed data created.");
    console.log("Admin credentials -> Email: admin@timetobuy.com  Password: Password123");

    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
};

seed();


