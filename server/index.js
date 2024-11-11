import express from 'express';
import authRoute from './Routes/authRoute.js'
import userRoute from './Routes/userRoute.js'
import cors from 'cors'
import connectDb from './config/db.js';
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true, 
  }));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(cookieParser());
connectDb()

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(4000,()=>{
    console.log('Server is running on port 4000');
})