const mongoose=require('./connect')
const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')


dotenv.config()
const app=express()

mongoose.connectMongoose()
app.use(express.json())
app.use(cors())

const Registerrouter=require('./Router/Registerrouter')
const Itemrouter=require('./Router/Itemrouter')
const Authmodule=require('./Modules/Authmodule')
const Striperouter=require('./Router/Striperouter')
app.use('/stripe',Striperouter)

app.use('/register',Registerrouter)
app.use('/',Authmodule.authenticate)
app.use('/item',Itemrouter)





const server=app.listen(process.env.PORT,console.log('server started'))

