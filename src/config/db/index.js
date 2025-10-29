const mongoose = require('mongoose');

// Biến này sẽ được .env (local) hoặc Render (production) cung cấp
const MONGODB_URI = process.env.MONGODB_URI; 

async function connect() {
    try {
        await mongoose.connect(MONGODB_URI);
        // Log này sẽ cho bạn biết nó kết nối vào đâu
        console.log('Connect to MongoDB successfully!'); 
    } catch (error) {
        console.log('Connect to MongoDB failure!', error);
    }
}

module.exports = { connect };