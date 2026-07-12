const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');
data = data.replace(
  "export const topProductsData = [\n  { name: 'MacBook Pro', value: 45 },\n  { name: 'iPhone 15', value: 30 },\n  { name: 'AirPods Pro', value: 15 },\n  { name: 'iPad Pro', value: 10 },\n];",
  "export const topProductsData = [\n  { name: 'MacBook Pro', value: 45, percentage: 45 },\n  { name: 'iPhone 15', value: 30, percentage: 30 },\n  { name: 'AirPods Pro', value: 15, percentage: 15 },\n  { name: 'iPad Pro', value: 10, percentage: 10 },\n];"
);
fs.writeFileSync('src/data.ts', data);
