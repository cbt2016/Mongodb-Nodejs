var {SHA256} = require('crypto-js');
var jwt = require('jsonwebtoken');

var userData = {
    id:10
};

var t = jwt.sign(userData, 'simo2017');
console.log('jwt sign : ' , t);

var decoded = jwt.verify(t,'simo217');
console.log('decoded ', decoded);

/*var message = 'i am user number 1';
var hash = SHA256(message).toString();

console.log('message ',message);
console.log('hash ',JSON.stringify(hash));

var data = {
    id:4
};

var token = {
    data,
    hash: SHA256(JSON.stringify(data) +'somesecret').toString()
};

token.data.id = 5;

var hashedData = SHA256(JSON.stringify(data) + 'somesecret').toString();

if (hashedData === token.hash){
    console.log('data was not altered');
}else {
    console.log('do not trust this data ,it has been changed ');
}*/