import { createHash } from "crypto";
/* Generates a random string with the given length */
const randomString = (length) => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOQRSTUVWXYZ0123456789".split('');
    let out = '';
    for(let i=0;i<length;i++){
        out+=chars[Math.floor(Math.random()*(chars.length-1))];
    }
    return out;
}

/* Salts a password */
const saltPassword = (password,salt)=>{
    return createHash('sha256').update(`${salt}${password}`).digest('base64');
}

export { randomString, saltPassword }