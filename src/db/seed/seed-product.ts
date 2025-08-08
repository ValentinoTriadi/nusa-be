import { db } from '../drizzle';
import { product, store, user, wholesalePrice } from '../schema';

export async function seedProducts() {
  console.log('🌱 Seeding products...');

  try {
    // First, create sample users
    const sampleUsers = await db
      .insert(user)
      .values([
        {
          name: 'Budi Santoso',
          email: 'budi@example.com',
          emailVerified: true,
          bio: 'Petani organik dari Bogor',
        },
        {
          name: 'Sari Dewi',
          email: 'sari@example.com',
          emailVerified: true,
          bio: 'Pengusaha produk lokal',
        },
        {
          name: 'Ahmad Rahman',
          email: 'ahmad@example.com',
          emailVerified: true,
          bio: 'Distributor produk pertanian',
        },
      ])
      .returning();

    console.log('✅ Created sample users');

    // Create sample stores
    const sampleStores = await db
      .insert(store)
      .values([
        {
          userId: sampleUsers[0].id,
          storeName: 'Berkah Jaya',
          businessType: 'Pertanian',
          businessDescription:
            'Produsen gula aren organik dan produk pertanian',
          description:
            'Toko yang menyediakan produk organik berkualitas tinggi',
          phoneNumber: '+628123456789',
          address: 'Jl. Raya Ciawi No. 123',
          city: 'Bogor',
          province: 'Jawa Barat',
          postalCode: '16720',
          tags: ['organik', 'lokal', 'pertanian'],
        },
        {
          userId: sampleUsers[1].id,
          storeName: 'Sari Organik',
          businessType: 'UMKM',
          businessDescription: 'Pengolah produk organik lokal',
          description: 'Spesialis tepung dan produk olahan organik',
          phoneNumber: '+628987654321',
          address: 'Jl. Pajajaran No. 456',
          city: 'Bandung',
          province: 'Jawa Barat',
          postalCode: '40112',
          tags: ['organik', 'tepung', 'olahan'],
        },
        {
          userId: sampleUsers[2].id,
          storeName: 'Nusantara Fresh',
          businessType: 'Distributor',
          businessDescription: 'Distributor produk segar nusantara',
          description:
            'Menyediakan berbagai produk segar dari seluruh Indonesia',
          phoneNumber: '+628111222333',
          address: 'Jl. Sudirman No. 789',
          city: 'Jakarta',
          province: 'DKI Jakarta',
          postalCode: '10220',
          tags: ['segar', 'distributor', 'nusantara'],
        },
      ])
      .returning();

    console.log('✅ Created sample stores');

    // Create sample products
    const sampleProducts = await db
      .insert(product)
      .values([
        {
          name: 'Gula Aren Organik Premium',
          description:
            'Gula aren organik premium dari petani lokal Bogor. Diproses secara tradisional tanpa bahan kimia, memberikan rasa manis alami yang sempurna untuk berbagai produk makanan dan minuman.',
          price: 15000, // Base price in rupiah
          imageUrls: [
            '/images/gula-aren-1.jpg',
            '/images/gula-aren-2.jpg',
            '/images/gula-aren-3.jpg',
          ],
          unit: 'kg',
          stock: 2500,
          tags: ['organik', 'gula aren', 'premium', 'bogor'],
          storeId: sampleStores[0].id,
        },
        {
          name: 'Tepung Singkong',
          description:
            'Tepung singkong berkualitas tinggi hasil olahan tradisional. Bebas gluten dan cocok untuk berbagai kebutuhan pembuatan makanan tradisional maupun modern.',
          price: 12000,
          imageUrls: [
            '/images/tepung-singkong-1.jpg',
            '/images/tepung-singkong-2.jpg',
          ],
          unit: 'kg',
          stock: 1500,
          tags: ['tepung', 'singkong', 'bebas gluten', 'tradisional'],
          storeId: sampleStores[1].id,
        },
        {
          name: 'Beras Merah Organik',
          description:
            'Beras merah organik pilihan dari sawah organik Jawa Barat. Kaya nutrisi dan serat, cocok untuk diet sehat dan gaya hidup organik.',
          price: 18000,
          imageUrls: [
            '/images/beras-merah-1.jpg',
            '/images/beras-merah-2.jpg',
            '/images/beras-merah-3.jpg',
          ],
          unit: 'kg',
          stock: 3000,
          tags: ['beras', 'merah', 'organik', 'sehat'],
          storeId: sampleStores[0].id,
        },
        {
          name: 'Minyak Kelapa Virgin',
          description:
            'Minyak kelapa virgin murni hasil ekstraksi dingin. Tidak menggunakan bahan kimia dan mempertahankan nutrisi alami kelapa.',
          price: 45000,
          imageUrls: [
            '/images/minyak-kelapa-1.jpg',
            '/images/minyak-kelapa-2.jpg',
          ],
          unit: 'liter',
          stock: 800,
          tags: ['minyak kelapa', 'virgin', 'ekstraksi dingin', 'murni'],
          storeId: sampleStores[2].id,
        },
        {
          name: 'Kopi Arabika Aceh',
          description:
            'Kopi arabika premium dari dataran tinggi Aceh. Memiliki cita rasa yang khas dengan aroma yang harum dan rasa yang tidak terlalu pahit.',
          price: 85000,
          imageUrls: [
            '/images/kopi-arabika-1.jpg',
            '/images/kopi-arabika-2.jpg',
            '/images/kopi-arabika-3.jpg',
          ],
          unit: 'kg',
          stock: 500,
          tags: ['kopi', 'arabika', 'aceh', 'premium'],
          storeId: sampleStores[2].id,
        },
        {
          name: 'Tepung Terigu Protein Tinggi',
          description:
            'Tepung terigu dengan kandungan protein tinggi, cocok untuk pembuatan roti dan kue yang membutuhkan tekstur yang elastis.',
          price: 14000,
          imageUrls: [
            '/images/tepung-terigu-1.jpg',
            '/images/tepung-terigu-2.jpg',
          ],
          unit: 'kg',
          stock: 2000,
          tags: ['tepung terigu', 'protein tinggi', 'roti', 'kue'],
          storeId: sampleStores[1].id,
        },
      ])
      .returning();

    console.log('✅ Created sample products');

    // Create wholesale pricing for each product
    const wholesalePricingData = [
      // Gula Aren Organik Premium
      {
        productId: sampleProducts[0].id,
        minQuantity: 50,
        maxQuantity: 99,
        price: 15000,
      },
      {
        productId: sampleProducts[0].id,
        minQuantity: 100,
        maxQuantity: 499,
        price: 13000,
      },
      {
        productId: sampleProducts[0].id,
        minQuantity: 500,
        maxQuantity: 999,
        price: 11000,
      },
      // Tepung Singkong
      {
        productId: sampleProducts[1].id,
        minQuantity: 50,
        maxQuantity: 99,
        price: 12000,
      },
      {
        productId: sampleProducts[1].id,
        minQuantity: 100,
        maxQuantity: 499,
        price: 10000,
      },
      {
        productId: sampleProducts[1].id,
        minQuantity: 500,
        maxQuantity: 999,
        price: 8000,
      },
      // Beras Merah Organik
      {
        productId: sampleProducts[2].id,
        minQuantity: 25,
        maxQuantity: 49,
        price: 18000,
      },
      {
        productId: sampleProducts[2].id,
        minQuantity: 50,
        maxQuantity: 199,
        price: 16000,
      },
      {
        productId: sampleProducts[2].id,
        minQuantity: 200,
        maxQuantity: 499,
        price: 14000,
      },
      // Minyak Kelapa Virgin
      {
        productId: sampleProducts[3].id,
        minQuantity: 10,
        maxQuantity: 24,
        price: 45000,
      },
      {
        productId: sampleProducts[3].id,
        minQuantity: 25,
        maxQuantity: 99,
        price: 42000,
      },
      {
        productId: sampleProducts[3].id,
        minQuantity: 100,
        maxQuantity: 199,
        price: 38000,
      },
      // Kopi Arabika Aceh
      {
        productId: sampleProducts[4].id,
        minQuantity: 5,
        maxQuantity: 9,
        price: 85000,
      },
      {
        productId: sampleProducts[4].id,
        minQuantity: 10,
        maxQuantity: 49,
        price: 80000,
      },
      {
        productId: sampleProducts[4].id,
        minQuantity: 50,
        maxQuantity: 99,
        price: 75000,
      },
      // Tepung Terigu Protein Tinggi
      {
        productId: sampleProducts[5].id,
        minQuantity: 25,
        maxQuantity: 49,
        price: 14000,
      },
      {
        productId: sampleProducts[5].id,
        minQuantity: 50,
        maxQuantity: 199,
        price: 12500,
      },
      {
        productId: sampleProducts[5].id,
        minQuantity: 200,
        maxQuantity: 499,
        price: 11000,
      },
    ];

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
