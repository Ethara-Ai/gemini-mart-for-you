import type { Product, Category } from '../types';

const CATEGORIES: Category[] = [
  'Electronics',
  'Fashion',
  'Home Goods',
  'Beauty',
  'Fitness',
  'Food & Beverage',
  'Books',
  'Toys'
];

const UNSPLASH_IMAGES: Record<Category, string[]> = {
  'Electronics': ['1496181133206-80ce9b88a853', '1526738549149-8e07eca6c147', '1546868871-7041f2a55e12', '1588872657578-838c64708169', '1593640408609-809312d69bfa'],
  'Fashion': ['1523381210434-271e8be1f52b', '1515886657613-9f3515b0c78f', '1483985988355-763728e1935b', '1542291026-7eec264c27ff', '1591047139829-d91a961c76c4'],
  'Home Goods': ['1583847268964-b8bc40d99fce', '1586023492125-27b2c045efd7', '1513694203232-719a280e022f', '1524758631624-e2822e304c36', '1505693542198-d451b6a71e4c'],
  'Beauty': ['1596462502278-27bfdd403ccc', '1571781308732-9c1d331c009c', '1612817204324-730f3a975af3', '1608248597279-f99d160bfbc8', '1596462502278-27bfdd403ccc'],
  'Fitness': ['1517836357463-d25dfeac3438', '1599058945522-28d584b6f0ff', '1584735175315-9d5df23860e6', '1571902943202-507ec2618e8f', '1534438327276-14e5300c3a48'],
  'Food & Beverage': ['1563805042-7684c019e1cb', '1621939514649-fcaf53e54b35', '1582515045388-a7da743873e1', '1610832958506-aa56368176cf', '1512621776951-a57141f2eefd'],
  'Books': ['1544947950-fa07a98d237f', '1512820790803-83ca734da794', '1532012197267-da84d127e765', '1495446815901-a7297e633e8d', '1476275466078-400a78c9877d'],
  'Toys': ['1566576912902-1d6db6e811e6', '1596461404969-9ae70f2830c1', '1587654780291-39c94048e692', '1558060370-d648dd0da3d6', '1500995617975-ea0131789096']
};

const ADJECTIVES = ['Premium', 'Essential', 'Classic', 'Modern', 'Eco-Friendly', 'Luxury', 'Compact', 'Professional', 'Artisan', 'Smart'];
const NOUNS: Record<Category, string[]> = {
  'Electronics': ['Headphones', 'Speaker', 'Monitor', 'Keyboard', 'Charger', 'Camera', 'Tablet', 'Smartwatch'],
  'Fashion': ['T-Shirt', 'Jacket', 'Sneakers', 'Scarf', 'Denim', 'Backpack', 'Sunglasses', 'Watch'],
  'Home Goods': ['Lamp', 'Vase', 'Planter', 'Throw Blanket', 'Candle', 'Mug', 'Clock', 'Mirror'],
  'Beauty': ['Face Cream', 'Serum', 'Lipstick', 'Perfume', 'Cleanser', 'Mask', 'Oil', 'Scrub'],
  'Fitness': ['Yoga Mat', 'Dumbbells', 'Resistance Bands', 'Water Bottle', 'Gym Bag', 'Foam Roller', 'Tracker', 'Gloves'],
  'Food & Beverage': ['Coffee Beans', 'Tea Set', 'Chocolate', 'Olive Oil', 'Spices', 'Honey', 'Granola', 'Juice'],
  'Books': ['Novel', 'Cookbook', 'Biography', 'Art Book', 'Guide', 'Journal', 'Anthology', 'Manual'],
  'Toys': ['Puzzle', 'Block Set', 'Plushie', 'Board Game', 'Action Figure', 'Craft Kit', 'Robot', 'Doll']
};

const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFloat = (min: number, max: number): number => parseFloat((Math.random() * (max - min) + min).toFixed(2));

export const generateProducts = (): Product[] => {
  const products: Product[] = [];
  let idCounter = 1;

  CATEGORIES.forEach(category => {
    // Generate ~12-13 items per category to reach ~100
    for (let i = 0; i < 13; i++) {
      const noun = getRandomItem(NOUNS[category]);
      const adjective = getRandomItem(ADJECTIVES);
      const isSale = Math.random() > 0.7; // 30% chance of sale
      const price = getRandomFloat(20, 500);
      const salePrice = isSale ? parseFloat((price * 0.8).toFixed(2)) : undefined;
      
      const imageId = getRandomItem(UNSPLASH_IMAGES[category]);
      
      const details: Record<string, string | number> = {};
      if (category === 'Electronics') {
        details['Warranty'] = `${getRandomInt(1, 3)} Years`;
        details['Battery Life'] = `${getRandomInt(10, 48)} Hours`;
      } else if (category === 'Books') {
        details['Pages'] = getRandomInt(200, 800);
        details['Author'] = `Author ${getRandomInt(1, 50)}`;
      } else if (category === 'Toys') {
        details['Age'] = `${getRandomInt(3, 12)}+`;
        details['Material'] = 'Safe Plastic/Wood';
      } else if (category === 'Fashion') {
         details['Material'] = getRandomItem(['Cotton', 'Polyester', 'Leather', 'Denim']);
         details['Care'] = 'Machine Wash';
      }

      products.push({
        id: `prod-${idCounter++}`,
        name: `${adjective} ${noun}`,
        price,
        description: `This ${adjective.toLowerCase()} ${noun.toLowerCase()} is perfect for your needs. Crafted with care and designed to last.`,
        category,
        image: `https://images.unsplash.com/photo-${imageId}?auto=format&fit=crop&w=600&q=80`,
        stock: getRandomInt(0, 50),
        shippingEstimate: Math.random() > 0.5 ? '2-3 Business Days' : '5-7 Business Days',
        isSale,
        salePrice,
        details,
        rating: getRandomFloat(3.5, 5),
        reviews: getRandomInt(5, 500)
      });
    }
  });

  return products;
};

export const products = generateProducts();

