try {

    const { category_id, searchText } = req.query
    const result = validationResult(req);

    if (result.errors.length > 0) {
        return res.status(200).json({
            error: true,
            title: result.errors[0].msg,
            errors: result,
        });
    }
    if (searchText != "" && searchText != undefined) {
        var song_List = await songsModel.find({
            $or: [
                { "name": { $regex: searchText, $options: 'i' } },

            ]
        })
        res.status(200).json({
            title: "songs have been listed successfully.",
            error: false,
            song_List
        })
    }
    if (category_id == "") {
        res.status(200).json({
            title: "Category id can not be empty",
            error: true
        })
    }
    var song_category = await songsModel.findOne({ category_id: ObjectId(category_id) })
    var songCategory = await songsModel.find({ category_id: ObjectId(category_id) })
    var songList = await songsModel.find({})

    console.log(songList, "songList")
    console.log(song_category, "song_category")
    if (!song_category) {
        res.status(200).json({
            title: "Category is not valid",
            error: true
        })
    }

    else {
        res.status(200).json({
            title: "  Songs listed successfully.",
            error: false,
            songCategory
        })
    }
}
catch (error) {
    console.log(error)
}