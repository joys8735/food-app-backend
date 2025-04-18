'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      { id: 'burger', name: 'Burger', image: '/public/burger.png', createdAt: new Date(), updatedAt: new Date() },
      { id: 'mexican', name: 'Mexican', image: '/public/burger.png', createdAt: new Date(), updatedAt: new Date() },
      { id: 'pizza', name: 'Pizza', image: '/public/burger.png', createdAt: new Date(), updatedAt: new Date() },
      { id: 'candy', name: 'Candy', image: '/public/burger.png', createdAt: new Date(), updatedAt: new Date() },
    ]);

    await queryInterface.bulkInsert('Products', [
      {
        id: 'featured1',
        name: 'Vegan Delight Pizza',
        price: 14.99,
        image: '/burger.png',
        description: 'A delicious and healthy pizza topped with fresh vegetables.',
        isVegetarian: true,
        categoryId: 'pizza',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'featured2',
        name: 'Classic Cheeseburger',
        price: 8.99,
        image: '/public/burger.png',
        description: 'Juicy beef patty with melted cheese, lettuce, and our special sauce.',
        categoryId: 'burger',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'featured3',
        name: 'Chocolate Sundae',
        price: 5.99,
        originalPrice: 7.99,
        image: '/public/burger.png',
        description: 'Rich chocolate ice cream topped with whipped cream and sprinkles.',
        categoryId: 'candy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'featured4',
        name: 'Beef Tacos',
        price: 9.99,
        image: '/public/burger.png',
        description: 'Authentic Mexican tacos with seasoned beef and fresh toppings.',
        categoryId: 'mexican',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'top1',
        name: 'Supreme Pepperoni Pizza',
        price: 16.99,
        image: '/public/burger.png',
        description: 'Double pepperoni and extra cheese on our signature crust',
        categoryId: 'pizza',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'top2',
        name: 'Mexican Fiesta Tacos',
        price: 12.99,
        image: '/public/burger.png',
        description: 'Set of 3 authentic tacos with guacamole and salsa',
        categoryId: 'mexican',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Banners', [
      { image: '/public/lovable-uploads/StreetFood.png', createdAt: new Date(), updatedAt: new Date() },
      { image: '/public/lovable-uploads/StreetFood.png', createdAt: new Date(), updatedAt: new Date() },
      { image: '/public/lovable-uploads/StreetFood.png', createdAt: new Date(), updatedAt: new Date() },
      { image: '/public/lovable-uploads/ed909d26-abd7-4ce3-a8bd-9c2fe7ff0668.png', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Banners', null, {});
  },
};