module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define('Favorite', {
        user_id: DataTypes.INTEGER,
        show_id: DataTypes.INTEGER,
    });

    Favorite.associate = (models) => {
        models.Favorite.belongsTo(models.User, {
          as: 'user',
          onDelete: 'CASCADE',
          foreignKey: 'user_id',
        });

        models.Favorite.belongsTo(models.Show, {
          as: 'show',
          onDelete: 'CASCADE',
          foreignKey: 'show_id',
        });
    };

    return Favorite;
};
