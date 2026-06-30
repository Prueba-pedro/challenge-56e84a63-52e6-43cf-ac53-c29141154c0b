const request = require('supertest');
const app = require('../index');
const { Product } = require('../models/productModel');

describe('Product Controller', () => {
  beforeAll(async () => {
    await Product.deleteMany({});
  });

  afterAll(async () => {
    await Product.deleteMany({});
  });

  describe('GET /products', () => {
    it('should get all products', async () => {
      const response = await request(app).get('/products');
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('GET /products/:id', () => {
    it('should get a product by id', async () => {
      const product = new Product({ name: 'Product 1', price: 10, category: 'Category 1' });
      await product.save();
      const response = await request(app).get(`/products/${product.id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('name', 'Product 1');
    });
  });

  describe('POST /products', () => {
    it('should create a new product', async () => {
      const response = await request(app)
       .post('/products')
       .send({ name: 'Product 2', price: 20, category: 'Category 2' });
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('name', 'Product 2');
    });
  });

  describe('PUT /products/:id', () => {
    it('should update a product by id', async () => {
      const product = new Product({ name: 'Product 3', price: 30, category: 'Category 3' });
      await product.save();
      const response = await request(app)
       .put(`/products/${product.id}`)
       .send({ name: 'Product 3 Updated', price: 35, category: 'Category 3 Updated' });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('name', 'Product 3 Updated');
    });
  });

  describe('DELETE /products/:id', () => {
    it('should delete a product by id', async () => {
      const product = new Product({ name: 'Product 4', price: 40, category: 'Category 4' });
      await product.save();
      const response = await request(app).delete(`/products/${product.id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Product deleted');
    });
  });
});