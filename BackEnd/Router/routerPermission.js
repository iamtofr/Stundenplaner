'use strict';

const mongoose = require('mongoose');
const express = require('express');
const app = express.Router();
const schema = require('../Schemas/schemas');
const account = mongoose.model('account', schema.account);

mongoose.Promise = Promise;

function findPerm(token) {
    return account.findOne({'token': token}).populate({
        path: 'profile',
        populate: {
            path: 'role'
        }
    }).exec().then((result) => {
        if (!result) throw "Ich bin ein Error!";
        console.log('funktion', result, result.profile);
        console.log(result.profile.role);
        let roleName = result.profile.role.name;
        if (roleName === 'Schüler') {
            console.log("Schüler: " + roleName);
            return 0;
        } else if (roleName === 'Lehrer') {
            return 3;
        } else if (roleName === 'Verwalter') {
            return 6;
        } else if (roleName === 'Admin') {
            return 9;
        }
    });
}

app.use(async (req, res, next) => {
    try {
        req.perm = await findPerm(req.query.token);
        next()
    } catch (err) {
        console.log("async:", err);
        res.status(401).json();
    }
});

module.exports = app;