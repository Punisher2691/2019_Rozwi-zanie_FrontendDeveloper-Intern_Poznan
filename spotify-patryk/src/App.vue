<template>
  <div id="app">
    <div class="container">
      <audio src="" autoplay ref="audio"></audio>
      <AppSearch @getAlbums="setAlbums"/>
      <AppFilters @filterAlbums="filterAlbums"/>
      <div class="row">
        <div class="col-4" v-for="album in albums" :key="album.id">
          <AppCard
            :name="album.name"
            :id="album.id"
            :date="album.release_date"
            :img="album.images[0].url"
            :quantity="album.total_tracks"
            :artist="album.artists[0].name"
            @play="play"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppSearch from '@/components/AppSearch.vue'
import AppFilters from '@/components/AppFilters.vue'
import AppCard from '@/components/AppCard.vue'

export default {
  name: 'app',
  components: {
    AppSearch,
    AppFilters,
    AppCard
  },
  data() {
    return {
      albums: [],
      tracks: []
    }
  },
  methods: {
    setAlbums(albums) {
      this.albums = albums
    },
    play(url) {
      this.$refs.audio.src = url
      this.$refs.audio.play()
    },
    sortByAlphabet(alphabet) {
      return (a, b) => {
        let letterA = a.name.toLowerCase();
        let letterB = b.name.toLowerCase();
        let indexA = alphabet.indexOf(letterA[0]);
        let indexB = alphabet.indexOf(letterB[0]);

        if(indexA === indexB) {
          return letterA < letterB && -1 ||
                 letterA > letterB && 1  ||
                 0;
        } else {
          return indexA - indexB;
        }
      }
    },
    filterAlbums(by) {
      if (by === 'alphabet') {
        const sorter = this.sortByAlphabet('*!@_.()#^&%-=+01234567989aąbcćdeęfghijklłmnńoóprsśtuwyzźż');
        this.albums = this.albums.sort(sorter);
        return;
      } else if (by === 'oldest') {
        this.albums.sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
        return;
      }
      this.albums.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
    }
  }
}
</script>

<style>

</style>
