import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    salt: String,
    joined: String
})

const User = mongoose.model('User', userSchema);

export default User;