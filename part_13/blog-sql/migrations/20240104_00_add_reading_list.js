const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({context: queryInterface}) => {
    await queryInterface.createTable('reading_lists', { // note that this needs to be plural!! an 's' gets added to the model name automatically (try to figure out how to override this absurd convention)
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'users', key: 'id'}
      },

      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'blogs', key: 'id'}
      }
    })

    await queryInterface.addColumn('blogs', 'read_status', {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'unassigned',
      validate: {
        isIn: [['unassigned', 'read', 'unread']]
      }
    })
  },

  down: async ({context: queryInterface}) => {
    await queryInterface.dropTable('reading_lists')
    await queryInterface.removeColumn('blogs', 'read_status')
  }
};
