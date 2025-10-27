const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://sonthaingocnguyen1902_db_user:dEdALgYwBYdqPQzH@cluster0.lyg567q.mongodb.net/?appName=Cluster0');
        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect fail');
    }
}
module.exports = { connect };
