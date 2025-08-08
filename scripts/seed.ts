#!/usr/bin/env bun
import { seedProducts } from '../src/db/seed/seed-product';

async function main() {
  console.log('🚀 Starting database seeding...');

  try {
    await seedProducts();
    console.log('✅ All seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

main();
