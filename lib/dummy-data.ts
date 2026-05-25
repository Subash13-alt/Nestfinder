export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  area: string;
  type: 'sale' | 'rent' | 'featured';
  image: string;
}

export interface Agent {
  id: string;
  name: string;
  initials: string;
  city: string;
  rating: number;
  deals: number;
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern 3BHK Apartment',
    price: '₹84,00,000',
    location: 'Adyar, Chennai',
    beds: 3,
    baths: 2,
    area: '1,420 sq.ft',
    type: 'sale',
    image: 'https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/44b8c74c-769d-4691-ab02-9ab4663ec870/nestfinder-apartment-YRqzXicg.jpg',
  },
  {
    id: '2',
    title: 'Luxury Villa with Pool',
    price: '₹1.2 Cr',
    location: 'ECR, Chennai',
    beds: 4,
    baths: 4,
    area: '3,800 sq.ft',
    type: 'featured',
    image: 'https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/44b8c74c-769d-4691-ab02-9ab4663ec870/nestfinder-villa-CTMONnp2.jpg',
  },
  {
    id: '3',
    title: 'Garden View 2BHK',
    price: '₹28,000/mo',
    location: 'Anna Nagar, Chennai',
    beds: 2,
    baths: 2,
    area: '980 sq.ft',
    type: 'rent',
    image: 'https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/44b8c74c-769d-4691-ab02-9ab4663ec870/nestfinder-garden-DTtG5gOK.jpg',
  },
];

export const agents: Agent[] = [
  {
    id: '1',
    name: 'Ananya Rao',
    initials: 'AR',
    city: 'Chennai',
    rating: 4.9,
    deals: 128,
  },
  {
    id: '2',
    name: 'Vikram Mehta',
    initials: 'VM',
    city: 'Bengaluru',
    rating: 4.8,
    deals: 96,
  },
  {
    id: '3',
    name: 'Priya Nair',
    initials: 'PN',
    city: 'Hyderabad',
    rating: 5.0,
    deals: 143,
  },
];
