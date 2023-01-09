const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');


class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    // lo comentado es en lenguaje SQL
    // const rta = await client.query('SELECT * FROM task ORDER BY id ASC');
    // return rta.rows;
    const rta = await models.User.findAll({
      include: ["customer"]
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id)
    if (!user) {
      boom.notFound('User not found');
    }
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id)
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
