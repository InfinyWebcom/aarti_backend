var mongoose = require("mongoose")

const songsSchema = mongoose.Schema({
    name: String,
    image: String,
    type: {
        type:String,
        enum:['aarti','stotr']
    },
    lyrics: String,
    category_id: {
        type: mongoose.SchemaTypes.ObjectId,

        ref: 'category'
    }
})

const songs = mongoose.model("songs", songsSchema)

module.exports = songs