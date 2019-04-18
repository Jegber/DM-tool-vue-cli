import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        photos: [],
        photo: null,
        comments: [],
        characters: [],

    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setPhotos(state, photos) {
            state.photos = photos;
        },
        setPhoto(state, photo) {
            state.photo = photo;
        },
        setComments(state, comments) {
            state.comments = comments;
        },
        setCharacters(state, characters){
            console.log(characters);
            state.characters = characters;
            console.log(state.characters);
        }

    },
    actions: {
        async register(context, data) {
            try {
                let response = await axios.post("/api/users", data);
                context.commit('setUser', response.data);
                return "";
            } catch (error) {
                return error.response.data.message;
            }
        },
        async login(context, data) {
            try {
                let response = await axios.post("/api/users/login", data);
                context.commit('setUser', response.data);
                return "";
            } catch (error) {
                return error.response.data.message;
            }
        },
        async logout(context) {
            try {
                await axios.delete("/api/users");
                context.commit('setUser', null);
                return "";
            } catch (error) {
                return error.response.data.message;
            }
        },
        async getUser(context) {
            try {
                let response = await axios.get("/api/users");
                context.commit('setUser', response.data);
                return "";
            } catch (error) {
                return "";
            }
        },
        async upload(context, data) {
            try {
                await axios.post('/api/photos', data);
                return "";
            } catch (error) {
                return error.response.data.message;
            }
        },
        async addComment(context, data) {
            try {
                await axios.post('/api/comments', data);
                return "";
            } catch (error) {
                return error.response.data.message;
            }
        },
        async getMyPhotos(context) {
            try {
                let response = await axios.get("/api/photos");
                context.commit('setPhotos', response.data);
                return "";
            } catch (error) {
                return "";
            }
        },
        async getAllPhotos(context) {
            try {
                let response = await axios.get("/api/photos/all");
                context.commit('setPhotos', response.data);
                return "";
            } catch (error) {
                return "";
            }
        },
        async getPhoto(context, data) {
            try {
                let response = await axios.get("/api/photos/photo/" + data.id);
                context.commit('setPhoto', response.data);
                return "";
            } catch (error) {
                return "";
            }
        },
        async getComments(context, data) {
            try {
                console.log("getting comments for: ")
                console.log(data)
                let response = await axios.get("/api/comments", data);
                context.commit('setComments', response.data)
                return "";
            } catch (error) {
                return "";
            }
        },
        async getAllCharacters(context) {
            try {
                let response = await axios.get("/api/characters/all");
                console.log(response);
                console.log(response.data)
;                context.commit('setCharacters', response.data);
                console.log(characters);
                return "";
            } catch (error) {
                return "";
            }
        },
        async uploadCharacter(context, data) {
            try {
                await axios.post('/api/characters', data);
                return "";
            } catch (error) {
                return error.response.data.message;
            }
        },
        async editCharacter(context, data) {
            try {
                await axios.put("/api/characters/" + data.id, data);
                return "";
            } catch (error) {
                return error.response.data.message;
            }
        },
        async deleteCharacter(context, data) {
            try {
                await axios.delete('/api/characters/' + data.id, data);
                return "";
            } catch (error) {
                return error.response.data.message;
            }
        },

    }
})
