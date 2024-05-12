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
  getList({ offset, size, keyword }) {
    console.log(`offset:${offset}`)
    console.log(`size:${size}`)
    // 取得文章列表
    let articles = articleModel.getList()
    let length = articles.length
    console.log(`length at begin:${length}`)

    // 取得文章分類
    let articles_categories = articlesCategoryModel.getList()

    // 帶入文章分類
    articles.forEach((article) => {
      let category = []
      // 依文章 id 篩選文章分類
      articles_categories.forEach((list) => {
        if (list.article_id === article.id) {
          category.push(categoryModel.get(list.category_id).data)
        }
      })
      article.categories = category
    })

    // 帶入用戶
    articles.forEach((article) => {
      let user = []
      user.push(userModel.get(article.user).data)
      article.user = user
    })

    // 文章列表比對 keyword
    if (typeof keyword !== 'undefined') {
      // keyword 做字串處理
      let keyword_ = keyword.trim().toLowerCase()
      console.log(`keyword_:${keyword_}`)
      articles = articles.filter(function (item, index, array) {
        // keyword 比對文章列表
        let hasCategory
        item.categories.some((category) => {
          if (category.category.toLowerCase().includes(keyword_)) {
            hasCategory = true
            return hasCategory
          }
        })
        return (
          item.user[0].username.toLowerCase().includes(keyword_) ||
          item.title.toLowerCase().includes(keyword_) ||
          item.content.toLowerCase().includes(keyword_) ||
          hasCategory
        )
      })
    }
    console.log(`articles:${JSON.stringify(articles)}`)
    length = articles.length
    console.log(`length after keyword:${length}`)

    // 依 offset 及 size 回傳文章篇數
    // 若無設定，預設 offset = 0； size = 3
    if (typeof offset === 'undefined') {
      offset = '0'
    }
    if (typeof size === 'undefined') {
      size = '3'
    }
    // 型態處理
    offset = Number(offset.trim())
    size = Number(size.trim())
    // 當請求篇數大於文章列表總數，依文章列表總數為主
    if (size > length) {
      size = length
    }
    articles = articles.slice(offset, offset + size)

    console.log(`articles sliced:${JSON.stringify(articles)}`)

    articles = {
      total: length,
      offset,
      size,
      main: articles
    }

    console.log(`articles combination:${JSON.stringify(articles)}`)

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
