import type { User } from '../types';

export const defaultUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex.j@example.com',
  phone: '(555) 123-4567',
  address: {
    street: '123 Market Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    country: 'USA'
  }
};

