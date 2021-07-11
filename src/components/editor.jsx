import React,{useState} from 'react'

const Editor = () => {
    const [slug,setSlug] = useState('');
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [message,setMessage] = useState('');
    const [loading,setLoading] = useState(true);
    const [username,setUsername] = useState('');

    const checkArticle = () => {
        if(!slug || !title || !content){
            setMessage('Make sure all fields are filled out!')
            setTimeout(()=>setMessage(''),4000);
        }
        fetch('/api/articles/'+slug)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.success){
                // Article exists, prompt!
                let conf = confirm('Article already exists.  Overwrite?');
                if(conf){
                    saveArticle();
                }
            }else{
                // Article doesn't exist!
                saveArticle();
            }
        })
    }

    const loadArticle = () => {
        fetch('/api/articles/'+slug)
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                setSlug(data.slug);
                setTitle(data.title);
                setContent(data.content);
            }else{
                setMessage('Article with that slug does not exist!')
                setTimeout(()=>setMessage(''),4000);
            }
        })
    }

    const saveArticle = () => {
        fetch('/api/articles',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({slug,title,content,session: localStorage.getItem('session')})
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.success){
                window.location.href = "/articles/"+slug;
            }else{
                setMessage('Something went wrong. Please try again.')
                setTimeout(()=>setMessage(''),4000);
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
        <div className="editor">
            <div className="container">
                <div className="columns">
                    <div className="column">
                        <h2>Editor</h2>
                        <p>{message}</p>
                        <label className="label">Slug</label>
                        <input className="input" type="text" value={slug} onChange={e=>setSlug(e.target.value)}/>
                        <label className="label">Title</label>
                        <input className="input" type="text" value={title} onChange={e=>setTitle(e.target.value)}/>
                        <label className="label">Content</label>
                        <textarea className="textarea" value={content} onChange={e=>setContent(e.target.value)}></textarea>
                        <button onClick={checkArticle} className="button">Save Article</button><button onClick={loadArticle} className="button">Load Article*</button>
                        <p>*Make sure the slug is entered before loading.</p>
                    </div>
                    <div className="column">
                        <h2>Preview</h2>
                        <h1 className="has-text-centered title">{title}</h1>
                        <p>Author: {username} - {(new Date()).toString()}</p>
                        <p>{content}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Editor
