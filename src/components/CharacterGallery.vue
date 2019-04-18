<template>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <link href="https://fonts.googleapis.com/css?family=Arvo" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-social/5.1.1/bootstrap-social.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-social/5.1.1/bootstrap-social.css">

    <title>Dungeon Master's Tool</title>
</head>

<body>

    <nav class="navbar navbar-info navbar-fixed">
        <li class="alpha" href="#">
            <img src="./dnd_logo.jpg" alt="dnd_logo" class="d-inline-block align-center pull-left mr-md-2" height="50em">
            Dungeon Master's Tool
        </li>
        <h1 class="pull-left"></h1>
    </nav>

    <div id="app">

        <br>
        <ol>
            <!--Add New Character-->
            <li class="col-sm-12">
                <h3>Add New Character</h3>
                <form @submit.prevent="addItem">
                    <div class="form-inline">
                        <input class="form-control form-control-sm form-inline mr-md-2" type="" v-model="addedName" placeholder="Name">
                        <select v-model="addedRace" class="form-control form-control-sm form-inline mr-md-2">
                            <option>Race</option>
                            <option>Dragonborn</option>
                            <option>Dwarf</option>
                            <option>Elf</option>
                            <option>Gnome</option>
                            <option>Half-Elf</option>
                            <option>Halfling</option>
                            <option>Half-Orc</option>
                            <option>Human</option>
                            <option>Tiefling</option>
                            <option>Homebrew</option>
                            <option>Other</option>
                        </select>
                        <select v-model="addedClass" class="form-control form-control-sm form-inline mr-md-2">
                            <option>Class</option>
                            <option>Barbarian</option>
                            <option>Bard</option>
                            <option>Cleric</option>
                            <option>Druid</option>
                            <option>Fighter</option>
                            <option>Monk</option>
                            <option>Paladin</option>
                            <option>Ranger</option>
                            <option>Rogue</option>
                            <option>Sorcerer</option>
                            <option>Warlock</option>
                            <option>Wizard</option>
                            <option>Homebrew</option>
                            <option>Other</option>
                        </select>
                        <select v-model="addedType" class="form-control form-control-sm form-inline mr-md-2">
                            <option>Type</option>
                            <option>Player</option>
                            <option>Party NPC</option>
                            <option>Non-Party NPC</option>
                            <option>Enemy</option>
                            <option>Other</option>
                        </select>
                        <input class="form-control form-control-sm form-inline mr-md-2" type="text" v-model="addedLevel" placeholder="Level">
                        <input class="form-control form-control-sm form-inline mr-md-2" type="text" v-model="addedMaxHP" placeholder="Max Hit Points">
                        <button class="btn btn-sm btn-outline-info my-2 my-sm-0" type="submit">Add</button>
                    </div>
                </form>
            </li>

            <!--Show and Sort Buttons-->
            <li class="controls row">
                <div class="col-4">
                    <h3>Show:</h3>
                    <button class="btn btn-sm btn-outline-info my-sm-0" v-on:click="showAll">All</button>
                    <button class="btn btn-sm btn-outline-info my-sm-0" v-on:click="showPlayers">Players</button>
                    <button class="btn btn-sm btn-outline-info my-sm-0" v-on:click="showNPCs">NPCs</button>
                    <button class="btn btn-sm btn-outline-info my-sm-0" v-on:click="showParty">Party</button>
                    <button class="btn btn-sm btn-outline-info my-sm-0" v-on:click="showEnemies">Enemies</button>
                    <button class="btn btn-sm btn-outline-info my-sm-0" v-on:click="showOther">Other</button>
                    <button class="btn btn-sm btn-outline-info my-sm-0" v-on:click="showSideQuest">SideQuest</button>
                </div>
                <div class="col-3">
                    <h3>Sort By:</h3>
                    <button class="btn btn-sm btn-outline-info my-sm-0" v-on:click="sortName">Name</button>
                    <button class="btn btn-sm btn-outline-info my-sm-0" v-on:click="sortInitiative">Initiative</button>
                    <button class="btn btn-sm btn-outline-info my-sm-0" v-on:click="sortLevel">Level</button>
                    <button class="btn btn-sm btn-outline-info my-sm-0" v-on:click="sortType">Type</button>
                </div>
                <div class="col-1">
                    <h3>Battles:</h3>
                    <select v-model="showBattle" class="custom-select custom-select-sm" data-style="btn-info">
                        <option>By Battle</option>
                        <option>Battle 1</option>
                        <option>Battle 2</option>
                        <option>Battle 3</option>
                        <option>Battle 4</option>
                        <option>Battle 5</option>
                    </select>
                </div>

            </li>

            <br>
            <li>
                <ul>
                    <li class="lista" v-for="item in filteredItems">
                        <br>
                        <div class="row listo bg-info">
                            <div class="col-sm-11">
                                <div class="row form-inline">

                                    <!--Name and SideQuest Button-->
                                    <div class="col-3">
                                        <p class="showname">{{ item.name }}</p>
                                        <div class="form-inline">
                                            Level: &nbsp <strong>{{item.level}}</strong>
                                            &nbsp&nbsp&nbsp
                                            <div class="btn-group" role="group" aria-label="Basic example">
                                                <button v-on:click="decrementLevel(item)" class="btn btn-outline-light">-</button>
                                                <button v-on:click="incrementLevel(item)" class="btn btn-outline-light">+</button>
                                            </div>
                                        </div>
                                        <br>
                                        <label class="container1">
                                            <input type="checkbox" v-model="item.sidequest" @click="marksidequest(item)" />
                                            <span class="checkmark"></span>
                                        </label> &nbsp &nbsp &nbsp &nbsp SideQuest
                                    </div>

                                    <!--Initiative, HP, and AC-->
                                    <div class="col-2">
                                        <div class="bb"></div>
                                        Initiative: &nbsp
                                        <input class="form-control aa form-inline form-control-info bg-info col-sm-3" type="text" v-on:keyup.enter="editItem(item)" v-model="item.initiative"></input><br>
                                        <div class="bb"></div>
                                        HP: &nbsp
                                        <input class="form-control aa form-inline form-control-info bg-info col-sm-3 pl-2" type="text" v-on:keyup.enter="editItem(item)" v-model="item.hp"></input>
                                        <strong>&nbsp/&nbsp</strong>
                                        <input class="form-control aa form-inline form-control-info bg-info col-sm-3 pl-2" type="text" v-on:keyup.enter="editItem(item)" v-model="item.maxhp" placeholder="max"></input>
                                        <br>
                                        <div class="bb"></div>
                                        AC: &nbsp
                                        <input class="form-control aa form-inline form-control-info bg-info col-sm-3" type="text" v-on:keyup.enter="editItem(item)" v-model="item.ac"></input><br>
                                    </div>

                                    <!--Class, Type, and Race-->
                                    <div class="col-2">
                                        Type: &nbsp<strong>{{item.type}}</strong>
                                        <div class="bb"></div>
                                        Class: &nbsp<strong>{{item.class}}</strong><br>
                                        <div class="bb"></div>
                                        Race: &nbsp<strong>{{item.race}}</strong>
                                        <div class="bb"></div>
                                        Prof. Bonus: &nbsp<strong>{{item.profbonus}}</strong>
                                    </div>

                                    <!--Condition and Battle Selectors-->
                                    <div class="col">
                                        <div class="row">
                                            <div class="col-6">
                                                Condition:<br>
                                                <select v-model="item.condition" @change="editItem(item)" class="form-control bg-info form-control-md aa mr-md-2">
                                                    <option>Normal</option>
                                                    <option>Blinded</option>
                                                    <option>Charmed</option>
                                                    <option>Deafened</option>
                                                    <option>Exhaustion</option>
                                                    <option>Fatigued</option>
                                                    <option>Frightened</option>
                                                    <option>Grappled</option>
                                                    <option>Incapacitated</option>
                                                    <option>Invisible</option>
                                                    <option>Petrified</option>
                                                    <option>Paralyzed</option>
                                                    <option>Poisoned</option>
                                                    <option>Prone</option>
                                                    <option>Restrained</option>
                                                    <option>Stunned</option>
                                                    <option>Unconscious</option>
                                                </select>
                                                <div class="bb">

                                                </div>
                                                Battle: &nbsp
                                                <br>
                                                <select v-model="item.battle" @change="editItem(item)" class="form-control bg-info form-control-md aa mr-md-2">
                                                    <option>All Battles</option>
                                                    <option>No Battles</option>
                                                    <option>Battle 1</option>
                                                    <option>Battle 2</option>
                                                    <option>Battle 3</option>
                                                    <option>Battle 4</option>
                                                    <option>Battle 5</option>
                                                </select>

                                            </div>
                                            <div class="col-6">
                                                Comments:<br>
                                                <textarea class="form-control aa form-control bg-info" v-model="item.comments" rows="4" style="color:white;"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <div v-show="item.type != 'Player'">

                                    <hr>
                                    <div class="row form-inline">

                                        <div class="col-2">
                                            STR: &nbsp
                                            <input class="form-control aa form-inline form-control-info bg-info col-sm-3" type="text" v-on:keyup.enter="editItem(item)" v-model="item.strength"></input><br>
                                            (<strong>{{ item.strength_modifier }}</strong>)
                                        </div>

                                        <div class="col-2">
                                            DEX: &nbsp
                                            <input class="form-control aa form-inline form-control-info bg-info col-sm-3" type="text" v-on:keyup.enter="editItem(item)" v-model="item.dexterity"></input><br>
                                            (<strong>{{ item.dexterity_modifier }}</strong>)
                                        </div>

                                        <div class="col-2">
                                            CON: &nbsp
                                            <input class="form-control aa form-inline form-control-info bg-info col-sm-3" type="text" v-on:keyup.enter="editItem(item)" v-model="item.constitution"></input><br>
                                            (<strong>{{ item.constitution_modifier }}</strong>)
                                        </div>

                                        <div class="col-2">
                                            INT: &nbsp
                                            <input class="form-control aa form-inline form-control-info bg-info col-sm-3" type="text" v-on:keyup.enter="editItem(item)" v-model="item.intelligence"></input><br>
                                            (<strong>{{ item.intelligence_modifier }}</strong>)
                                        </div>

                                        <div class="col-2">
                                            WIS: &nbsp
                                            <input class="form-control aa form-inline form-control-info bg-info col-sm-3" type="text" v-on:keyup.enter="editItem(item)" v-model="item.wisdom"></input><br>
                                            (<strong>{{ item.wisdom_modifier }}</strong>)
                                        </div>

                                        <div class="col-2">
                                            CHA: &nbsp
                                            <input class="form-control aa form-inline form-control-info bg-info col-sm-3" type="text" v-on:keyup.enter="editItem(item)" v-model="item.charisma"></input><br>
                                            (<strong>{{ item.charisma_modifier }}</strong>)
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <!--Save and Delete Buttons-->
                            <div class="col-1 float-right">
                                <form @submit.prevent="editItem(item)">
                                    <button class="btn btn-outline-light delete" type="submit">Save</button>
                                </form>
                                <br><br>
                                <button class="btn btn-outline-light delete" v-on:click="deleteItem(item)">Delete</button>
                                <br><br>
                                <button class="btn btn-outline-light delete" v-on:click="duplicateItem(item)">Duplicate</button>
                            </div>

                        </div>
                    </li>
                </ul>
            </li>
        </ol>

    </div>

    <div style="padding:8em;">

    </div>
    <!-- Footer -->
    <footer class="page-footer font-small pt-5">

        <!-- Footer Elements -->
        <div class="container-fluid">

            <!-- Social buttons -->
            <ul class="list-unstyled list-inline text-center">
                <li class="list-inline-item">
                    <a href="https://www.facebook.com/profile.php?id=100000072781672">
                        <button type="button" class="btn btn-lg btn-facebook waves-effect waves-light" style="border-radius: 50%;"><i class="pr-1"></i>
                            <i class="fa fa-1x  pr-0 fa-facebook"></i>
                        </button>
                    </a>
                </li>
                <li class="list-inline-item">
                    <a href="https://www.instagram.com/nottaylordall/">
                        <button type="button" class="btn btn-lg btn-instagram waves-effect waves-light" style="border-radius: 50%;"><i class="fa fa-1x fa-instagram"></i>
                        </button>
                    </a>
                </li>
                <li class="list-inline-item">
                    <a href="https://github.com/jtaylordall/DM-tool">
                        <button type="button" class="btn btn-lg btn-github waves-effect waves-light" style="border-radius: 50%;"><i class="fa fa-1x fa-github"></i>
                        </button>
                    </a>
                </li>
            </ul>
            <!-- Social buttons -->

        </div>
        <!-- Footer Elements -->

        <!-- Copyright -->
        <div class="footer-copyright text-center py-3">© 2018 Copyright:
            <a href="https://mdbootstrap.com/education/bootstrap/"> MDBootstrap.com</a>
        </div>
        <!-- Copyright -->

    </footer>

</body>

</html>
</template>



<script>
import moment from 'moment';

export default {
    name: 'CharacterGallery',
    props: {
        characters: Array
    },
    data() {
        return {
            items: [],
            addedName: '',
            addedRace: 'Race',
            addedMaxHP: '',
            addedClass: 'Class',
            addedType: 'Type',
            addedLevel: '',
            show: 'all',
            displaymessage: '',
            showBattle: 'By Battle',
        }
    },
    async created() {
        this.getItems();
    },

    computed: {
        filteredItems() {
            console.log("FILTEREDITEMS");
            console.log(this.items)
            if (this.show === 'players')
                return this.items.filter(item => {
                    return item.type == 'Player';
                });
            if (this.show === 'npcs')
                return this.items.filter(item => {
                    return item.type == 'Party NPC' || item.type == 'Non-Party NPC';
                });
            if (this.show === 'enemies')
                return this.items.filter(item => {
                    return item.type == 'Enemy';
                });
            if (this.show === 'other')
                return this.items.filter(item => {
                    return item.type == 'Other';
                });
            if (this.show === 'party')
                return this.items.filter(item => {
                    return item.type == 'Party NPC' || item.type == 'Player';
                });
            if (this.show === 'sidequest')
                return this.items.filter(item => {
                    return item.sidequest;
                });
            if (this.showBattle === 'Battle 1')
                return this.items.filter(item => {
                    return item.battle === "Battle 1" || item.battle === "All Battles";
                });
            if (this.showBattle === 'Battle 2')
                return this.items.filter(item => {
                    return item.battle === "Battle 2" || item.battle === "All Battles";
                });
            if (this.showBattle === 'Battle 3')
                return this.items.filter(item => {
                    return item.battle === "Battle 3" || item.battle === "All Battles";
                });
            if (this.showBattle === 'Battle 4')
                return this.items.filter(item => {
                    return item.battle === "Battle 4" || item.battle === "All Battles";
                });
            if (this.showBattle === 'Battle 5')
                return this.items.filter(item => {
                    return item.battle === "Battle 5" || item.battle === "All Battles";
                });

            return this.items;
        },
    },

    methods: {
        async addItem() {
            if (this.addedMaxHP === '') {
                this.addedMaxHP = 1;
            }
            if (this.addedAC === '') {
                this.addedAC = 0;
            }
            if (this.addedName === '') {
                this.addedName = "Character";
            }
            if (this.addedType === 'Type') {
                this.addedType = "Other";
            }
            if (this.addedClass === 'Class') {
                this.addedClass = "Other";
            }
            if (this.addedRace === 'Race') {
                this.addedRace = "Other";
            }
            if (this.addedLevel === '') {
                this.addedLevel = 1;
            } else if (this.addedLevel > 20) {
                this.addedLevel = 20;
            } else if (this.addedLevel <= 0) {
                this.addedLevel = 1;
            }
            let profbonus = this.calculateProfBonus(this.addedLevel);
            try {
                const response = await this.$store.dispatch("uploadCharacter", {
                    name: this.addedName,
                    type: this.addedType,
                    class: this.addedClass,
                    ac: 0,
                    maxhp: this.addedMaxHP,
                    hp: this.addedMaxHP,
                    initiative: 0,
                    sidequest: false,
                    condition: 'Normal',
                    comments: '',
                    race: this.addedRace,
                    strength: 0,
                    dexterity: 0,
                    constitution: 0,
                    intelligence: 0,
                    wisdom: 0,
                    charisma: 0,
                    strength_modifier: '--',
                    dexterity_modifier: '--',
                    constitution_modifier: '--',
                    intelligence_modifier: '--',
                    wisdom_modifier: '--',
                    charisma_modifier: '--',
                    battle: 'All Battles',
                    level: Number(this.addedLevel),
                    profbonus: profbonus,
                });
                this.addedName = '';
                this.addedType = "Type";
                this.addedClass = "Class";
                this.addedMaxHP = '';
                this.addedRace = "Race";
                this.addedLevel = '';

                this.getItems();
            } catch (error) {
                console.log(error);
            }
        },
        async deleteItem(item) {
            try {
                const response = await this.$store.dispatch("deleteCharacter", item._id);
                console.log("deleted " + item.name);
                this.getItems();
            } catch (error) {
                console.log(error);
            }
        },
        async marksidequest(item) {
            try {
                const response = this.$store.dispatch("editCharacter", {
                    id: item._id,
                    name: item.name,
                    type: item.type,
                    class: item.class,
                    ac: item.ac,
                    maxhp: item.maxhp,
                    hp: item.hp,
                    initiative: item.initiative,
                    sidequest: !item.sidequest,
                    condition: item.condition,
                    comments: item.comments,
                    race: item.race,
                    strength: item.strength,
                    dexterity: item.dexterity,
                    constitution: item.constitution,
                    intelligence: item.intelligence,
                    wisdom: item.wisdom,
                    charisma: item.charisma,
                    strength_modifier: item.strength_modifier,
                    dexterity_modifier: item.dexterity_modifier,
                    constitution_modifier: item.constitution_modifier,
                    intelligence_modifier: item.intelligence_modifier,
                    wisdom_modifier: item.wisdom_modifier,
                    charisma_modifier: item.charisma_modifier,
                    battle: item.battle,
                    level: item.level,
                    profbonus: item.profbonus,
                });
                this.getItems();
            } catch (error) {
                console.log(error);
            }
        },
        async editItem(item) {
            let strength_modifier = this.calculateModifier(item.strength);
            let dexterity_modifier = this.calculateModifier(item.dexterity);
            let constitution_modifier = this.calculateModifier(item.constitution);
            let wisdom_modifier = this.calculateModifier(item.wisdom);
            let intelligence_modifier = this.calculateModifier(item.intelligence);
            let charisma_modifier = this.calculateModifier(item.charisma);

            try {
                const response = this.$store.dispatch("editCharacter", {
                    id: item._id,
                    name: item.name,
                    type: item.type,
                    class: item.class,
                    ac: item.ac,
                    maxhp: item.maxhp,
                    hp: item.hp,
                    initiative: item.initiative,
                    sidequest: item.sidequest,
                    condition: item.condition,
                    comments: item.comments,
                    race: item.race,
                    strength: item.strength,
                    dexterity: item.dexterity,
                    constitution: item.constitution,
                    intelligence: item.intelligence,
                    wisdom: item.wisdom,
                    charisma: item.charisma,
                    strength_modifier: strength_modifier,
                    dexterity_modifier: dexterity_modifier,
                    constitution_modifier: constitution_modifier,
                    intelligence_modifier: intelligence_modifier,
                    wisdom_modifier: wisdom_modifier,
                    charisma_modifier: charisma_modifier,
                    battle: item.battle,
                    level: item.level,
                    profbonus: item.profbonus,
                });
                this.getItems();
                console.log("edited " + item.name);
            } catch (error) {
                console.log(error);
            }
        },
        async duplicateItem(item) {
            try {
                const response = await axios.post("uploadCharacter", {
                    name: item.name,
                    type: item.type,
                    class: item.class,
                    ac: item.ac,
                    maxhp: item.maxhp,
                    hp: item.hp,
                    initiative: item.initiative,
                    sidequest: item.sidequest,
                    condition: item.condition,
                    comments: item.comments,
                    race: item.race,
                    strength: item.strength,
                    dexterity: item.dexterity,
                    constitution: item.constitution,
                    intelligence: item.intelligence,
                    wisdom: item.wisdom,
                    charisma: item.charisma,
                    strength_modifier: item.strength_modifier,
                    dexterity_modifier: item.dexterity_modifier,
                    constitution_modifier: item.constitution_modifier,
                    intelligence_modifier: item.intelligence_modifier,
                    wisdom_modifier: item.wisdom_modifier,
                    charisma_modifier: item.charisma_modifier,
                    battle: item.battle,
                    level: item.level,
                    profbonus: item.profbonus,
                });
                this.getItems();
                console.log("duplicated " + item.name);
            } catch (error) {
                console.log(error);
            }
        },

        async getItems() {
            try {
                await this.$store.dispatch("getAllCharacters");
                this.items = this.$store.state.characters;
                console.log(this.items)
            } catch (error) {
                console.log(error);
            }
        },

        showAll() {
            this.show = 'all';
        },
        showPlayers() {
            this.show = 'players';
        },
        showNPCs() {
            this.show = 'npcs';
        },
        showParty() {
            this.show = 'party';
        },
        showEnemies() {
            this.show = 'enemies';
        },
        showOther() {
            this.show = 'other';
        },
        showSideQuest() {
            this.show = 'sidequest';
        },

        sortName() {
            function compare(a, b) {
                if (a.name < b.name)
                    return -1;
                if (a.name > b.name)
                    return 1;
                return 0;
            }
            this.items.sort(compare);
        },
        sortType() {
            function compare(a, b) {
                if (a.type < b.type)
                    return -1;
                if (a.type > b.type)
                    return 1;
                return 0;
            }
            this.items.sort(compare);
        },
        sortInitiative() {
            function compare(a, b) {
                if ((a.initiative - b.initiative) > 0)
                    return -1;
                if ((a.initiative - b.initiative) < 0)
                    return 1;
                return 0;
            }
            this.items.sort(compare);
        },
        sortLevel() {
            function compare(a, b) {
                if ((a.level - b.level) > 0)
                    return -1;
                if ((a.level - b.level) < 0)
                    return 1;
                return 0;
            }
            this.items.sort(compare);
        },


        incrementLevel(item) {
            var itemlevel = Number(item.level);
            if (itemlevel < 20) {
                itemlevel += 1;
                console.log(itemlevel);
            }
            let profbonus = this.calculateProfBonus(itemlevel);
            try {
                const response = this.$store.dispatch("editCharacter", {
                    id: item._id,
                    name: item.name,
                    type: item.type,
                    class: item.class,
                    ac: item.ac,
                    maxhp: item.maxhp,
                    hp: item.hp,
                    initiative: item.initiative,
                    sidequest: item.sidequest,
                    condition: item.condition,
                    comments: item.comments,
                    race: item.race,
                    strength: item.strength,
                    dexterity: item.dexterity,
                    constitution: item.constitution,
                    intelligence: item.intelligence,
                    wisdom: item.wisdom,
                    charisma: item.charisma,
                    strength_modifier: item.strength_modifier,
                    dexterity_modifier: item.dexterity_modifier,
                    constitution_modifier: item.constitution_modifier,
                    intelligence_modifier: item.intelligence_modifier,
                    wisdom_modifier: item.wisdom_modifier,
                    charisma_modifier: item.charisma_modifier,
                    battle: item.battle,
                    level: itemlevel,
                    profbonus: profbonus,
                });
                this.getItems();
                console.log("incremented level of " + item.name);
            } catch (error) {
                console.log(error);
            }
        },
        decrementLevel(item) {
            var itemlevel = Number(item.level);
            console.log(itemlevel);
            if (itemlevel > 1) {
                itemlevel -= 1;
                console.log(itemlevel);
            }
            let profbonus = this.calculateProfBonus(itemlevel);
            try {
                const response = this.$store.dispatch("editCharacter", {
                    id: item._id,
                    name: item.name,
                    type: item.type,
                    class: item.class,
                    ac: item.ac,
                    maxhp: item.maxhp,
                    hp: item.hp,
                    initiative: item.initiative,
                    sidequest: item.sidequest,
                    condition: item.condition,
                    comments: item.comments,
                    race: item.race,
                    strength: item.strength,
                    dexterity: item.dexterity,
                    constitution: item.constitution,
                    intelligence: item.intelligence,
                    wisdom: item.wisdom,
                    charisma: item.charisma,
                    strength_modifier: item.strength_modifier,
                    dexterity_modifier: item.dexterity_modifier,
                    constitution_modifier: item.constitution_modifier,
                    intelligence_modifier: item.intelligence_modifier,
                    wisdom_modifier: item.wisdom_modifier,
                    charisma_modifier: item.charisma_modifier,
                    battle: item.battle,
                    level: itemlevel,
                    profbonus: profbonus,
                });
                this.getItems();
                console.log("decremented level of " + item.name);
            } catch (error) {
                console.log(error);
            }
        },

        calculateModifier(instat) {
            var stat = Number(instat);
            var modifier = Math.floor((stat - 10) / 2);
            let modifierout;
            if (stat >= 10) {
                modifierout = '+' + modifier;
            } else if (stat === 0) {
                return '--';
            } else if (stat < 10) {
                modifierout = String(modifier);
            } else {
                return '+0';
            }
            return modifierout;
        },
        calculateProfBonus(inlevel) {
            var level = Number(inlevel);
            let profbonus;
            if (level <= 4) {
                profbonus = "+2";
            } else if (level >= 5 && level <= 8) {
                profbonus = "+3";
            } else if (level >= 9 && level <= 12) {
                profbonus = "+4";
            } else if (level >= 13 && level < 17) {
                profbonus = "+5";
            } else {
                profbonus = "+6";
            }
            return profbonus;
        },
    },
}
</script>

<style scoped>
body {
    font-family: 'Arvo';
    font-size: .3em;
    padding: 1.6em 8.3em 8.3em;
    background: #f3f3f3;
}

p.showname {
    padding-top: auto;
    font-size: 2.2em;
}

p.down {
    font-size: .8em;
}

.bb {
    padding-bottom: .4em;
}

select.aa {
    color: white;
    font-weight: bold;
    font-size: .9em;
}

option {
    color: inherit;
}

.alpha {
    font-family: inherit;
    font-weight: 500;
    font-size: 2.5em;
}

.row {
    padding-top: .9em;
    padding-left: 1.6em;
    flex-wrap: wrap !important;
}

#id {
    flex-wrap: wrap !important;
}

/* List */
ul {
    list-style: none;
}

button.delete {
    display: none;
}

li:hover .delete {
    display: block;
    margin-top: auto;
    margin-right: 1.6em;
    float: right;
}

label {
    width: 33em;
}

/* Form */

input.aa[type=text] {
    font-size: .9em;
    text-align: center;
    font-weight: 700;
    color: white;
}


button {
    font-family: 'Arvo';
    font-size: 1em;
}

/* Controls */
.controls {
    margin-top: 1.6em;
}

li {
    padding: 1.6em;
    display: block;
}

.lista {
    padding: 10px;
}

.listo {
    color: white;
    width: auto;
    min-height: 2.5em;
    padding-bottom: 2.5em;
    font-size: 1.2em;
    display: flex;
    align-items: center;
    border-radius: .5em;
    flex: auto;

    display: block;
    position: relative;
    cursor: pointer;
}


/* Custom checkbox
/* Customize the label (the container) */
.container1 {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* Hide the browser's default checkbox */
.container1 input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

/* Create a custom checkbox */
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #91BECC;
    border-radius: 2px;
}

/* On mouse-over, add a grey background color */
.container1:hover input~.checkmark {
    background-color: #346E7F;
}

/* When the checkbox is checked, add a blue background */
.container1 input:checked~.checkmark {
    background-color: #1A3740;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

/* Show the checkmark when checked */
.container1 input:checked~.checkmark:after {
    display: block;
}

/* Style the checkmark/indicator */
.container1 .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}


/*Radios*/
/* Customize the label (the container) */
.container2 {
    display: inline-block;
    position: absolute;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* Hide the browser's default radio button */
.container2 input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

/* Create a custom radio button */
.checkmark2 {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #91BECC;
    border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container2:hover input~.checkmark2 {
    background-color: #346E7F;
}


/* When the radio button is checked, add a blue background */
.container2 input:checked~.checkmark2 {
    background-color: #1A3740;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark2:after {
    content: "";
    position: absolute;
    display: none;
}

/* Show the indicator (dot/circle) when checked */
.container2 input:checked~.checkmark2:after {
    display: block;
}

/* Style the indicator (dot/circle) */
.container2 .checkmark2:after {
    top: 9px;
    left: 9px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
}
</style>
