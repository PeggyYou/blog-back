// 引用 Express 與 Express 路由器
const  { Router }  = require('express')

// 建立路由
const router = Router()

// articles
const articles = require('./articles')
router.use('/articles', articles)

// 匯出 router
module.exports = router