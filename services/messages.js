const { articleModel, categoryModel, messageModel } = require('../models')
const { ReturnCode, ErrorCode } = require('../utils/codes')

class MessageService {
  constructor() {
    this.message = []
  }

  getList(articleId) {
    return new Promise(async (resolve, reject) => {
      try {
        // 確認 id 屬有效值
        if (isNaN(articleId) || articleId.trim() === '') {
          // TODO: 在 try 也可以提供失敗訊息?
          return reject({
            code: ErrorCode.InvalidParameters,
            msg: 'id 請提供數字'
          })
        }

        //確認單篇文章是否存在
        await articleModel.get(articleId)

        // 取得留言列表
        let messages = messageModel.getList(articleId)

        return resolve(messages)
      } catch (error) {
        console.log(`取得文章留言錯誤：${JSON.stringify(error)}`)
        if (error.index === -1) {
          console.log(`確認單篇文章不存在：${JSON.stringify(error)}`)
          reject({
            code: ErrorCode.NotFound,
            msg: `沒有 id 為 ${articleId} 的文章`
          })
        } else {
          // TODO: 如果 messageModel.getList(articleId) 發生錯誤，如何辨識並回傳?
          reject({
            code: ErrorCode.ReadError,
            msg: `讀取數據時發生錯誤`
          })
        }
      }
    })
  }

  add({ articleId, message }) {
    return new Promise(async (resolve, reject) => {
      try {
        // 確認 id 屬有效值
        if (isNaN(articleId) || articleId.trim() === '') {
          // TODO: 在 try 也可以提供失敗訊息?
          return reject({
            code: ErrorCode.InvalidParameters,
            msg: 'id 請提供數字'
          })
        }

        //確認單篇文章是否存在
        // TODO: 取得單篇文章，要使用 MODEL 還是 SERVICE?
        await articleModel.get(articleId)

        // 新增留言
        let newMessage = await messageModel.add({ articleId, message })

        resolve(newMessage)
      } catch (error) {
        console.log(`無法新增留言, 錯誤訊息:${JSON.stringify(error)}`)
        if (error.index === -1) {
          reject({
            code: ErrorCode.NotFound,
            msg: `沒有 id 為 ${articleId} 的文章`
          })
        } else {
          // TODO: 哪邊在控制 reject回傳的內容? service ? model?
          reject({
            code: ErrorCode.WriteError,
            msg: `無法成功寫入文章留言`
          })
        }
      }
    })
  }
}

const messageService = new MessageService()
module.exports = messageService
