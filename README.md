## Govtech Shop backend

The backend for an online store called Govtech Shop that allows users to manage their item listings. hosted at https://secure-eyrie-73650.herokuapp.com/
- Objective 1: Frontend and backend
- Objective 2: ORM (using ExpressJS)
- Objective 3: Validation - Validations and error handling at /server/middlewares/ValidationMiddlewares.js. Validations for all CRUD endpoints to /items



# Features

- All routes below live on the /items endpoint:
  - [get] query params: {minAmount?: integer?; maxAmount?: integer; name: string;} Returns the list of the user's items, along with the total number of created items. All params are optional and allow you to filter by price by inputting minAmount/maxAmount, and the name by the name param

  - [post] request.body.data: {price: integer, name: string;} Creates a new item and returns it. Both params required

  - [put] request.body.data: {price: integer, name: string; id: string;} Updates the price and name property of an item by id. id and at least one more other param is required

  - [delete] request.body.data: {id: string;} Returns status code 200 upon successful deletion. id is required

- Validations and error handling at /server/middlewares/ValidationMiddlewares.js

# Startup guide for development

  1. Install packages
  2. Run 'npm run dev' 
  4. Configure your db credentials on server/db/config/config.json if necessary
  3. Run 'npx sequelize db:migrate', make sure it runs succesfully
  4. Should be good to go, can play around with the endpoints above

# Todos

- Write unit tests for each endpoint
- Put controller logic in separate file
- Update get endpoint to support sorting
- Put appropriate packages in dev environment- 
