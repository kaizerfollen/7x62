<template>
  <b-container fluid>
    <h3 class="list-title">{{ listTitle }}</h3>
    <b-row>
      <template v-if="isExist">
        <b-col
          class="col-sm-12 col-lg-2"
          v-for="(movie, key) in list"
          :key="key"
        >
          <movie-item
            :movie="movie"
            @mouseover.native="onMouseOver(movie.Poster)"
            @removeItem="onRemoveItem"
            @showModal="onShowMovieInfo"
          />
        </b-col>
      </template>
      <template v-else>
        <div>Empty list</div>
      </template>
    </b-row>
    <b-modal
      body-class="movie-modal-body"
      :id="movieInfoModalID"
      size="xl"
      hide-footer
      hide-header
    >
      <movie-info-modal-content
        :movie="selectedMovie"
        @closeModal="onCloseModal"
      />
    </b-modal>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MovieItem from "./MovieItem";
import MovieInfoModalContent from "./MovieInfoModalContent";

export default {
  name: "MoviesList",
  props: {
    list: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    movieInfoModalID: "movie-info",
    selectedMovieID: ""
  }),
  components: {
    MovieItem,
    MovieInfoModalContent
  },
  computed: {
    ...mapGetters("movies", ["isSearch"]),
    isExist() {
      return Boolean(Object.keys(this.list).length);
    },
    listTitle() {
      return this.isSearch ? "Search result" : "IMDB Top 250";
    },
    selectedMovie() {
      return this.selectedMovieID ? this.list[this.selectedMovieID] : null;
    }
  },
  methods: {
    ...mapActions("movies", ["removeMovie"]),
    ...mapActions(["showNotify"]),
    onMouseOver(poster) {
      this.$emit("changePoster", poster);
    },
    async onRemoveItem({ id, title }) {
      const isConfirmed = await this.$bvModal.msgBoxConfirm(
        `Are you sure delete ${title}?`
      );

      if (isConfirmed) {
        this.removeMovie(id);
        this.showNotify({
          msg: "Movie deleted successful",
          variant: "success",
          title: "Success"
        });
      }
    },
    onShowMovieInfo(id) {
      this.selectedMovieID = id;
      this.$bvModal.show(this.movieInfoModalID);
    },
    onCloseModal() {
      this.selectedMovieID = null;
      this.$bvModal.hide(this.movieInfoModalID);
    }
  }
};
</script>

<style scoped>
.list-title {
  font-size: 50px;
  margin-bottom: 30px;
  color: #fff;
}
</style>

<style>
.movie-modal-body {
  padding: 0 !important;
}
</style>
