import User from '../models/user.js';
import Session from '../models/session.js'
import { randomString, saltPassword  } from '../../util/encryptor.js'
import {v4 as uuidv4} from 'uuid';

const login = (username,password) => {
    return new Promise((resolve,reject)=>{
        User.findOne({username},(err,result)=>{
            if(err){
                console.log(err);
                resolve({success: false,message:'Database error!'});
            }
            if(result){
                if(result.password==saltPassword(password,result.salt)){
                    // Correct login details, create a session
                    let session = uuidv4(); // uuidv4 session ids
                    Session.findOne({session},async (err,result2)=>{
                        if(err || result2){
                            resolve({success: false,message:'Database error!'})
                        }else{
                            let expiry = new Date(Date.now()+60*60*1000);
                            await Session.create({session, username,expiry});
                            resolve({success: true, message: "Login successful!",session})
                        }
                    })
                }else{
                   resolve({success: false,message: 'Invalid Password!'});
                }
            }else{
                resolve({success: false,message:'Username does not exist!'});
            }
        })
    })
};

const register =(username,password) => { 
    return new Promise((resolve,reject)=>{
        User.findOne({username},(err,result)=> {
            if(err){
                console.log(err);
                resolve({success: false,message: 'Database error!'})
            }
            if(result){
                resolve({success: false,message: 'Username already exists!'})
            }else{
                let salt = randomString(32);
                let saltedPassword = saltPassword(password,salt);
                User.create({username,password: saltedPassword,salt, joined: new Date()},(err,result)=>{
                    if(err){
                        console.log(err);
                        resolve({success: false, message:"Database error!"});
                    }else{
                        resolve({success: true, message: "Account registered successfully!"})
                    }
                })
            }
        })
    });
}

export { login, register }