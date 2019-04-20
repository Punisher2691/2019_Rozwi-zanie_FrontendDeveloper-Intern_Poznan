<template>
    <div class="row">
        <div class="col">
            <button class="btn btn-sm btn-outline-dark" @click="filterAlbums('alphabet')">Alphabetical</button>
            <button class="btn btn-sm btn-outline-dark" @click="filterAlbums('oldest')">Oldest</button>
            <button class="btn btn-sm btn-outline-dark" @click="filterAlbums('newest')">Newest</button>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            filterAlbums(filter) {
                this.$emit('filterAlbums', filter)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
