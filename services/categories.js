const { articleModel, categoryModel } = require('../models')

class CategoryService {
  // 取得文章分類
  getList() {
    return categoryModel.getList()
  }
}

const categoryService = new CategoryService()
module.exports = categoryService
