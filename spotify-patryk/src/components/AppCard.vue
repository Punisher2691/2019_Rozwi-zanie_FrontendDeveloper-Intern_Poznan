<template>
    <div class="flip-card" @click="getTracks">
        <div class="flip-card-inner"
            :class="{'flip' : back}">
            <div class="flip-card-front":style="{backgroundImage: `url('${img}')`}">
                <h2>{{ name }}</h2>
                <span class="badge badge-info">{{artist}}</span> <br>
                <span class="badge badge-info">{{date}}</span> <br>
                <button type="button" class="btn btn-success btn-sm" @click="back = !back">Tracks {{ quantity }}</button>
            </div>
            <div class="flip-card-back">
                <div>Total duration: {{ totalDuration }} minuts</div>
                <h2>Tracks:</h2>
                <ul class="list-group">
                    <li class="list-group-item" v-for="track in tracks"
                        :key="track.id"
                        @click="playSample(track.preview_url)">
                        {{ track.name }} - {{ track.duration_ms | minute }} min.
                    </li>
                </ul>

                <button type="button" class="btn btn-success btn-lg mt-1"
                        @click="back = !back">Back</button>
            </div>
        </div>
    </div>
</template>

<script>
import SpotifyService from '@/services/SpotifyService.js';
    export default {
        data() {
            return {
                tracks: [],
                back: false,
                totalDuration: 0,
                sampleUrl: ""
            }
        },
        props: ['name', 'id', 'date', 'img', 'artist', 'quantity'],
        filters: {
            minute(v) {
                return ((v / 1000) / 60).toFixed(0)
            }
        },
        methods: {
            playSample(url) {
                this.$emit('play', url)
            },
            getTracks() {
                SpotifyService.getTracks(this.id)
                .then(res => {
                        this.tracks = res.data.items;
                    })
                .then(v => {
                    this.setTotalDuration()
                })
                .catch(err => {
                        console.log("There was an error: " + err.response)
                })
            },
            setTotalDuration() {
                this.totalDuration = Object.values(this.tracks).reduce((t, n) => t + n.duration_ms, 0)
                this.totalDuration = (this.totalDuration / 1000 ) / 60
                this.totalDuration = this.totalDuration.toFixed(0)
            }
        }
    }
</script>

<style lang="scss" scoped>


ul {
    list-style-type: none;
    text-align: left;
    li {
        cursor: pointer;
    }
}
.flip-card {
    background-color: transparent;
    width: 100%;
    margin: 20px 0;
    height: 300px;
    perspective: 1000px; /* Remove this if you don't want the 3D effect */
}
img{
    width: 300px;
    height: 300px;
}
/* This container is needed to position the front and back side */
.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip {
    transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
    color: white;
    background-size: cover;
    h2 {
        display: block;
        background-color: rgba(0,0,0, .5);
    }
}

/* Style the back side */
.flip-card-back {
    overflow: scroll;
    background-color: white;
    color: black;
    transform: rotateY(180deg);
}
</style>
