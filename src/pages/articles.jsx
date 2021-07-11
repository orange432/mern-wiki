import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

const Articles = () => {
    const [loading,setLoading] = useState(true);
    const [articles,setArticles] = useState([]);

    const loadArticles = () => {
        fetch('/api/articles')
        .then(response=>response.json())
        .then(data=>{
            setLoading(false);
            setArticles(data)
        })
    }


    useEffect(()=>{
        loadArticles()
    },[])

    if(loading){
        return (
            <div className="has-text-centered title">Loading</div>
        )
    }

    return (
        <div className="container">
            <h1 className="has-text-centered title">Articles</h1>
            <ul>
                {articles.map(article=>(
                    <li key={article.slug}><Link to={`/articles/${articles.slug}`}>{article.title}</Link></li>
                ))}
            </ul>
        </div>
    )
}

export default Articles
