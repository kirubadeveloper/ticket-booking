module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      user_id: { 
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE'
      },
      event_id: { 
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Events', key: 'id' },
        onDelete: 'CASCADE'
      },
      created_at: { 
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: { 
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.addConstraint('Bookings', {
      fields: ['user_id', 'event_id'], 
      type: 'unique',
      name: 'unique_user_event_booking'
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Bookings');
  }
};
