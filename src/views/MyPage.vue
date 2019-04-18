<template>
<div>
    <div v-if="user">
        <div class="header">

        </div>
        <escape-event @escape="escape"></escape-event>
        <uploader :show="show" @escape="escape" @uploadFinished="uploadFinished" />
        <CharacterGallery :characters="characters" />
    </div>
    <div v-else>
        <p>If you would like to upload photos, please register for an account or login.</p>
        <router-link to="/register" class="pure-button">Register</router-link> or
        <router-link to="/login" class="pure-button">Login</router-link>
    </div>
</div>
</template>


<script>
import EscapeEvent from '@/components/EscapeEvent.vue'
import Uploader from '@/components/Uploader.vue'
import ImageGallery from '@/components/ImageGallery.vue'
import CharacterGallery from '@/components/CharacterGallery.vue'

export default {
    name: 'mypage',
    components: {
        EscapeEvent,
        Uploader,
        ImageGallery,
        CharacterGallery,
    },
    data() {
        return {
            show: false,
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        photos() {
            return this.$store.state.photos;
        },
        characters(){
            return this.$store.state.characters;
        }
    },
    async created() {
        await this.$store.dispatch("getUser");
        await this.$store.dispatch("getMyPhotos");
    },
    methods: {
        async logout() {
            try {
                this.error = await this.$store.dispatch("logout");
            } catch (error) {
                console.log(error);
            }
        },
        escape() {
            this.show = false;
        },
        toggleUpload() {
            this.show = true;
        },
        async uploadFinished() {
            this.show = false;
            try {
                this.error = await this.$store.dispatch("getMyPhotos");
            } catch (error) {
                console.log(error);
            }
        },
    }
}
</script>


<style scoped>
.header {
    display: flex;
}

.header a {
    padding-left: 50px;
    color: #222;
    font-size: 2em;
}

.header svg {
    margin-top: 12px;
}
</style>
