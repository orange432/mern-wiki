import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import APIRouter from './api/routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express();
const PORT = process.env.PORT || 8000;
const DATABASEURL = process.env.DATABASE_URL

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

app.use('/api',APIRouter);

app.use((req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
})

mongoose.connect(DATABASEURL,{useNewUrlParser: true})
.then(
    ()=>{ app.listen(PORT,()=>console.log(`App listening on port: ${PORT}`))},
    err => { console.log(err) }
)