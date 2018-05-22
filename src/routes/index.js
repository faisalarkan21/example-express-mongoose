const UserController = require("../controllers/UsersController");

module.exports = (app) => {

    app.post('/api/signup', UserController.register);
    app.post('/api/login', UserController.login);

}