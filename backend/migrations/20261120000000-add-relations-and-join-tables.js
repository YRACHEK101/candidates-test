"use strict";
// The first migrations only created the base columns of each table.
// The foreign keys and join tables below were created at startup by
// `sequelize.sync({ alter: true })`. They now live in this migration.
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Articles -> author (User)
      await queryInterface.addColumn(
        "Articles",
        "userId",
        {
          type: Sequelize.INTEGER,
          references: { model: "Users", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        { transaction },
      );

      // Comments -> Article and author (User)
      await queryInterface.addColumn(
        "Comments",
        "articleId",
        {
          type: Sequelize.INTEGER,
          references: { model: "Articles", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        { transaction },
      );
      await queryInterface.addColumn(
        "Comments",
        "userId",
        {
          type: Sequelize.INTEGER,
          references: { model: "Users", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        { transaction },
      );

      // Article <-> Tag
      await queryInterface.createTable(
        "TagList",
        {
          articleId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: { model: "Articles", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          tagName: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
            references: { model: "Tags", key: "name" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        },
        { transaction },
      );

      // Article <-> User who favorited it
      await queryInterface.createTable(
        "Favorites",
        {
          articleId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: { model: "Articles", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: { model: "Users", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        },
        { transaction },
      );

      // User <-> User (followers)
      await queryInterface.createTable(
        "Followers",
        {
          userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: { model: "Users", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          followerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: { model: "Users", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        },
        { transaction },
      );
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("Followers", { transaction });
      await queryInterface.dropTable("Favorites", { transaction });
      await queryInterface.dropTable("TagList", { transaction });
      await queryInterface.removeColumn("Comments", "userId", { transaction });
      await queryInterface.removeColumn("Comments", "articleId", {
        transaction,
      });
      await queryInterface.removeColumn("Articles", "userId", { transaction });
    });
  },
};
