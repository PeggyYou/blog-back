const {
  articleModel,
  categoryModel,
  articlesCategoryModel,
  messageModel,
  userModel
} = require('../models')

class CategoryService {
  // 取得文章分類
  getList() {
    return categoryModel.getList()
  }
}

const categoryService = new CategoryService()
module.exports = categoryService
