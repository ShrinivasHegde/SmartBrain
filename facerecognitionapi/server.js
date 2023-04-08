
import bcrypt from 'bcrypt'
import express, { response } from 'express'
import cors from 'cors'
import knex from 'knex'
import register from './controllers/register.js'
import signin from './controllers/signin.js'
import profile from './controllers/profile.js'
import {handleEntry,handleApiCall} from './controllers/entry.js'


//connect with database

const db = knex ({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
  });

//   db.select('*').from('users').then(data=>{
//     console.log(data)
//   })

//database for testing
// const database = {
//     users : [
//         {
//             id:'123',
//             name: 'John',
//             email: 'john@gmail.com',
//             password: 'cookies',
//             entries: 0,
//             joined : new Date()
//         },
//         {
//             id:'124',
//             name: 'Sally',
//             password:'banana',
//             email: 'sally@gmail.com',
//             entries: 0,
//             joined : new Date()
//         }
//     ],
//     login: [
//         {
//             id: '987',
//             hash:'',
//             email: 'john@gmail.com'
//         }
//     ]//}

const app = express()
app.use(express.json())

app.use(cors())
app.get('/',(req,res)=>{ res.send(database.users) })

//SignIn 
app.post('/signin',(req,res)=>{signin.handleSignIn(req,res,db,bcrypt)})

//Register
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)}) //dependency injection

//profile
app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})

//Image entry count //Entries
app.put('/image',(req,res)=>{handleEntry(req,res,db)})
app.post('/imageUrl',(req,res)=>{handleApiCall(req,res)})

app.listen(3000,()=>{
    console.log('App is running on port 3000')
})

/*

plan 
res- this is working
SignIn -- POST - Success/Fail
Register -- POST - USer
Profile -- userId -- GET - User
Image -- > Put -- User (rank)--Image entry count
*/