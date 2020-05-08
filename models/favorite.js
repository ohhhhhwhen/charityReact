

const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    charityName: { type: String, required: true },
});

const Favorite = mongoose.model(`Favorite`, favoriteSchema);

module.exports = Favorite;
