const {
  articleModel,
  categoryModel,
  articlesCategoryModel,
  messageModel,
  userModel
} = require('../models')
const { ReturnCode, ErrorCode } = require('../utils/codes')

class ArticleService {
  constructor() {
    this.article = []
  }

  // 取得文章列表
  getList(keyword) {
    // 取得文章列表
    let articles = articleModel.getList()
    console.log(`articles from deepCopy:${JSON.stringify(articles)}`)
    let articles_categories = articlesCategoryModel.getList()
    console.log(
      `articles_categories from deepCopy:${JSON.stringify(articles_categories)}`
    )

    // 帶入文章分類
    articles.forEach((article) => {
      let category = []
      console.log(
        `article.id:${article.id}，article:${JSON.stringify(article)}`
      )
      // 文章及分類對照表
      articles_categories.forEach((list) => {
        console.log(`list:${JSON.stringify(list)}`)
        if (list.article_id === article.id) {
          category.push(categoryModel.get(list.category_id).data)
          console.log(
            `category after pushed:${JSON.stringify(JSON.stringify(category))}`
          )
        }
      })
      article.categories = category
      console.log(`category in article:${JSON.stringify(article.category)}`)

      console.log(`article pushed:${JSON.stringify(article)}`)
    })

    // 帶入用戶
    articles.forEach((article) => {
      let user = []
      console.log(`article.user:${JSON.stringify(article.user)}`)
      console.log(
        `userModel.get(article.user):${JSON.stringify(
          userModel.get(article.user)
        )}`
      )
      user.push(userModel.get(article.user).data)
      article.user = user
      console.log(`article.user:${JSON.stringify(article.user)}`)
    })
    console.log(`articles with user:${JSON.stringify(articles)}`)

    // 文章列表比對 keyword
    if (typeof keyword !== 'undefined') {
      // keyword 做字串處理
      let keyword_ = keyword.trim().toLowerCase()
      console.log(`keyword_:${keyword_}`)
      articles = articles.filter(function (item, index, array) {
        return (
          item.author.toLowerCase().toLowerCase().includes(keyword_) ||
          item.title.toLowerCase().includes(keyword_) ||
          item.content.toLowerCase().includes(keyword_)
        )
      })
    }
    console.log(`articles:${JSON.stringify(articles)}`)

    return articles
  }

  // 依 id 取得單篇文章
  get(id) {
    // promise 內判定所有情境，包含判斷 id 的值
    return new Promise((resolve, reject) => {
      if (isNaN(id) || id.trim() === '') {
        reject({
          code: ErrorCode.InvalidParameters,
          msg: `id 請提供數字`
        })
      } else {
        articleModel
          .get(id)
          .then((result) => {
            resolve(result.data)
          })
          .catch((error) => {
            reject({
              code: ErrorCode.NotFound,
              msg: `沒有 id 為 ${id} 的文章`
            })
          })
      }
    })
  }

  // 新增單篇文章
  add(article) {
    return new Promise((resolve, reject) => {
      articleModel
        .add(article)
        .then((article) => {
          resolve(article)
        })
        .catch((error) => {
          reject({
            code: ErrorCode.WriteError,
            msg: '寫入數據時發生錯誤'
          })
        })
    })
  }

  // 修改單篇文章
  update({ id, editArticle }) {
    // TODO: 確認哪一階段執行 id 型態轉換
    return new Promise((resolve, reject) => {
      if (isNaN(id) || id.trim() === '') {
        reject({
          code: ErrorCode.InvalidParameters,
          msg: `id 請提供數字`
        })
      } else {
        articleModel
          .update({ id, editArticle })
          .then((data) => {
            console.log(`articleService 成功獲得資料:${JSON.stringify(data)}`)
            resolve(data)
          })
          .catch((error) => {
            console.log('articleService 獲得資料失敗')
            if (error.index === -1) {
              reject({
                code: ErrorCode.NotFound,
                msg: `沒有 id 為 ${id} 的文章`
              })
            } else {
              reject({
                code: ErrorCode.UpdateError,
                msg: '更新數據時發生錯誤'
              })
            }
          })
      }
    })
  }
}

const articleService = new ArticleService()

module.exports = articleService
