const express = require('express');
const dotenv = require('dotenv');
const routesService = require('./services/routes.service');

dotenv.config();
const app = express();
routesService.useAllRoutes(app);

app.listen(process.env.APP_PORT, () => {
  console.log(`Application is running on port ${process.env.APP_PORT}`);
})
