'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    //add filed to products table
    await queryInterface.addColumn('Products', 'users_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      after: 'id'
    });


    //add constraint to field users_id
    await queryInterface.addConstraint('Products', {
      fields: ['users_id'],
      type: 'FOREIGN KEY',
      name: 'FK_Users_id',
      references: {
        table: 'Users',
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Products', 'FK_Users_id');
    await queryInterface.removeColumn('Products', 'users_id');
  }
};
