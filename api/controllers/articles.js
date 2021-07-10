import Article from '../models/article.js';

const listArticles = () => {
    return new Promise((resolve,reject)=>{
        Article.find({},(err,result)=>{
            resolve(result);
        })
    })
}

const getArticle = (slug)=>{
    return new Promise((resolve,reject)=>{
        Article.findOne({slug},(err,result)=>{
            if(err){
                return resolve({success: false, message: "Database Error!"})
            }
            if(!result){
                return resolve({sucess: false, message: "Article doesn't exist!", status : 404});
            }
            resolve({success: true, article: result});
        })
    })
}

const addArticle = (slug,title,content, author) => {
    return new Promise((resolve,reject)=>{
        Article.findOne({slug},(err,result)=>{
            if(result){
                // Article already exists
                resolve({success: false, message: "Article already exists!"})
            }else{
                Article.create({slug,title,content,author, lastEditor: author},(err,result2)=>{
                    if(err){
                        resolve({success: false, message: "Database error! Please try again."});
                    }else{
                        resolve({success: true, message: "Article created successfully!"})
                    }
                });
            }
        })
    })
}

const editArticle = async (slug,title,content,author) => {
    try{
        await Article.findOneAndUpdate({slug},{title,content,lastEditor: author, updatedAt: new Date()})
        return {success: false, message: "Article successfully updated!"};
    }catch(err){
        return {success: false, message: "Database error! Please try again."}
    }
}

export { listArticles, getArticle, addArticle, editArticle }