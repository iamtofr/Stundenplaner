/**
 * This module defines the permission for the Validation of HTTP Requests.
 * Mongoose is used as framework.
 *
 */
'use strict';

const mongoose = require('mongoose');
const express = require('express');
const app = express.Router();
const schema = require('../Schemas/schemas');
const account = mongoose.model('account', schema.account);

mongoose.Promise = Promise;

/**
 * This Function searched in the DB for token and matched this token with a profile and return a profile with a role
 *
 * @param token     The token for validation the account
 * @return          A token
 */
function findPerm(token) {
    return account.findOne({'token': token}).populate({
        path: 'profile',
        populate: {
            path: 'role'
        }

        /**
         * Here will be checked which role the account have
         *
         * @return  A number they are represented the role specification
         */
    }).exec().then((result) => {
        if (!result) throw "Ich bin ein Error!: " +console.log(result);
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

/**
 * The Request is waiting of the token
 */
app.use(async (req, res, next) => {
  try {
    req.perm = await findPerm(req.query.token);
    next()
  } catch (err) {
    console.log("could not get Permission from Profile/bad Request", err);
    res.status(401).json();
  }
});

module.exports = app;