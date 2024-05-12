# API

## Articles

### `全部文章`

**URL :** `BASE_URL/articles?offset=XX&size=XX&keyword=XX&filter=XX`

**URL for articles:** `BASE_URL/articles`

**URL for keyword filter:** `BASE_URL/articles?keyword=XX`

**URL for category filter:** `BASE_URL/articles?keyword=XX&filter=XX`

**URL for pagination:** `BASE_URL/articles?offset=XX&size=XX`

**Request :** `GET`

**Body :**

**Response :**

```
{
  total: XX,
  offset: XX,
  size: XX,
  main: [
    {
      id: XX,
      title: 'XXXXXX',
      picture: 'XXXXXX',
      content: 'XXXXXX',
      user: [
        { 
          id: XX, 
          avatar: 'XXXXXX', 
          username: 'XXXXXX',
          email: 'XXXXXX',
          password: 'XXXXXX'
        }
      ],
      categories: [
        { 
          id: XX, 
          category: 'XXXXXX'
        }
      ]
    }
  ]
}
```

### `單篇文章`

**URL :** `BASE_URL/articles/:id`

**Request :** `GET`

**Body :**

**Response :**

```
[
  {
    id: XX,
    title: 'XXXXXX',
    picture: 'XXXXXX',
    content: 'XXXXXX',
    user: [
      { 
        id: XX, 
        avatar: 'XXXXXX', 
        username: 'XXXXXX',
        email: 'XXXXXX',
        password: 'XXXXXX'
      }
    ],
    categories: [
      { 
        id: XX, 
        category: 'XXXXXX'
      }
    ]
  }
]
```

## Comments

### `單篇文章全部留言`

**URL :** `BASE_URL/comments/:id?offset=XX&size=XX`

**Request :** `GET`

**Body :**

**Response :**

```
{
  total: XX,
  offset: XX,
  size: XX,
  main: [
    {
      id: XX,
      article_id: XX,
      comment: "XXXXXX",
      user: [
        { 
          id: XX, 
          avatar: 'XXXXXX', 
          username: 'XXXXXX',
          email: 'XXXXXX',
          password: 'XXXXXX'
        }
      ]
    }
  ]
}
```