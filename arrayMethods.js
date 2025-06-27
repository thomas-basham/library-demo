const products = [
  { id: 1, name: "Laptop", price: 1200, category: "Electronics" },
  { id: 2, name: "Phone", price: 800, category: "Electronics" },
  { id: 3, name: "Shoes", price: 120, category: "Clothing" },
  { id: 4, name: "Watch", price: 150, category: "Accessories" },
  { id: 5, name: "Headphones", price: 200, category: "Electronics" },
];

products.sort(function (a, b) {
  let x = a.name.toLowerCase();
  let y = b.name.toLowerCase();
  if (x < y) {
    return -1;
  }
  if (x > y) {
    return 1;
  }
  return 0;
});

products.sort(function (a, b) {
  return a.price - b.price;
});

console.log(products);

// filter

// reduce
