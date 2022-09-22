const { Router } = require('express');
var express = require('express')
var router = express.Router();
var songs = require('../controllers/songs')
const { check } = require('express-validator')

router.post('/createSong', (req, res) => {
    songs.createSong(req, res)
})

router.get('/songsList',
    function (req, res) {

        songs.songsList(req, res)
    })
module.exports = router;