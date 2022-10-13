const sequelize = require("../config/connection");
const seedUser = require("./user");
const {Blog, User, Comment} = require("../models")
const seedComment = require("./comment");
const SeedBlog = require("./blog");

const seedAll = async () => {
    await sequelize.sync({force: true });

    console.log("=====================");
    await seedUser();

    console.log("================");
    await SeedBlog();

    console.log("=================");
    await seedComment();

    process.exit(0);
}

seedAll();