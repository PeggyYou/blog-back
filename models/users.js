const { deepCopy } = require('../utils')
const fs = require('fs')
const FILE_PATH = './public/data/users.json'

class UserModel {
  constructor() {
    this.users = []
    this.read()
      .then((users) => {
        this.users.push(...users)
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
          const users = JSON.parse(data)
          resolve(users)
        } catch (error) {
          reject(`JSON解析錯誤，error:${error}`)
        }
      })
    })
  }

  // 取得文章分類
  getList() {
    return deepCopy(this.users)
  }

  // 依 id 取得用戶資料
  get(id) {
    let ID = Number(id)
    let users = this.getList()
    let length = users.length

    console.log(`取得所有用戶資料:${JSON.stringify(users)}`)
    for (let i = 0; i < length; i++) {
      if (ID === users[i].id) {
        console.log(`返回單筆用戶資料:${JSON.stringify(users[i])}`)
        return { index: i, data: users[i] }
      }
    }
    console.log(`${ID} is null`)
    return { index: -1, data: null }
  }
}

// 建立實例
const userModel = new UserModel()

module.exports = userModel
