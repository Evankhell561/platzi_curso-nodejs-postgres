const faker = require('faker');
const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');
const { Op } = require('sequelize');

class ProductsService {

  constructor() {
    // this.products = [];
    // this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    // const newProduct = {
    //   id: faker.datatype.uuid(),
    //   ...data
    // }
    // this.products.push(newProduct);
    // return newProduct;
    const rta = await sequelize.models.Product.create(data);
    return rta;
  }

  async find(query) {
    // const query = 'SELECT * FROM task ORDER BY id ASC';
    // //const [data, metadata] = await sequelize.query(query); // no necesitamos la metadata
    // const [data] = await sequelize.query(query);
    const { limit, offset } = query;
    const optios = {
      include: ['category'],
      where: {}
    };
    if(limit && offset) {
      optios.limit = limit;
      optios.offset = offset;
    }
    const { price } = query;
    if(price) {
      optios.where.price = price;
    }

    const { price_min, price_max } = query;
    if(price_min && price_max) {
      optios.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      };
    }

    const rta = await sequelize.models.Product.findAll(optios);
    return rta;
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = ProductsService;
