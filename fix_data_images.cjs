const fs = require('fs');

let content = fs.readFileSync('src/data.ts', 'utf8');

const oldMockInventoryOwner = `export const mockInventoryOwner = [
  { id: '1', name: 'MacBook Pro M3 Max 36GB', category: 'Laptops', initialQty: 50, soldQty: 48, remainingQty: 2, unitCost: 2800, sellPrice: 3499, totalValue: 5600, soldValue: 167952, profit: 33552, trend: [20, 25, 22, 30, 45, 40, 48] },
  { id: '2', name: 'iPhone 15 Pro Max 256GB', category: 'Phones', initialQty: 200, soldQty: 155, remainingQty: 45, unitCost: 900, sellPrice: 1199, totalValue: 40500, soldValue: 185845, profit: 46345, trend: [50, 70, 90, 110, 130, 145, 155] },
  { id: '3', name: 'iPad Pro 12.9" M2', category: 'Tablets', initialQty: 100, soldQty: 100, remainingQty: 0, unitCost: 850, sellPrice: 1099, totalValue: 0, soldValue: 109900, profit: 24900, trend: [10, 25, 45, 60, 80, 95, 100] },
  { id: '4', name: 'AirPods Pro 2nd Gen', category: 'Audio', initialQty: 300, soldQty: 288, remainingQty: 12, unitCost: 150, sellPrice: 249, totalValue: 1800, soldValue: 71712, profit: 28512, trend: [40, 80, 120, 180, 220, 260, 288] },
];`;

const newMockInventoryOwner = `export const mockInventoryOwner = [
  { id: '1', name: 'MacBook Pro M3 Max 36GB', category: 'Laptops', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop', initialQty: 50, soldQty: 48, remainingQty: 2, unitCost: 2800, sellPrice: 3499, totalValue: 5600, soldValue: 167952, profit: 33552, trend: [20, 25, 22, 30, 45, 40, 48] },
  { id: '2', name: 'iPhone 15 Pro Max 256GB', category: 'Phones', image: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?q=80&w=1000&auto=format&fit=crop', initialQty: 200, soldQty: 155, remainingQty: 45, unitCost: 900, sellPrice: 1199, totalValue: 40500, soldValue: 185845, profit: 46345, trend: [50, 70, 90, 110, 130, 145, 155] },
  { id: '3', name: 'iPad Pro 12.9" M2', category: 'Tablets', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop', initialQty: 100, soldQty: 100, remainingQty: 0, unitCost: 850, sellPrice: 1099, totalValue: 0, soldValue: 109900, profit: 24900, trend: [10, 25, 45, 60, 80, 95, 100] },
  { id: '4', name: 'AirPods Pro 2nd Gen', category: 'Audio', image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?q=80&w=1000&auto=format&fit=crop', initialQty: 300, soldQty: 288, remainingQty: 12, unitCost: 150, sellPrice: 249, totalValue: 1800, soldValue: 71712, profit: 28512, trend: [40, 80, 120, 180, 220, 260, 288] },
];`;

content = content.replace(oldMockInventoryOwner, newMockInventoryOwner);

fs.writeFileSync('src/data.ts', content);

