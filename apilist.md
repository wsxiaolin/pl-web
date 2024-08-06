## 可用 API 列表

> 再次强调：返回结果建议自己打印！！！！！
> 不再在此提供参数列表，IDE会自动提示的

### auth

- login: 登录物实账号（不支持第三方登录），返回活动信息+个人账号信息
- getUser: 获取**其他**用户的资料卡信息

### messages

- getComments: 获取留言/评论，实验+讨论+用户留言板均可(ID,type,take,from,skip)
- comment: 留言或评论(回复位置的ID,回复内容[,type,被回复的人的序列号])
- getMessage: 根据留言/评论 ID获取评论者详细信息
- emoticons: 提供一个对象，内含一些字符画表情包，内容为字符串

### projects

- query: 按照要求筛选作品列表，需要登录(type,query{tags,excludeTags,take,from,skip})
- getSummary: 获取作品简略信息(id,type)
- GetDerivatives: 获取作品简详细信息(id,type)
- star: 收藏作品（可匿名）
- cover: 更新封面
- getExperiment: 获取实验存档
- getSupporters: 获取作品支持者