//External modules
const crypto = require('crypto');

const OTPGenerate = (length = 4) => {
 return crypto.randomInt(10**(length-1), 10**length).toString();
}

//exports 
module.exports = OTPGenerate;
