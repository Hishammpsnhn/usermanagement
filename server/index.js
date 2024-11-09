import express from 'express';
import authRoute from './Routes/authRoute.js'
import cors from 'cors'
import connectDb from './config/db.js';

const app = express();


app.use(cors());

connectDb()

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth',authRoute)

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(4000,()=>{
    console.log('Server is running on port 4000');
})