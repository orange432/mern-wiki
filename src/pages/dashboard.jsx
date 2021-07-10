import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [loading,setLoading] = useState(true);
    const [username,setUsername] = useState('');

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
                setLoading(false);
            }else{
                window.location.href="/"
            }
        })
    }

    useEffect(()=>{
        authorize();
    },[])

    if(loading){
        return (
            <div className="has-text-centered title">Loading</div>
        )
    }

    return (
        <div className="container">
            <h1 className="has-text-centered title">Dashboard</h1>
            <p className="has-text-centered subtitle">Hello {username}</p>
            <Link to="/editor">Create Articles</Link>
            <Link to="/articles">View Articles</Link>

        </div>
    )
}

export default Dashboard
