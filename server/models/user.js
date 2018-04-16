module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        facebook_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return User;
};
