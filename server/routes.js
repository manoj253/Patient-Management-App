  var config = require('./config/config'),
  HomeController = require('./controllers/HomeController');

module.exports = function (app) {
  //APIs
  app.route('/').get(HomeController.index);
  app.route('/api/v1/add').post(HomeController.addPatient);
  app.route('/api/v1/view').get(HomeController.getPatients);
  //app.route('/patient/:id').get(HomeController.viewPatients);

}
