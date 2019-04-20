<template>
    <div class="row">
        <div class="col">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="type author" aria-label="" aria-describedby="basic-addon1" v-model="search">
            <div class="input-group-append">
              <button class="btn btn-success" type="button" @click="searchAlbum">Search</button>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import SpotifyService from '@/services/SpotifyService.js'
    export default {
        data() {
            return {
                search: ""
            }
        },
        methods: {
            searchAlbum() {
                SpotifyService.getAlbum(this.search)
                    .then(res => {
                        console.log(res)
                        this.$emit('getAlbums', res.data.albums.items)
                    })
                    .catch(err => {
                        console.log("There was an error: " + err.response)
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
