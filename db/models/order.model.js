const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'customer_id',
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  total: {
    type: DataTypes.VIRTUAL,
    get() {
    if(this.items.length > 0) {//items se llama a la relacion, puede tener cualquier nombre si lo pones en el belongsToMany
      return this.items.reduce((total, item) => {
          return total + item.price * item.OrderProduct.amount;
        }, 0);
      }
      return 0;
    }
  }
}


class Order extends Model {

  static associate(models) {
    this.belongsTo(models.Customer, {
      as: 'customer'
    });
    this.belongsToMany(models.Product, {
      as: "items",
      through: models.OrderProduct,
      foreignKey: "orderId",
      otherKey: "productId",
    });

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}

module.exports = { Order, OrderSchema, ORDER_TABLE };
