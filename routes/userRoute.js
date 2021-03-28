module.exports = app => {
    const users = require("../controllers/userController.js");
    const auth = require('../middlewares/auth')
    var router = require("express").Router();
  // CORS setup for dev
    app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, PUT, PATCH');
    next();
  });


    router.get("/",auth, users.findAll);
    router.get("/:id",auth, users.findOne);
    router.post("/signup", users.signup);
    router.post("/signin", users.signin);
    router.put("/update/:id",auth, users.update);
    router.delete("/delete/:id",auth, users.delete);
    router.delete("/delete",auth, users.deleteAll);
  
    app.use('/api/users', router);
  };