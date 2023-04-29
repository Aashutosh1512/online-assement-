import express from 'express';
import cors from 'cors';
import {config} from 'dotenv';
import morgan from 'morgan';
import router from './router/route.js';
import path from 'path'
import connect from './database/conn.js';

const app=express();
// app middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'))
config();

app.use(express.static(path.join(__dirname, './client/build')))

app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})

/**appliation port  */
const port =process.env.PORT||8000;

/**routes */
app.use('/api',router)

app.get('/',(req,res)=>{
    try{
    res.json("hain bhai get request karei h ")}
    catch(error){
        console.log(error);
    }
})
 
//start server when we have a valid  connections else not 
connect()
.then(()=>{

    try {
        
app.listen(8000,()=>{
    console.log(`server is working at local host ${8000}`)
})
    } catch (error) {
        console.log(error);
        console.log("BHAI SERVER SE CONNECT NHI HO RHA ")
    }
})
.catch(error=>{
console.log("invalid Database CONNECTION/ Pta nhi bhai esa kyu ho riya ")
})
