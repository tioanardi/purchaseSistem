'use strict';

module.exports = function(Customer) {

// remote methods

Customer.remoteMethod(
    'getFirstName',
    {
        description: 'get first name' ,
        accepts: [
            { arg: 'firstname', type: 'string'}
        ],
        returns:{
            arg: 'res', type:'object', root: true
        },
        http: { path: '/getFirstName', verb: 'get' }
    }
);
// function getNameLike -> get name with firstname param
Customer.getFirstName = function(firstname, callback){
    new Promise(function(resolve, reject){
        // query filter variable
        var filter ={
            where: {
                firstname : {
                    like : firstname
                }
            }
        }
Customer.find(filter, function(err, result){
    if(err) reject (err)
    if(result === null){
        err = new Error ("Nama Tidak Dapat Ditemukan")
        err.statusCode = 404
        reject (err)
    }
    resolve(result)
})
}).then(function(res){
    if (!res) callback (err)
    return callback (null, res)
    }).catch(function(err){
    callback(err);
});
}
}
