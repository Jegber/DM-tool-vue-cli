<template>
<div>

    <p v-if="error" class="error">{{error}}</p>

    <div v-if="photo">
        <h1>{{photo.title}}</h1>
        <img class="image" :src="photo.path" />
        <p>{{photo.user}}</p>
        <p class="photoDate">{{formatDate(photo.created)}}</p>
        <p>{{photo.description}}</p>
        <br>
    </div>

    <div v-for="comment in comments" v-bind:key="comment._id">
        <div v-if="comment.photo == photo._id" class="commentBox">
            <p> {{comment.text}} </p>
            <p v-if="comment.user" class="commentData"> ~{{comment.user.name}}, {{formatDate(comment.created)}} </p>
        </div>
    </div>

    <div v-if="user">
        <h1>User is logged in. Comment below:</h1>
        <form @submit.prevent="addComment">
            <textarea v-model="addedComment"></textarea>
            <br />
            <button type="submit">Submit</button>
        </form>
    </div>


</div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'photo',
    data() {
        return {
            error: '',
            addedComment: ''
        }
    },
    computed: {
        photo() {
            return this.$store.state.photo;
        },
        user() {
            return this.$store.state.user;
        },
        comments() {
            return this.$store.state.comments;
        }
    },
    created() {
        this.getPhoto()
        this.getComments()
    },
    methods: {
        async getPhoto() {
            try {
                console.log(this.$route.params.id)
                this.error = await this.$store.dispatch("getPhoto", {
                    id: this.$route.params.id
                });
                if (this.error === "")
                    console.log(this.$store.photo)
                //this.$router.push('mypage');
            } catch (error) {
                console.log(error);
            }
        },
        formatDate(date) {
            if (moment(date).diff(Date.now(), 'days') < 15)
                return moment(date).fromNow();
            else
                return moment(date).format('d MMMM YYYY');
        },
        async addComment() {
            this.$store.dispatch("addComment", {
                user: this.user,
                photo: this.photo,
                text: this.addedComment
            });
            this.addedName = "";
            this.addedProblem = "";
            this.creating = false;
            this.getComments();
        },
        async getComments() {
            try {
                this.error = await this.$store.dispatch("getComments", {
                    photo: this.photo
                });
                if (this.error === "")
                    console.log(this.$store.photo)
                //this.$router.push('mypage');
            } catch (error) {
                console.log(error);
            }
        },
    }
}
</script>

<style scoped>
.photoTitle {
    margin: 0px;
    font-size: 1.2em;
}

.photoDate {
    margin: 0px;
    font-size: 0.9em;
    font-weight: normal;
}

.commentData {
    margin: 0px;
    font-size: 0.8em;
    font-weight: lighter;
}

.commentBox {
    padding: 5px;
    margin: 50px;
    outline-style: solid;
    outline-color: gray;
}

p {
    margin: 0px;
}

.image {
    margin: 0 0 1.5em;
    display: inline-block;
    width: 100%;
}

.image img {
    max-width: 600px;
    max-height: 600px;
    image-orientation: from-image;
}
</style>
