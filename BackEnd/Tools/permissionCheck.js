const mongoose = require('mongoose');
const schema = require('../Schemas/schemas');
let account = mongoose.model('account', schema.account);

//TODO hier muss dann auf das Token geprüft werden. Muss im Header feld sein weil beim get kein Payload gesendet wird.

/**
 * returns a number between 0-9
 * 0 = Schüler
 * 3 = Teacher
 * 6 = Verwalter
 * 9 = Admin
 * @param req
 */
const getPermission = (req) => {

    let token = req.token;
    if (token !==undefined){
        account.findOne({'token': token}).populate('profile').exec(function (err, result) {
            if (err) throw err;
            let roleName = result.profile.role.name;
            if (roleName === 'Schüler'){
                delete req.token;
                return 0;
            } else if (roleName ==='Lehrer'){
                delete req.token;
                return 3;
            } else if (roleName ==='Verwalter'){
                delete req.token;
                return 6;
            } else if(roleName ==='Admin'){
                delete req.token;
                return 9;
            } else return undefined;
        });
    }
};

module.exports = getPermission;