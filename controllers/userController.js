const db = require("../models/sequelize.js");
const User = db.users;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs")
const config = require("../config/keys.js");

// Register a new user
exports.signup = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (user) {
                return res.status(400).send("User already exist.");
            }
            // Create a user
            const usr = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                phone: req.body.phone,
                address: req.body.address,
            };

            // Save User in the database
            User.create(usr)
                .then(data => {
                    res.status(200).send("User was registered successfully");
                })
                .catch(err => {
                    res.status(500).send("Some error occurred while creating the user.")
                });
        })
        .catch(err => {
            res.status(500).send(err.message)
        })


};

// login
exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send("User Not found.");
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send("Invalid Password!");
            }
            var token = jwt.sign({ id: user.id }, config.TOKEN_KEY, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                user: user,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
};


// Retrieve all Users.
exports.findAll = (req, res) => {

    User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send("Some error occurred while retrieving users.");
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(user => {
            if (!user)
                return res.status(404).send("User not found")
            res.send(user);
        })
        .catch(err => {
            res.status(500).send("Error retrieving User with id=" + id);
        });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    User.update(req.body, {
        where: { id: req.params.id }
    })
        .then(() => {
            res.status(200).send("User was updated successfully.");

        })
        .catch(err => {
            res.status(500).send("Error updating User with id=" + id);
        });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(() => {
            res.status(200).send("User was deleted successfully.");

        })
        .catch(err => {
            res.status(500).send("Error deleting User with id=" + id);
        });
};
// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: {}
    })
        .then(() => {
            res.status(200).send("All users are deleted successfully.");

        })
        .catch(err => {
            res.status(500).send("Error deleting Users");
        });
};

