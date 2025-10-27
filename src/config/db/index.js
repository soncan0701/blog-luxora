// Code mới, an toàn
const MONGODB_URI = process.env.MONGODB_URI;

async function connect() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connect to MongoDB Atlas successfully!');
    } catch (error) {
        console.log('Connect to MongoDB Atlas failure!', error);
    }
}