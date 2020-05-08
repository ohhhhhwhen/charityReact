/* eslint-disable max-len */
const mongoose = require(`mongoose`);
const db = require(`../models`);

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/reactreadinglist`, {
    useNewUrlParser: true
});

const favoriteSeed = [
    {
        charityName: `Donationally Fund`
    }
];

db.Favorite.remove({})
    .then(() => db.Favorite.collection.insertMany(favoriteSeed))
    .then(data => {
        console.log(`${data.result.n } records inserted!`);
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
