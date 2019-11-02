const { productsMock } = require('../utils/mocks');
const MongoConnect = require('../lib/mongo');


class ProductService {

  constructor() {
    this.collection = 'trips';
    this.mongoDB = new MongoConnect();
  }

  async getTrips() {
    const trips = await this.mongoDB.getAll(this.collection);
    return trips || [];
  }

  async createTrip({ trip }) {
    const createdTripId = await this.mongoDB.create(this.collection, trip);
    return createdTripId;
  }

/*   async updateProduct({ productId, product } = {}) {
    const updatedProductId = await this.mongoDB.update(
      this.collection,
      productId,
      product
    );
    return updatedProductId;
  }
  async deleteProduct({ productId }) {
    const deletedProductId = await this.mongoDB.delete(this.collection, productId);
    return deletedProductId;
  } */
}

module.exports = ProductService;
