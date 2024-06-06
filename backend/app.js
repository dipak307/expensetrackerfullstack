const express=require("express");
const cors=require('cors');
const {db}=require('./db/db')
const app=express();
const {readdirSync}=require('fs')

 require('dotenv').config();

const PORT=process.env.PORT;
///middleware
app.use(express.json())
 app.use(cors({
       origin:"https://expensetrackerfullstack-ol1o.vercel.app",
       methods:['POST','GET'],
       credentials:true,
     }))

//routes
readdirSync('./routes').map((route) => app.use('/api/v1' , require('./routes/' + route)))

app.get('/',(req,res)=>{
    res.send("hellow world");
})

const server=()=>{
    db()
    app.listen(PORT,()=>{
        console.log('listening to ports:' , PORT)
    })
}

server();









