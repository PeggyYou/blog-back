const articleModel = require('./articles') 
const categoryModel = require('./categories')
const articlesCategoryModel = require('./articles_categories')
const messageModel = require('./comments')

module.exports = {
  articleModel,
  categoryModel,
  articlesCategoryModel,
  messageModel
}
