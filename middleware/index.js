// A list of app users
// -------------------
let users = [];

// Middleware
// ----------
module.exports = (app) => {
  app.users = app.users || users;

  return (request, response, done) => {
    done();
  };
};