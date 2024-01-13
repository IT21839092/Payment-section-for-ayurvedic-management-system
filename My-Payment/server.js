const express=require('express');
const mongoose=require('mongoose')
const cors = require('cors');
const app=express();
const dotenv = require('dotenv');

//import routes
const paymentRoutes=require('./routes/paymentRoutes')

dotenv.config()
const DB_URL=`mongodb+srv://thilakshanapiumika:${process.env.MONGODB_PASSWORD}@cluster0.wm7k7pf.mongodb.net/itpProject?retryWrites=true&w=majority`

const PORT = process.env.PORT || 5000;

//app middleware
app.use(express.json())
app.use(cors());

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use('/images',express.static('images'))

//route middleware
app.use('/api/payments',paymentRoutes)

//connect DB
mongoose.connect(DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    app.listen(PORT, ()=>{
        console.log('DB connected')
        console.log(`App is running on`,PORT);
    })
})
.catch((err)=>console.log('DB connection error',err));

