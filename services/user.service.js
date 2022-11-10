const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');


class UserService {
  constructor() {}

  async create(data) {
    return data;
  }

  async find() {
    // lo comentado es en lenguaje SQL
    // const rta = await client.query('SELECT * FROM task ORDER BY id ASC');
    // return rta.rows;
    const rta = await models.User.findAll();
    return rta;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;
