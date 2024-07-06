## 可用 API 列表

### user

- login: 登录物实账号（不支持第三方登录），返回活动信息+个人账号信息(username,password)
- getToken: 获取用户 token，后续请求要用（可匿名）(username,password)

### messages

- get: 获取留言/评论，实验+讨论+用户留言板均可(ID,type,take,from,skip)

### projects

- query: 按照要求筛选作品列表，需要登录(type,query{tags,excludeTags,take,from,skip})
