import mongoose from 'mongoose';
import Property from '../lib/models/Property';

const properties = [
  { 
    title: 'Ocean View Penthouse', 
    price: 45000000, 
    location: 'Besant Nagar, Chennai', 
    beds: 5, 
    baths: 5, 
    area: 3200, 
    type: 'sale', 
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', 
    featured: true,
    description: 'Luxury penthouse with stunning ocean views',
    amenities: ['Swimming Pool', 'Gym', 'Parking', 'Security']
  },
  { 
    title: 'Luxury Villa with Pool', 
    price: 12000000, 
    location: 'ECR, Chennai', 
    beds: 4, 
    baths: 4, 
    area: 3800, 
    type: 'sale', 
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', 
    featured: true,
    description: 'Beautiful villa with private pool',
    amenities: ['Private Pool', 'Garden', 'Smart Home']
  },
  { 
    title: 'Premium 4BHK Apartment', 
    price: 18500000, 
    location: 'Adyar, Chennai', 
    beds: 4, 
    baths: 3, 
    area: 2100, 
    type: 'sale', 
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800', 
    featured: false,
    description: 'Spacious apartment in prime location',
    amenities: ['Club House', 'Gym', 'Parking']
  },
  { 
    title: 'Modern 3BHK Apartment', 
    price: 8400000, 
    location: 'Adyar, Chennai', 
    beds: 3, 
    baths: 2, 
    area: 1420, 
    type: 'sale', 
    image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800', 
    featured: false,
    description: 'Modern apartment with premium finishes',
    amenities: ['Swimming Pool', 'Gym', 'Parking']
  },
  { 
    title: 'Garden View 2BHK', 
    price: 28000, 
    location: 'Anna Nagar, Chennai', 
    beds: 2, 
    baths: 2, 
    area: 980, 
    type: 'rent', 
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 
    featured: false,
    description: 'Beautiful apartment with garden views',
    amenities: ['Garden View', 'Parking', 'Lift']
  },
  { 
    title: 'Skyline 4BHK Residence', 
    price: 22000000, 
    location: 'OMR, Chennai', 
    beds: 4, 
    baths: 4, 
    area: 2600, 
    type: 'sale', 
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800', 
    featured: false,
    description: 'Luxury residence with skyline views',
    amenities: ['Infinity Pool', 'Club House', 'Concierge']
  },
  { 
    title: 'Cozy Studio Apartment', 
    price: 15000, 
    location: 'T Nagar, Chennai', 
    beds: 1, 
    baths: 1, 
    area: 550, 
    type: 'rent', 
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', 
    featured: false,
    description: 'Perfect for singles or couples',
    amenities: ['Fully Furnished', 'WiFi', 'Security']
  },
  { 
    title: 'Lake View 3BHK', 
    price: 9500000, 
    location: 'Porur, Chennai', 
    beds: 3, 
    baths: 2, 
    area: 1550, 
    type: 'sale', 
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', 
    featured: false,
    description: 'Peaceful lake view apartment',
    amenities: ['Lake View', 'Park', 'Walking Track']
  },
  { 
    title: 'Fully Furnished 3BHK', 
    price: 45000, 
    location: 'Velachery, Chennai', 
    beds: 3, 
    baths: 2, 
    area: 1350, 
    type: 'rent', 
    image: 'https://images.unsplash.com/photo-1501183007986-d0d080b147f9?w=800', 
    featured: false,
    description: 'Ready to move-in furnished apartment',
    amenities: ['Fully Furnished', 'AC', 'Geyser']
  },
  { 
    title: 'Beachfront Villa', 
    price: 55000000, 
    location: 'ECR, Chennai', 
    beds: 6, 
    baths: 6, 
    area: 5200, 
    type: 'sale', 
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', 
    featured: true,
    description: 'Luxury beachfront property',
    amenities: ['Beach Access', 'Private Pool', 'Home Theater']
  },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect('mongodb://localhost:27017/nestfinder');
    console.log('Connected!');
    
    console.log('Deleting existing properties...');
    await Property.deleteMany({});
    console.log('Existing properties deleted!');
    
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
