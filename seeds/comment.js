const { Comment} = require('../models');
const { faker } = require('@faker-js/faker');

const _COMMENT = [];
for (let i = 0; i < 5; i++) {
  _COMMENT.push({
    userComment: faker.lorem.paragraph(2),
    date: faker.date.between()
  });
}
const seedComment = () => Comment.bulkCreate(_COMMENT);
module.exports = seedComment;