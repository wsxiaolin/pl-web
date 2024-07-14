## 可用 API 列表

> 再次强调：返回结果建议自己打印！！！！！

### auth

- login: 登录物实账号（不支持第三方登录），返回活动信息+个人账号信息

### messages

- get: 获取留言/评论，实验+讨论+用户留言板均可(ID,type,take,from,skip)
- comment: 留言或评论(回复位置的ID,type,回复内容,被回复的人的序列号)

### projects

- query: 按照要求筛选作品列表，需要登录(type,query{tags,excludeTags,take,from,skip})
- getSummary: 获取作品简略信息(id,type)
- GetDerivatives: 获取作品简详细信息(id,type)