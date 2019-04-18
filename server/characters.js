const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");


const users = require("./users.js");
const User = users.model;

const characterSchema = new mongoose.Schema({
    name: String,
    type: String,
    class: String,
    ac: String,
    maxhp: String,
    hp: String,
    initiative: String,
    sidequest: String,
    condition: String,
    comments: String,
    race: String,
    strength: String,
    dexterity: String,
    constitution: String,
    intelligence: String,
    wisdom: String,
    charisma: String,
    strength_modifier: String,
    dexterity_modifier: String,
    constitution_modifier: String,
    intelligence_modifier: String,
    wisdom_modifier: String,
    charisma_modifier: String,
    battle: String,
    level: String,
    profbonus: String,
});

const Character = mongoose.model('Character', characterSchema);

// ***** API ***** //

// upload photo
router.post("/", auth.verifyToken, User.verify, async (req, res) => {
    // check parameters

    const character = new Character({
        name: req.body.name,
        type: req.body.type,
        class: req.body.class,
        ac: req.body.ac,
        maxhp: req.body.maxhp,
        hp: req.body.hp,
        initiative: req.body.initiative,
        sidequest: req.body.sidequest,
        condition: req.body.condition,
        comments: req.body.comments,
        race: req.body.race,
        strength: req.body.strength,
        dexterity: req.body.dexterity,
        constitution: req.body.constitution,
        intelligence: req.body.intelligence,
        wisdom: req.body.wisdom,
        charisma: req.body.charisma,
        strength_modifier: req.body.strength_modifier,
        dexterity_modifier: req.body.dexterity_modifier,
        constitution_modifier: req.body.constitution_modifier,
        intelligence_modifier: req.body.intelligence_modifier,
        wisdom_modifier: req.body.wisdom_modifier,
        charisma_modifier: req.body.charisma_modifier,
        battle: req.body.battle,
        level: req.body.level,
        profbonus: req.body.profbonus,
    });
    try {
        await character.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get my photos
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
    // return photos
    try {
        let characters = await Character.find({
            user: req.user
        }).sort({
            created: -1
        });
        return res.send(photos);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get all photos
router.get("/all", async (req, res) => {
    try {
        let characters = await Character.find().sort({
            created: -1
        }).populate('user');
        return res.send(characters);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});


router.put("/:id", async (req, res) => {
    console.log("put character");
    try {
        id = req.params.id;
        console.log(id);
        let character = await Character.findById(id, (err, thing) => {});
        return res.send(character);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.delete("/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    Character.deleteOne({id: id} , function (err) {
        if (err) return handleError(err);
    });
});

module.exports = {
    model: Character,
    routes: router,
}
