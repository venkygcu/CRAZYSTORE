/**
 * Sample Product Seeder Script
 * Run this script to add sample products to your database
 * 
 * Usage: node add-sample-products.js
 */

const axios = require('axios');

const API_BASE = 'http://localhost:5001/api/v1';

// Sample products data
const sampleProducts = [
  // Men's Products
  {
    name: "Men's Casual Shirt",
    category: "men",
    image: "https://via.placeholder.com/300x400/4A90E2/ffffff?text=Men's+Shirt",
    new_price: 29.99,
    old_price: 49.99
  },
  {
    name: "Men's Denim Jeans",
    category: "men",
    image: "https://via.placeholder.com/300x400/4A90E2/ffffff?text=Denim+Jeans",
    new_price: 59.99,
    old_price: 89.99
  },
  {
    name: "Men's Leather Jacket",
    category: "men",
    image: "https://via.placeholder.com/300x400/4A90E2/ffffff?text=Leather+Jacket",
    new_price: 149.99,
    old_price: 199.99
  },
  {
    name: "Men's Sneakers",
    category: "men",
    image: "https://via.placeholder.com/300x400/4A90E2/ffffff?text=Sneakers",
    new_price: 79.99,
    old_price: 99.99
  },
  {
    name: "Men's T-Shirt Pack",
    category: "men",
    image: "https://via.placeholder.com/300x400/4A90E2/ffffff?text=T-Shirt+Pack",
    new_price: 39.99,
    old_price: 59.99
  },

  // Women's Products
  {
    name: "Women's Summer Dress",
    category: "women",
    image: "https://via.placeholder.com/300x400/E91E63/ffffff?text=Summer+Dress",
    new_price: 49.99,
    old_price: 79.99
  },
  {
    name: "Women's Handbag",
    category: "women",
    image: "https://via.placeholder.com/300x400/E91E63/ffffff?text=Handbag",
    new_price: 89.99,
    old_price: 129.99
  },
  {
    name: "Women's High Heels",
    category: "women",
    image: "https://via.placeholder.com/300x400/E91E63/ffffff?text=High+Heels",
    new_price: 69.99,
    old_price: 99.99
  },
  {
    name: "Women's Blouse",
    category: "women",
    image: "https://via.placeholder.com/300x400/E91E63/ffffff?text=Blouse",
    new_price: 34.99,
    old_price: 54.99
  },
  {
    name: "Women's Jeans",
    category: "women",
    image: "https://via.placeholder.com/300x400/E91E63/ffffff?text=Women's+Jeans",
    new_price: 54.99,
    old_price: 84.99
  },

  // Kids Products
  {
    name: "Kids T-Shirt",
    category: "kid",
    image: "https://via.placeholder.com/300x400/FFC107/ffffff?text=Kids+T-Shirt",
    new_price: 19.99,
    old_price: 29.99
  },
  {
    name: "Kids Shorts",
    category: "kid",
    image: "https://via.placeholder.com/300x400/FFC107/ffffff?text=Kids+Shorts",
    new_price: 24.99,
    old_price: 34.99
  },
  {
    name: "Kids Sneakers",
    category: "kid",
    image: "https://via.placeholder.com/300x400/FFC107/ffffff?text=Kids+Sneakers",
    new_price: 39.99,
    old_price: 54.99
  },
  {
    name: "Kids Jacket",
    category: "kid",
    image: "https://via.placeholder.com/300x400/FFC107/ffffff?text=Kids+Jacket",
    new_price: 44.99,
    old_price: 64.99
  },
  {
    name: "Kids Backpack",
    category: "kid",
    image: "https://via.placeholder.com/300x400/FFC107/ffffff?text=Kids+Backpack",
    new_price: 29.99,
    old_price: 44.99
  }
];

async function seedProducts() {
  console.log('🌱 Starting product seeding...\n');

  // Step 1: Create admin account
  console.log('Step 1: Creating admin account...');
  let authToken;
  
  try {
    const signupResponse = await axios.post(`${API_BASE}/auth/signup`, {
      username: 'Admin',
      email: 'gunjivenkatesh072@gmail.com',
      password: 'admin123'
    });
    authToken = signupResponse.data.token;
    console.log('✅ Admin account created successfully\n');
  } catch (error) {
    if (error.response?.status === 409) {
      console.log('ℹ️  Admin account already exists, logging in...');
      try {
        const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
          email: 'gunjivenkatesh072@gmail.com',
          password: 'admin123'
        });
        authToken = loginResponse.data.token;
        console.log('✅ Logged in successfully\n');
      } catch (loginError) {
        console.error('❌ Failed to login. Please check credentials.');
        console.error('Error:', loginError.response?.data || loginError.message);
        return;
      }
    } else {
      console.error('❌ Failed to create admin account');
      console.error('Error:', error.response?.data || error.message);
      return;
    }
  }

  // Step 2: Add products
  console.log('Step 2: Adding sample products...\n');
  let successCount = 0;
  let failCount = 0;

  for (const product of sampleProducts) {
    try {
      await axios.post(`${API_BASE}/products`, product, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(`✅ Added: ${product.name}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to add: ${product.name}`);
      console.error('   Error:', error.response?.data?.message || error.message);
      failCount++;
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Seeding Summary:');
  console.log('='.repeat(50));
  console.log(`✅ Successfully added: ${successCount} products`);
  console.log(`❌ Failed: ${failCount} products`);
  console.log(`📦 Total: ${sampleProducts.length} products`);
  console.log('='.repeat(50));
  console.log('\n🎉 Seeding complete!');
  console.log('\n📝 Admin Credentials:');
  console.log('   Email: gunjivenkatesh072@gmail.com');
  console.log('   Password: admin123');
  console.log('\n🌐 Access your store at: http://localhost:5001');
}

// Run the seeder
seedProducts().catch(error => {
  console.error('\n❌ Seeding failed with error:');
  console.error(error);
  process.exit(1);
});