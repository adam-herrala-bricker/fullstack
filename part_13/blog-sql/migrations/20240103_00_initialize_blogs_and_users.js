const {DataTypes} = require('sequelize');

module.exports = {
  // this makes changes to the DB
  up: async ({context: queryInterface}) => {
    
    await queryInterface.createTable('blogs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      // sequelize should automatically mange created_at + updated_at
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },

      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
    
      author: {
        type: DataTypes.TEXT
      },
    
      url: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    
      title: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    })
    
    
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },

      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
    
      name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    
      username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },

      // HAS TO BE SNAKE CASE!!!!!!
      password_hash: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    })
    
    await queryInterface.addColumn('blogs', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'users', key: 'id'}
    })
    
  },
  
  // and this is how you roll it back
  down: async ({context: queryInterface}) => {
    await queryInterface.dropTable('blogs');
    await queryInterface.dropTable('users');
  }
}