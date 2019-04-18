const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

//
// Comments
//

const users = require("./users.js");
const User = users.model;

const photos = require("./photos.js");
const Photo = photos.model;

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    photo: {
        type: mongoose.Schema.ObjectId,
        ref: 'Photo'
    },
    text: String
});

const Comment = mongoose.model('Comment', commentSchema);

router.get('/', async (req, res) => {

    try {
        let comments = await Comment.find().populate('user');

        console.log(comments)
        return res.send(comments);
    } catch (error) {
        return res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {

    const comment = new Comment({
        user: req.body.user._id,
        photo: req.body.photo._id,
        text: req.body.text
    });
    try {
        await comment.save();
        return res.send(comment);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Comment.deleteOne({
            _id: req.params.id
        });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    model: Comment,
    routes: router,
}
