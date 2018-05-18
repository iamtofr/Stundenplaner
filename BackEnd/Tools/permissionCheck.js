const mongoose = require('mongoose');
const schema = require('../Schemas/schemas');
let account = mongoose.model('account', schema.account);
let role = mongoose.model('role', schema.role);
let address = mongoose.model('address', schema.address);
mongoose.Promise = Promise;

//TODO hier muss dann auf das Token geprüft werden. Muss im Header feld sein weil beim get kein Payload gesendet wird.

/**
 * returns a number between 0-9
 * 0 = Schüler
 * 3 = Teacher
 * 6 = Verwalter
 * 9 = Admin
 * @param req
 */
const getPermission = function (req) {

    let token = req.query.token;

    if (token !== undefined) {
        let promise =  account.findOne({'token': token}).populate({
            path: 'profile',
            populate: {
                path: 'role',
                model: role
            }
        }).exec();

        return promise.then(function (result) {
            let roleName = result.profile.role.name;
            if (roleName === 'Schüler') {
                console.log("Schüler: "+ roleName);
                return 0;
            } else if (roleName === 'Lehrer') {
                return 3;
            } else if (roleName === 'Verwalter') {
                return 6;
            } else if (roleName === 'Admin') {
                return 9;
            }
        }).catch(function (err) {
            console.log(err)
        })
    }
};

module.exports = getPermission;