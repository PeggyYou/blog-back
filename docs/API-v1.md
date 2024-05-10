## API 請求回應格式

- GET /v1/articles
  - 返回文章列表
  - 可選 query 參數: keyword，根據關鍵字來過濾文章列表 ex: /articles?keyword=xxx
  - Response 數據格式：
  ```
  [
      {
          id: 1,
          author: "Author Name",
          title: "This is title",
          createAt: 1705819929,
          updateAt: 1705819929,
      },
      {
          id: 2,
          author: "Author Name",
          title: "This is title2",
          createAt: 1705819929,
          updateAt: 1705819930,
      },
      ...
  ]
  ```
- POST /v1/articles
  - 新增文章
  - Request 數據格式：
  ```
  {
      author: "Author Name",
      title: "This is title",
      content: "This is content",
  }
  ```
  - Response 數據格式：
  ```
  {
      id: 3,
      author: "Author Name",
      title: "This is title3",
      content: "This is content3",
      updateAt: 1705840000
  }
  ```
- GET /v1/articles/:id
  - 根據 id 返回單篇文章
  - Response 數據格式：
  ```
  {
      id: 3,
      author: "Author Name",
      title: "This is title3",
      content: "This is content3",
      createAt: 1705819929,
      updateAt: 1705819930
  }
  ```
- PUT /v1/articles/:id
  - 根據 id 更新單篇文章
  - Request 數據格式：
  ```
  {
      author: "Author Name",
      title: "This is title",
      content: "This is new content"
  }
  ```
  - Response 數據格式：
  ```
  {
      id: 4,
      author: "Author Name",
      title: "This is title",
      content: "This is new content",
      createAt: 1705840000,
      updateAt: 1705840000
  }
  ```
- GET /v1/articles/category
  - 返回文章分類
  - Response 數據格式：
  ```
  [
    {
        "id": 1,
        "category":"無分類"
    },
    {
        "id": 2,
        "category":"理財"
    },
    ...
  ]
  ```

## 完整資料結構(JSON)

- 文章資料

```
{
    id: 1,
    author: "Author Name",
    title: "This is title",
    content: "This is content",
    createAt: 1705819929,
    // 為 UTC+0 的時間戳，前端需要自行轉換成需要的格式
    updateAt: 1705819929,
}
```

- 文章分類資料

```
{
        "id": 1,
        "category":"無分類"
}
```
