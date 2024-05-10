const { ReturnCode, ErrorCode } = require('../utils/codes')
const { deepCopy } = require('../utils')
const fs = require('fs')
const FILE_PATH = './public/data/messages.json'

class MessageModel {
  constructor() {
    this.messages = []
    this.maxID =[]
    this.read()
      .then((data) => {
        this.messages.push(...data)
        this.maxID = this.maxId()
      })
      .catch()
    
  }

  read() {
    return new Promise((resolve, reject) => {
      fs.readFile(FILE_PATH, 'utf-8', (error, data) => {
        if (error) {
          console.log(`讀取文章留言失敗:${error}`)
          reject(error)
        }

        let dataParsed = JSON.parse(data)
        resolve(dataParsed)
      })
    })
  }

  getList(articleId) {
    // 取得留言列表 (深層複製保護原始資料)
    let messages = deepCopy(this.messages)

    // 比對符合文章 id 的留言
    let length = messages.length
    let messageSelected = []
    articleId = Number(articleId)
    for (let i = 0; i < length; i++) {
      let message = messages[i]
      if (articleId === message.articleId) {
        messageSelected.push(message)
      }
    }

    // 篩選後留言列表由最新排到最舊
    messageSelected.sort((a, b) => b.createAt - a.createAt)

    return messageSelected
  }

  async add({ articleId, message }) {
    try {
      // 取得留言列表 (應使用深層複製保護原始資料，而非存入變數，以避免異動到原始資料)
      let messages = deepCopy(this.messages)

      // 新增至留言列表
      let newMessage = {
        id: this.maxID + 1,
        articleId: Number(articleId),
        content: message.content,
        createAt: this.getTimeStamp()
      }
      messages.push(newMessage)

      // 寫入文章留言列表
      const writeResult = await this.write(messages)

      return newMessage
    } catch (error) {
      // TODO: try {
      //   throw new Error('Whoops!');
      // } catch (e) {
      //   console.log(e.name + ': ' + e.message);
      // }

      // 沒有儲存成功，將已經 PUSH 的值移除掉
      let messages = messages.pop(newMessage)
      console.log(`已經移除更新資料的messages:
      ${messages}`)

      console.log(`寫入文章留言列表失敗 messageModel: ${error}`)
      // TODO: ErrorCode.WriteError 要放在哪顯示?
      return {
        code: ErrorCode.WriteError,
        msg: '寫入數據時發生錯誤'
      }
    }
  }

  write(data) {
    // TODO: 非同步的函式都需要加 promise 嗎?
    return new Promise((resolve, reject) => {
      fs.writeFile(
        FILE_PATH,
        JSON.stringify(data, null, 4),
        (error, result) => {
          // 如果要測試錯誤訊息，須先了解何種情況會顯示錯誤，可以使用error = '測試'執行測試；如果是FILE_PATH寫錯，屬不同的錯誤
          if (error) {
            console.log('err:', error)
            reject(error)
          } else {
            console.log('資料已成功寫入檔案')
            resolve('資料已成功寫入檔案')
          }
        }
      )
    })
  }


  // 生成時間戳(秒)
  getTimeStamp() {
    return Math.floor(new Date().getTime() / 1000)
  }

  // 判斷留言列表 id 最大值 (置於 constructor 做取用)
  maxId() {
    let maxId = 0
    let length = this.messages.length
    for (let i = 0; i < length; i++) {
      let messageId = this.messages[i].id
      if (messageId > maxId) {
        maxId = messageId
      }
    }
    return maxId
  }
}

const messageModel = new MessageModel()
module.exports = messageModel
