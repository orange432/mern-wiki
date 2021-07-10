import express from 'express';
import {login, register} from './controllers/users.js';
import { authorizeSession } from './controllers/sessions.js';
import { listArticles,addArticle,editArticle,getArticle } from './controllers/articles.js';

const router = express.Router();

router.use('/login',async (req,res,next)=>{
    let result = await login(req.body.username,req.body.password);
    res.json(result);
})

router.use('/register',async (req,res,next)=>{
    let result = await register(req.body.username,req.body.password);
    res.json(result);
})

router.use('/authorize',async (req,res)=>{
    let result = await authorizeSession(req.body.session);
    res.json(result);
})

router.get('/articles',async (req,res)=>{
    let result = await listArticles();
    res.json(result);
})

router.post('/articles', async (req,res)=>{
    let sessionData = await authorizeSession(req.body.session);
    if(sessionData.success){
        let result = await addArticle(req.body.slug,req.body.title,req.body.content,sessionData.username);
        res.json({result})
    }else{
        res.json({success: false, message: "Please log in."})
    }
})

router.get('/articles/:slug', async(req,res)=>{
    let result = await getArticle(req.params.slug);
    return result;
})

export default router;