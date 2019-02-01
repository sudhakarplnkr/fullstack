"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.ContactSchema = new Schema({
    company: {
        type: String
    },
    created_date: {
        default: Date.now,
        type: Date
    },
    email: {
        type: String
    },
    firstName: {
        required: 'Enter a first name',
        type: String
    },
    lastName: {
        required: 'Enter a first name',
        type: String
    },
    phone: {
        type: Number
    }
});
//# sourceMappingURL=crmModel.js.map