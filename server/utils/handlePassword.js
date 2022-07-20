const bcrypt = require("bcrypt");
const saltRounds = 10

const encrypt = async(passwordPlain) => {
    return await (passwordPlain)
};

const compare = async(passwordPlain, hashedPassword) => {
    // return await bcrypt.compare(passwordPlain, hashedPassword)
    return await (passwordPlain === hashedPassword);
}

module.exports = { encrypt, compare }