const { Blog } = require('../models');
const { faker } = require('@faker-js/faker');


const _BLOG = [];
for (let i = 0; i < 5; i++) {
    _BLOG.push({
        tittle: faker.lorem.lines(),
        userContent: faker.lorem.paragraph(2),
        date: faker.date.between()
    });
}

const seedBook = () => Blog.bulkCreate(blogData);

module.exports = seedBook;
