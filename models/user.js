module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING
      },

      lastName: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
     
    });
  
    return User;
  };