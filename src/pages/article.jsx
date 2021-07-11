import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';

const Article = () => {
    let { slug } = useParams()
    const [loading,setLoading] = useState(true);
    const [article,setArticle] = useState({});
    const [username,setUsername] = useState('');

    const loadArticle = () => {
        fetch('/api/articles/'+slug)
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            setLoading(false);
            if(data.success){
                setArticle(data.article)
            }else{
                setArticle({title: 'Error!',content: data.message});
            }
            
        })
    }

    const authorize = () => {
        fetch('/api/authorize',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({session: localStorage.getItem('session')})
        })
        .then(response=>response.json())
        .then(data=>{
            if(data.success){
                setUsername(data.username);
            }
        })
    }


    useEffect(()=>{
        loadArticle();
        authorize();
    },[])

    if(loading){
        return (
            <div className="has-text-centered title">Loading</div>
        )
    }

    return (
        <div className="container">
            <h1 className="has-text-centered title">{article.title}</h1>
            <p>Author: {article.author} - {article.updatedAt}</p>
            <p>{article.content}</p>
        </div>
    )
}

export default Article
