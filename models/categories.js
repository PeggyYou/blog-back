const { deepCopy } = require('../utils')
const fs = require('fs')
const FILE_PATH = './public/data/categories.json'

class CategoryModel {
  constructor() {
    this.categories = []
    this.read()
      .then((categories) => {
        this.categories.push(...categories)
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
          const categories = JSON.parse(data)
          resolve(categories)
        } catch (error) {
          reject(`JSON解析錯誤，error:${error}`)
        }
      })
    })
  }

  // 取得文章分類
  getList() {
    return deepCopy(this.categories)
  }

  // 依 id 取得文章分類
  get(id) {
    let ID = Number(id)
    let categories = this.getList()
    let length = categories.length

    console.log(`get categories:${JSON.stringify(categories)}`)
    for (let i = 0; i < length; i++) {
      if (ID === categories[i].id) {
        console.log(`返回單項文章分類:${JSON.stringify(categories[i])}`)
        return { index: i, data: categories[i] }
      }
    }
    console.log(`${ID} is null`)
    return { index: -1, data: null }
  }
}

// 建立實例
const categoryModel = new CategoryModel()

module.exports = categoryModel
