import Session from '../models/session.js';

const authorizeSession = (session) => {
    return new Promise((resolve,reject)=>{
        Session.findOne({session},(err,result)=>{
            if(err || !result){
                resolve({success: false});
            }
            if(result.expiry < Date.now()){
                resolve({success: false});
            }else{
                resolve({success: true, username: result.username});
            }
        })
    })
}

export {authorizeSession}