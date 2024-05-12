const articleModel = require('./articles') 
const categoryModel = require('./categories')
const articlesCategoryModel = require('./articles_categories')
const commentModel = require('./comments')
const userModel = require('./users')

module.exports = {
  articleModel,
  categoryModel,
  articlesCategoryModel,
  commentModel,
  userModel
}
