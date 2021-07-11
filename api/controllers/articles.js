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
        Article.findOne({slug},async (err,result)=>{
            if(err){
                resolve({success: false, message: "Something went wrong, please try again."});
            }
            if(result){
                // Article already exists
                await Article.findOneAndUpdate({slug},{title,content,lastEditor: author, updatedAt: new Date()})
                resolve({success: true, message: "Article successfully updated!"});
            }else{
                Article.create({slug,title,content,author, lastEditor: author},(err2,result2)=>{
                    if(err2){
                        resolve({success: false, message: "Database error! Please try again."});
                    }else{
                        resolve({success: true, message: "Article created successfully!"})
                    }
                });
            }
        })
    })
}


export { listArticles, getArticle, addArticle }