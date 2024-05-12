// 引用 Express 與 Express 路由器
const { Router } = require('express')

// 引用資料
const {
  articleService,
  categoryService,
  commentService
} = require('../services')
const { ReturnCode, ErrorCode } = require('../utils/codes')

// 建立路由
const router = Router()

// GET /articles (取得文章列表及搜尋關鍵字)
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  console.log(`req.query.keyword:${keyword}`)
  const offset = req.query.offset
  console.log(`req.query.offset:${offset}`)
  const size = req.query.size
  console.log(`req.query.size:${size}`)
  res.json(articleService.getList({offset,size,keyword}))
})

// POST /articles (新增單篇文章)
router.post('/', (req, res) => {
  const BODY = req.body
  console.log(JSON.stringify(BODY))

  const author = BODY.author
  if (author === undefined || author === '') {
    return res.status(ReturnCode.BadRequest).json({
      code: ErrorCode.MissingParameters,
      msg: 'author 為必要參數'
    })
  }
  const title = BODY.title
  if (title === undefined || title === '') {
    return res.status(ReturnCode.BadRequest).json({
      code: ErrorCode.MissingParameters,
      msg: 'title 為必要參數'
    })
  }
  const content = BODY.content
  if (content === undefined || content === '') {
    return res.status(ReturnCode.BadRequest).json({
      code: ErrorCode.MissingParameters,
      msg: 'content 為必要參數'
    })
  }
  const category = BODY.category
  if (category === undefined || category === '') {
    return res.status(ReturnCode.BadRequest).json({
      code: ErrorCode.MissingParameters,
      msg: 'category 為必要參數'
    })
  }

  articleService
    .add(BODY)
    .then((article) => {
      res.json(article)
    })
    .catch((error) => {
      res.status(ErrorCode.getReturnCode(error.code)).json(error)
    })
})

// GET /articles/category (取得文章分類)
router.get('/category', (req, res) => {
  res.json(categoryService.getList())
})

// GET /articles/:id/comments (單篇文章_取得留言)
router.get('/:id/comments', (req, res) => {
  const articleId = req.params.id
  console.log(`req.params.id:${articleId}`)
  commentService
    .getList(articleId)
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      console.log(`error comments in response:${JSON.stringify(error)}`)
      res.status(ErrorCode.getReturnCode(error.code)).json(error)
    })
})

// POST /articles/:id/comments (單篇文章_新增留言)
router.post('/:id/comments', (req, res) => {
  const articleId = req.params.id
  const comments = req.body

  const content = comments.content
  if (content === undefined || content === '') {
    return res.status(ReturnCode.BadRequest).json({
      code: ErrorCode.MissingParameters,
      msg: 'content 為必要參數'
    })
  }

  commentService
    .add({ articleId, comments })
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      res.status(ErrorCode.getReturnCode(error.code)).json(error)
    })
})

// GET /articles/:id (取得單篇文章)
router.get('/:id', (req, res) => {
  const id = req.params.id
  console.log(`req.params.id:${id}`)
  articleService
    .get(id)
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      res.status(ErrorCode.getReturnCode(error.code)).json(error)
    })
})

// PUT /articles/:id (修改單篇文章)
router.put('/:id', (req, res) => {
  const id = req.params.id
  const editArticle = req.body
  console.log(`req.params:${JSON.stringify(req.params)}`)
  console.log(`req.params.id:${id}`)
  console.log(`req.body:${JSON.stringify(editArticle)}`)

  const author = editArticle.author
  if (author === undefined || author === '') {
    return res.status(ReturnCode.BadRequest).json({
      code: ErrorCode.MissingParameters,
      msg: 'author 為必要參數'
    })
  }
  const title = editArticle.title
  if (title === undefined || title === '') {
    return res.status(ReturnCode.BadRequest).json({
      code: ErrorCode.MissingParameters,
      msg: 'title 為必要參數'
    })
  }
  const content = editArticle.content
  if (content === undefined || content === '') {
    return res.status(ReturnCode.BadRequest).json({
      code: ErrorCode.MissingParameters,
      msg: 'content 為必要參數'
    })
  }
  const category = editArticle.category
  if (category === undefined || category === '') {
    return res.status(ReturnCode.BadRequest).json({
      code: ErrorCode.MissingParameters,
      msg: 'category 為必要參數'
    })
  }

  articleService
    .update({ id, editArticle })
    .then((result) => {
      console.log(`修改單篇文章成功，路由回傳:${JSON.stringify(result)}`)
      res.json(result)
    })
    .catch((error) => {
      console.log(`修改單篇文章失敗，路由回傳:${JSON.stringify(error)}`)
      res.status(ErrorCode.getReturnCode(error.code)).json(error)
    })
})

// 輸出 Router
module.exports = router
