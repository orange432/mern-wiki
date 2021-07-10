import mongoose from 'mongoose';

const sessionSchema = mongoose.Schema({
    session: {type: String,unique: true},
    username: String,
    expiry: Date,
})

const Session = mongoose.model('Session', sessionSchema);

export default Session;