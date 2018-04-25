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
        const match = await bcrypt.compare(password, this.password);
        return match;
    };

    User.associate = (models) => {
        models.User.hasMany(models.Favorite, {
          foreignKey: 'user_id',
          sourceKey: 'id',
        });
    };

    return User;
};
