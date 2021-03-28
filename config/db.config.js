module.exports = {
    HOST: 'localhost',
    USER: 'postgres',
    PASSWORD: '',
    DATA_BASE: 'postgres',
    PORT:5433,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };