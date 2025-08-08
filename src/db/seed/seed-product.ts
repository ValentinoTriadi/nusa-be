import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';

import { db } from '../drizzle';
import { product, store, user, wholesalePrice } from '../schema';

// Types for CSV data
interface UserCSV {
  name: string;
  email: string;
  emailVerified: string;
  bio: string;
}

interface StoreCSV {
  userEmail: string;
  storeName: string;
  businessType: string;
  businessDescription: string;
  description: string;
  phoneNumber: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  tags: string;
}

interface ProductCSV {
  name: string;
  description: string;
  price: string;
  imageUrls: string;
  unit: string;
  stock: string;
  tags: string;
  storeEmail: string;
}

interface WholesalePriceCSV {
  productName: string;
  minQuantity: string;
  maxQuantity: string;
  price: string;
}

// Helper function to read CSV files
function readCSV<T>(filePath: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data: T) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

export async function seedProducts() {
  console.log('🌱 Seeding products...');

  try {
    const csvDir = path.join(__dirname, 'csv');

    // Read CSV files
    console.log('📖 Reading CSV files...');
    const usersData = await readCSV<UserCSV>(path.join(csvDir, 'users.csv'));
    const storesData = await readCSV<StoreCSV>(path.join(csvDir, 'stores.csv'));
    const productsData = await readCSV<ProductCSV>(
      path.join(csvDir, 'products.csv'),
    );
    const wholesalePricesData = await readCSV<WholesalePriceCSV>(
      path.join(csvDir, 'wholesale-prices.csv'),
    );

    console.log(
      `📊 Loaded ${usersData.length} users, ${storesData.length} stores, ${productsData.length} products, ${wholesalePricesData.length} wholesale prices`,
    );

    // Create users from CSV
    const sampleUsers = await db
      .insert(user)
      .values(
        usersData.map((userData) => ({
          name: userData.name,
          email: userData.email,
          emailVerified: userData.emailVerified === 'true',
          bio: userData.bio,
        })),
      )
      .returning();

    console.log('✅ Created sample users');

    // Create a map of email to user ID for easy lookup
    const userEmailToId = new Map<string, string>();
    sampleUsers.forEach((user) => {
      userEmailToId.set(user.email, user.id);
    });

    // Create stores from CSVa
    const sampleStores = await db
      .insert(store)
      .values(
        storesData.map((storeData) => ({
          userId: userEmailToId.get(storeData.userEmail)!,
          storeName: storeData.storeName,
          businessType: storeData.businessType,
          businessDescription: storeData.businessDescription,
          description: storeData.description,
          phoneNumber: storeData.phoneNumber,
          address: storeData.address,
          city: storeData.city,
          province: storeData.province,
          postalCode: storeData.postalCode,
          tags: storeData.tags.split(',').map((tag) => tag.trim()),
        })),
      )
      .returning();

    console.log('✅ Created sample stores');

    // Create a map of user email to store ID for easy lookup
    const userEmailToStoreId = new Map<string, string>();
    storesData.forEach((storeData, index) => {
      userEmailToStoreId.set(storeData.userEmail, sampleStores[index].id);
    });

    // Create products from CSV
    const sampleProducts = await db
      .insert(product)
      .values(
        productsData.map((productData) => ({
          name: productData.name,
          description: productData.description,
          price: parseInt(productData.price),
          imageUrls: productData.imageUrls.split(',').map((url) => url.trim()),
          unit: productData.unit,
          stock: parseInt(productData.stock),
          tags: productData.tags.split(',').map((tag) => tag.trim()),
          storeId: userEmailToStoreId.get(productData.storeEmail)!,
        })),
      )
      .returning();

    console.log('✅ Created sample products');

    // Create a map of product name to product ID for wholesale prices
    const productNameToId = new Map<string, string>();
    sampleProducts.forEach((product) => {
      productNameToId.set(product.name!, product.id);
    });

    // Create wholesale pricing from CSV
    const wholesalePricingData = wholesalePricesData.map((wholesaleData) => ({
      productId: productNameToId.get(wholesaleData.productName)!,
      minQuantity: parseInt(wholesaleData.minQuantity),
      maxQuantity: parseInt(wholesaleData.maxQuantity),
      price: parseInt(wholesaleData.price),
    }));

    await db.insert(wholesalePrice).values(wholesalePricingData);

    console.log('✅ Created wholesale pricing');

    console.log('🎉 Product seeding completed successfully!');
    console.log(
      `Created ${sampleUsers.length} users, ${sampleStores.length} stores, ${sampleProducts.length} products`,
    );

    return {
      users: sampleUsers,
      stores: sampleStores,
      products: sampleProducts,
    };
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    throw error;
  }
}

// Run the seeding if this file is executed directly
if (require.main === module) {
  seedProducts()
    .then(() => {
      console.log('Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}
