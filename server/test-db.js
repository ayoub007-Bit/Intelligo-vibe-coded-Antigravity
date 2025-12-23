require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
console.log('Attempting to connect to MongoDB...');
console.log('URI:', uri.replace(/:([^:@]+)@/, ':****@')); // Hide password in logs

mongoose.connect(uri)
    .then(() => {
        console.log('✅ MongoDB Connected Successfully!');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ MongoDB Connection Error:');
        console.error(err.message);

        if (err.name === 'MongooseServerSelectionError') {
            console.log('\n💡 SUGGESTION: This is likely an IP Whitelist issue.');
            console.log('1. Go to MongoDB Atlas Dashboard.');
            console.log('2. Click on "Network Access" in the sidebar.');
            console.log('3. Click "Add IP Address".');
            console.log('4. Select "Add Current IP Address" and confirm.');
        }

        process.exit(1);
    });
