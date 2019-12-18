require("dotenv").config();
const express = require("express");
const routesService = require("./services/routes.service");
const mongooseService = require("./services/mongoose.service");

const app = express();
app.use(express.json());
mongooseService.getConnection();
routesService.useAllRoutes(app);

app.listen(process.env.APP_PORT, () => {
  console.log(`Application is running on port ${process.env.APP_PORT}`);
});
