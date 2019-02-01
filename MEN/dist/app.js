"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const marathonRoutes_1 = require("./routes/marathonRoutes");
class App {
    constructor() {
        this.app = express();
        this.routePrv = new marathonRoutes_1.Routes();
        this.mongoUrl = 'mongodb://127.0.0.1:27017/CRMdb';
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);
        this.app.set('Secret', 'heymynameismohamedaymen');
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.app.use(express.static('public'));
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map