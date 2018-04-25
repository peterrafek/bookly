const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    });

    User.generateHash = async (password) => {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    };

    User.prototype.verifyPassword = async function(password) {
        console.log('Password (plain): ' + password);
        console.log('hash: ' + this.password);
        const match = await bcrypt.compare(password, this.password);
        return match;
    };

    return User;
};
