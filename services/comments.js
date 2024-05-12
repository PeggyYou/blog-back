const {
  articleModel,
  categoryModel,
  articlesCategoryModel,
  commentModel,
  userModel
} = require('../models')
const { ReturnCode, ErrorCode } = require('../utils/codes')

class CommentService {
  constructor() {
    this.comment = []
  }

  getList({offset,size,articleId}) {
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
        console.log('有 id 文章')

        // 取得留言列表
        let comments = commentModel.getList(articleId)
        let length = comments.length
        console.log(`length of comments:${length}`)

        // 帶入用戶資料
        comments.forEach((comment) => {
          let user = []
          user.push(userModel.get(comment.user).data)
          comment.user = user
          console.log(`comment forEach:${JSON.stringify(comment)}`)
        })
        console.log(`comments:${JSON.stringify(comments)}`)

        // 依 offset 及 size 回傳留言篇數
        // 若無設定，預設 offset = 0； size = 3
        if (typeof offset === 'undefined') {
          offset = '0'
        }
        if (typeof size === 'undefined') {
          size = '1'
        }
        // 型態處理
        offset = Number(offset.trim())
        size = Number(size.trim())
        // 當請求篇數大於留言列表總數，依留言列表總數為主
        if (size > length) {
          size = length
        }
        console.log(`offset:${offset}`)
        console.log(`size:${size}`)
        comments = comments.slice(offset, offset + size)

        console.log(`comments sliced:${JSON.stringify(comments)}`)

        comments = {
          total: length,
          offset,
          size,
          main: comments
        }

        console.log(`comments post:${JSON.stringify(comments)}`)

        return resolve(comments)
      } catch (error) {
        console.log(`取得文章留言錯誤：${JSON.stringify(error)}`)
        if (error.index === -1) {
          console.log(`確認單篇文章不存在：${JSON.stringify(error)}`)
          reject({
            code: ErrorCode.NotFound,
            msg: `沒有 id 為 ${articleId} 的文章`
          })
        } else {
          // TODO: 如果 commentModel.getList(articleId) 發生錯誤，如何辨識並回傳?
          reject({
            code: ErrorCode.ReadError,
            msg: `讀取數據時發生錯誤`
          })
        }
      }
    })
  }

  add({ articleId, comment }) {
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
        let newComment = await commentModel.add({ articleId, comment })

        resolve(newComment)
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

const commentService = new CommentService()
module.exports = commentService
