import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://admin:NestFinder2024@localhost:27017/nestfinder?authSource=admin';

const properties = [
  { title: 'Ocean View Penthouse', price: 45000000, location: 'Besant Nagar, Chennai', beds: 5, baths: 5, area: 3200, type: 'sale', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', featured: true },
  { title: 'Luxury Villa with Pool', price: 12000000, location: 'ECR, Chennai', beds: 4, baths: 4, area: 3800, type: 'sale', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', featured: true },
  { title: 'Premium 4BHK Apartment', price: 18500000, location: 'Adyar, Chennai', beds: 4, baths: 3, area: 2100, type: 'sale', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800', featured: false },
  { title: 'Modern 3BHK Apartment', price: 8400000, location: 'Adyar, Chennai', beds: 3, baths: 2, area: 1420, type: 'sale', image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800', featured: false },
  { title: 'Garden View 2BHK', price: 28000, location: 'Anna Nagar, Chennai', beds: 2, baths: 2, area: 980, type: 'rent', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', featured: false },
  { title: 'Skyline 4BHK Residence', price: 22000000, location: 'OMR, Chennai', beds: 4, baths: 4, area: 2600, type: 'sale', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800', featured: false },
  { title: 'Cozy Studio Apartment', price: 15000, location: 'T Nagar, Chennai', beds: 1, baths: 1, area: 550, type: 'rent', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', featured: false },
  { title: 'Lake View 3BHK', price: 9500000, location: 'Porur, Chennai', beds: 3, baths: 2, area: 1550, type: 'sale', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', featured: false },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected!');
    
    const Property = mongoose.models.Property || mongoose.model('Property', new mongoose.Schema({
      title: String, price: Number, location: String, beds: Number, baths: Number,
      area: Number, type: String, image: String, featured: Boolean
    }));
    
    console.log('Deleting existing properties...');
    await Property.deleteMany({});
    
    console.log('Inserting new properties...');
    await Property.insertMany(properties);
    console.log(`${properties.length} properties inserted successfully!`);
    
    console.log('Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
