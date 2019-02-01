"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const jwt = require("jsonwebtoken");
const accountController_1 = require("../controllers/accountController");
const registrationController_1 = require("../controllers/registrationController");
class Routes {
    constructor() {
        this.contactController = null;
        this.accountController = null;
        this.contactController = new registrationController_1.ContactController();
        this.accountController = new accountController_1.AccountController();
    }
    routes(anonymous) {
        const ProtectedRoutes = express.Router();
        anonymous.use('/api', ProtectedRoutes);
        ProtectedRoutes.use((req, res, next) => {
            const token = req.headers['access-token'].toString();
            if (!token) {
                res.send({
                    message: 'No token provided.'
                });
                return;
            }
            jwt.verify(token, anonymous.get('Secret'), (err) => {
                if (err) {
                    return res.json({ message: 'invalid token' });
                }
                next();
            });
        });
        anonymous.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
        });
        // Contact 
        ProtectedRoutes.route('/contact')
            .get((req, res, next) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);
            next();
        }, this.contactController.getContacts)
            // POST endpoint
            .post(this.contactController.addNewContact);
        // Contact detail
        ProtectedRoutes.route('/contact/:contactId')
            // get specific contact
            .get(this.contactController.getContactWithID)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact);
        anonymous.route('/authenticate')
            .post(this.accountController.login);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=marathonRoutes.js.map