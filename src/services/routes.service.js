const fs = require('fs');

function getAllRoutes() {
  return fs.readdirSync(`${__dirname}/../routes`);
}

function useAllRoutes(app) {
  const routes = getAllRoutes();
  for (const route of routes) {
    app.use(process.env.API_URL, require( `${__dirname}/../routes/` + route ) ) ;
  }
}

module.exports.getAllRoutes = getAllRoutes;
module.exports.useAllRoutes = useAllRoutes;