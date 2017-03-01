//middleware to check if user is logged in, else redirect to login page.
//this is supposed to be globally avaialbe, just import as needed

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.session.userId) {
    console.log(req.user)
    return next();
  }
  res.redirect('/login');
}

module.exports = {ensureAuthenticated : ensureAuthenticated}