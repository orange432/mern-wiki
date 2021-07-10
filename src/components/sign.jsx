import React,{ useState } from 'react'

const Sign = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [verifyPassword,setVerifyPassword] = useState('');
    const [message,setMessage] = useState('');
    const [registerTab,setRegisterTab] = useState(false);

    const login = () => {
        fetch('/api/login',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username,password})
        })
        .then(response=>response.json())
        .then(data=>{
            setMessage(data.message);
            setTimeout(()=>setMessage(''),4000);
            if(data.success){
                localStorage.setItem('session',data.session);
                window.location.href="/dashboard";
            }
        })
    }
    
    const signUp = () => {
        if (password!==verifyPassword){
            setMessage("Make sure both passwords match!");
            setTimeout(()=>setMessage(''),4000);
            return;
        }
        fetch('/api/register',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username,password})
        })
        .then(response=>response.json())
        .then(data=>{
            
            setMessage(data.message);
            setTimeout(()=>setMessage(''),4000);
            if(data.success){
                setRegisterTab(false);
            }
        })
    }

    if(registerTab){
        return (
            <div className="sign">
                <div className="sign__tabs">
                    <div className="sign__tab" onClick={e=>setRegisterTab(false)}>Sign In</div>
                    <div className="sign__tab active">Register</div>
                </div>
                <h2 className="has-text-centered">Register</h2>
                <p className="has-text-centered">{message}</p>
                <form onSubmit={e=>{e.preventDefault()}}>
                    <label className="label">Username</label>
                    <input className="input" type="text" onChange={e=>setUsername(e.target.value)}/>
                    <label className="label">Password</label>
                    <input className="input" type="password" onChange={e=>setPassword(e.target.value)}/>
                    <label className="label">Verify Password</label>
                    <input className="input" type="password" onChange={e=>setVerifyPassword(e.target.value)} />
                    <div className="sign__bottom">
                        <button className="button" type="button" onClick={signUp}>Register</button>
                    </div>
                </form>
            </div>
        )
    }
    return (
        <div className="sign">
            <div className="sign__tabs">
                <div className="sign__tab active">Sign In</div>
                <div className="sign__tab" onClick={e=>setRegisterTab(true)}>Register</div>
            </div>
            <h2 className="has-text-centered">Sign In</h2>
            <p className="has-text-centered">{message}</p>
            <form onSubmit={e=>{e.preventDefault()}}>
                <label className="label">Username</label>
                <input className="input" type="text" onChange={e=>setUsername(e.target.value)}/>
                <label className="label">Password</label>
                <input className="input" type="password" onChange={e=>setPassword(e.target.value)}/>
                <div className="sign__bottom">
                    <button className="button" type="button" onClick={login}>Login</button>
                </div>
                
            </form>
        </div>
    )
}

export default Sign
