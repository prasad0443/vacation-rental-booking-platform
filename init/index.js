const mongoose = require('mongoose');
const Listing = require('../models/listing.js')
const initData = require('./data.js');

const MONGO_URL = "mongodb://localhost:27017/wanderlust";

main()
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
};

const initDB = async () => {
    await Listing.deleteMany({});

    initData.data = initData.data.map((listing) => {
        return {
            ...listing,
            image: listing.image,
            owner: '6ac78eab82b8cbe1e1b5fbc2',
        };
    });

    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();