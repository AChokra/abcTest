import { QueryInterface, Sequelize } from 'sequelize';

export default {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I don't want to configure the seating for every show
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: (queryInterface: QueryInterface): Promise<any> => {
    return Promise.all([
      queryInterface.createTable('Shows', { //Show administration
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        startTime: Sequelize.STRING,
        endTime: Sequelize.STRING,
      }).then(() => {
        queryInterface.createTable('Movie', {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          name: Sequelize.STRING,
          showId: {
            type: Sequelize.INTEGER,
            references: { model: 'Shows', key: 'id' }
          },
          isBooked: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
          }
        })
      }).then(() => {
        queryInterface.createTable('SeatingType', {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          premiumPercentage: Sequelize.INTEGER,
          seatTypeName: Sequelize.STRING,
        }).then(() => {
          queryInterface.createTable('Seating', {
            id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true
            },
            amount: Sequelize.STRING,
            SeatingTypeId: {
              type: Sequelize.INTEGER,
              references: { model: 'SeatingType', key: 'id' }
            },
            seatNumber: Sequelize.STRING,
          }).then(() => {
            queryInterface.createTable('Pricing', {
              id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
              },
              amount: Sequelize.STRING,
              seatTypeId: {
                type: Sequelize.INTEGER,
                references: { model: 'Seating', key: 'id' }
              },
              movieId: Sequelize.INTEGER,
            })
          })
        })
      })
    ])
    //throw new Error('TODO: implement migration in task 4');
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: (queryInterface: QueryInterface) => {
    // do nothing
  },
};
