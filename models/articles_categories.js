const { deepCopy } = require('../utils')
const fs = require('fs')
const FILE_PATH = './public/data/articles_categories.json'

class ArticlesCategoryModel {
  constructor() {
    this.articles_categories = []
    this.read()
      .then((articles_categories) => {
        this.articles_categories.push(...articles_categories)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 讀取
  read() {
    return new Promise((resolve, reject) => {
      fs.readFile(FILE_PATH, 'utf-8', (error, data) => {
        if (error) {
          return reject(error)
        }
        try {
          const articles_categories = JSON.parse(data)
          resolve(articles_categories)
        } catch (error) {
          reject(`JSON解析錯誤，error:${error}`)
        }
      })
    })
  }

  // 取得文章分類表
  getList() {
    return deepCopy(this.articles_categories)
  }

  // 依 id 取得文章分類表
  get(id) {
    return new Promise((resolve, reject) => {
      let ID = Number(id)
      let articles_categories = this.getList()
      let length = articles_categories.length

      console.log(
        `get articles_categories:${JSON.stringify(articles_categories)}`
      )

      // 遍歷 id 比對文章分類
      for (let i = 0; i < length; i++) {
        // return 中斷 if 迴圈，並 resolve 回傳結果
        if (ID === articles_categories[i].id) {
          console.log(
            `返回單項文章分類:${JSON.stringify(articles_categories[i])}`
          )
          return resolve({ index: i, data: articles_categories[i] })
        }
      }
      console.log(`${ID} is null`)
      reject({ index: -1, data: null })
    })
  }
}

// 建立實例
const articlesCategoryModel = new ArticlesCategoryModel()

module.exports = articlesCategoryModel
