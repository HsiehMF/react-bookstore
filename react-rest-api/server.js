const path = require('path')
const fs = require('fs')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middleWares = jsonServer.defaults()
require('dotenv').config()
server.use(jsonServer.bodyParser)
server.use(middleWares)

server.post('/auth/login', (req, res) => {
  const { email, password } = req.body
  if (isAuthenticated({ email, password })) {
    // getUsersDb: fs modules to read JSON file.
    const user = getUsersDb().users.find(u => u.email === email && u.password === password)
    const { nickname, type } = user
    
    const jwToken = createToken({ nickname, type, email })
    return res.status(200).json(jwToken)
  } else {
    const status = 401
    const message = '信箱或密碼錯誤'
    return res.status(status).json({
      status,
      message
    })
  }
})

server.post('/auth/register', (req, res) => {
  const { email, password, nickname, type } = req.body

  if (isEmailExist(email)) {
    const status = 401
    const message = '信箱已經存在，請重新輸入'
    return res.status(status).json({
      status,
      message
    })
  }

  fs.readFile(path.join(__dirname, 'users.json'), (err, data) => {

    if (err) {
      const status = 401
      return res.status(status).json({
        status,
        err
      })
    }
    const fomat_data = JSON.parse(data.toString())
    // 計算目前使用者數量以賦予使用者 id，並將資料加入 JSON 檔案
    const last_item_id = fomat_data.users[fomat_data.users.length - 1].id
    fomat_data.users.push({
      id: last_item_id + 1,
      email,
      password,
      nickname,
      type
    })
    fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(fomat_data), (err, result) => {
        if (err) {
          const status = 401
          return res.status(status).json({
            status,
            err
          })
        }
        return res.status(200);
      })
  })
  const jwToken = createToken({ nickname, type, email })
  res.status(200).json(jwToken)
})

const getUsersDb = () => {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, 'users.json'), 'UTF-8')
  )
}

const isAuthenticated = ({
  email,
  password
}) => {
  return (
    getUsersDb().users.findIndex(
      user => user.email === email && user.password === password
    ) !== -1
  )
}

const isEmailExist = (email) => {
  return (
    getUsersDb().users.findIndex(
      user => user.email === email
    ) !== -1
  )
}

const JWT_SECRET = process.env.JWT_SECRET
const createToken = payload => {
  console.log(payload)
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h'
  })
}

const verifyToken = token => {
  return jwt.verify(token, JWT_SECRET, (err, decode) =>
    decode !== undefined ? decode : err
  )
}

server.use(router)
server.listen(3001, (res, req) => {
  console.log('JSON Server is running')
})