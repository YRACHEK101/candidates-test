"use strict";

const { User, Article } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User.findAll({ order: [["id", "ASC"]] });
    const articles = await Article.findAll({ order: [["id", "ASC"]] });

    // Tags
    const tagNames = ["javascript", "react", "node", "postgres", "docker"];
    await queryInterface.bulkInsert(
      "Tags",
      tagNames.map((name) => ({ name })),
      {},
    );

    // Each article gets two tags
    const tagList = articles.flatMap((article, index) => [
      { articleId: article.id, tagName: tagNames[index % tagNames.length] },
      {
        articleId: article.id,
        tagName: tagNames[(index + 1) % tagNames.length],
      },
    ]);
    await queryInterface.bulkInsert("TagList", tagList, {});

    // Two comments on each of the first 10 articles
    const comments = articles.slice(0, 10).flatMap((article, index) => [
      {
        body: `Great article! (comment ${index * 2 + 1})`,
        articleId: article.id,
        userId: users[index % users.length].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        body: `Thanks for sharing. (comment ${index * 2 + 2})`,
        articleId: article.id,
        userId: users[(index + 1) % users.length].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("Comments", comments, {});

    // Each user favorites a few articles
    const favorites = users.flatMap((user, userIndex) =>
      articles
        .filter((_, articleIndex) => articleIndex % users.length === userIndex)
        .slice(0, 4)
        .map((article) => ({ articleId: article.id, userId: user.id })),
    );
    await queryInterface.bulkInsert("Favorites", favorites, {});

    // exampleUser1 follows exampleUser2 and exampleUser3,
    // exampleUser2 follows exampleUser1
    const followers = [
      { userId: users[1].id, followerId: users[0].id },
      { userId: users[2].id, followerId: users[0].id },
      { userId: users[0].id, followerId: users[1].id },
    ];
    await queryInterface.bulkInsert("Followers", followers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Followers", null, {});
    await queryInterface.bulkDelete("Favorites", null, {});
    await queryInterface.bulkDelete("Comments", null, {});
    await queryInterface.bulkDelete("TagList", null, {});
    await queryInterface.bulkDelete("Tags", null, {});
  },
};
