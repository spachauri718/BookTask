module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define("Book", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
    return Book;
  };
  