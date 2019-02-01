"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const jwt = require("jsonwebtoken");
class AccountController {
    constructor() {
        this.app = express();
    }
    login(req, res) {
        if (req.body.username === 'aymen') {
            if (req.body.password === 123) {
                const payload = {
                    check: true
                };
                const token = jwt.sign(payload, 'heymynameismohamedaymen', {
                    expiresIn: 1440 // expires in 24 hours
                });
                res.json({
                    message: 'authentication done ',
                    token: token
                });
            }
            else {
                res.json({ message: 'please check your password !' });
            }
        }
        else {
            res.json({ message: 'user not found !' });
        }
    }
}
exports.AccountController = AccountController;
//# sourceMappingURL=accountController.js.map