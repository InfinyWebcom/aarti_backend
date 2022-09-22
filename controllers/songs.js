var express = require('express')
var songsModel = require('../model/songs')
var async = require('async')
const await = require('await')
const { validationResult } = require('express-validator')
const mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;

const createSong = async (req, res) => {
    try {
        const { type, name, image, lyrics, category_id } = req.body;
        const result = validationResult(req);
        if (result.errors.length > 0) {
            return res.status(200).json(
                {
                    error: true,
                    title: result.erros[0].msg,
                    errors: result,
                });
        }
        var songName = await songsModel.findOne({ name: name })
        if (songName) {
            return res.status(200).json({
                title: "song already exists!",
                error: true
            })
        }


        var newSong = { type, name, image, lyrics, category_id }
        var data = await songsModel.create(newSong)
        res.status(200).json({
            titlt: "Song added successfully",
            error: false
        })

    }
    catch (error) {
        console.log(error)
    }
}

function error_response(res, data) {
    res.status(400).json({
        title: `${data}`,
        error: true,
    })
}

const songsList = async (req, res) => {

    const { category_id, searchText } = req.query
    try {
        // request query for searchText
        if ((searchText != "" && searchText != undefined)) {
            var song_List = await songsModel.find(
                { "name": { $regex: searchText, $options: 'i' } }
            )
        }
        // request query for objectID
        if ((category_id != "" && category_id != undefined)) {
            var song_List = await songsModel.find({ category_id: ObjectId(category_id) })
        }
        payload = {
            title: "Aarti have been listed successfully.",
            song_List
        }


        payload.title = song_List.length > 0 ? "Aarti have been listed successfully." : "Something went wrong!"
        payload.error = song_List.length > 0 ? false : true
        res.status(200).json(payload)
    }
    catch (error) {
        error_response(res, error)
    }
}
module.exports = {
    createSong,
    songsList
}