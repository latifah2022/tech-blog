const { Blog } = require('../models');
const { faker } = require('@faker-js/faker');


const _BLOG = [];
for (let i = 0; i < 5; i++) {
    _BLOG.push({
        title: faker.lorem.lines(),
        description: faker.lorem.paragraph(2),
        author: faker.name.firstName(),
        date: faker.date.between()
    });
}

const seedBook = () => Blog.bulkCreate(_BLOG);

module.exports = seedBook;
