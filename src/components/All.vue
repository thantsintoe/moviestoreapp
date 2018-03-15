
<template>

  <v-ons-page id="allmovies">
    
    <transition name="fade">
      <!-- <v-ons-search-input autofocus v-show="searchMode" v-model="searchKeyword" placeholder="Search a movie"></v-ons-search-input> -->
      <input id="searchInput" type="text" autofocus v-show="searchMode" v-model="searchKeyword" placeholder="ရွာေဖြရန္">
    </transition>
    <div id="container">
      <div id="movie-container">
          <transition name="fade" v-for="movie in filteredMovies" :key="movie.title">
          <div class="movie-card">

            <img :src="imagePath(movie.code)" alt="" @click="toggleDialog(movie)">
            <!-- <img :src="imagePath(movie.code)" alt="" @click="handleClick"> -->
            <div class="name-year-container">
              <h4 style="text-align: center">{{ movie.title }}</h4>
              <p class="vote" style="text-align: center">{{movie.vote }}/10</p>
              
            </div>
            <p class="release-year" style="text-align: center">{{releaseYear(movie.year) }}</p>
            
            
            <p class="movie-code" style="text-align: center">{{ movie.code }} </p>
          </div>
          </transition>
          
      </div>
      <v-ons-button id="more-btn" @click="page++">{{convertFont("ဆက္လက္ေဖာ္ျပပါ")}}</v-ons-button>
    </div>

    <v-ons-dialog id="mydialog" cancelable
      :visible.sync="dialogVisible"
    >

      <v-ons-row class="movie-detail-dialog-box" id="my-dialog">
        <v-ons-col >
          <h3 style="text-align: center">{{ clickedMovie.title }}</h3>
          <p style="text-align: center">Rating : {{ clickedMovie.vote }} / 10</p>
          <p style="text-align: center" v-if="clickedMovie">Release Year : {{ releaseYear(clickedMovie.year) }}</p>
          <img :src="imagePath(clickedMovie.code)" alt="">
          <p class="movie-code" style="text-align: center" v-if="clickedMovie">Code : {{ clickedMovie.code}}</p>
          <p class="movie-summary" v-if="clickedMovie" style="text-align: left">{{ convertFont(clickedMovie.summary) }}</p>
          
        </v-ons-col>
      </v-ons-row>
      <v-ons-row>
        <v-ons-col>
          <button class="add-btn" @click="addToWishList(clickedMovie)"><icon name="heart"></icon>{{convertFont("မွတ္ထားမည္")}}</button>
        </v-ons-col>
        <v-ons-col>
          <button class="cancel-btn" @click="dialogVisible=false"><icon name="chevron-left"></icon>{{convertFont("ေနာက္သို႔")}}</button>
        </v-ons-col>
      </v-ons-row>
      
    </v-ons-dialog>
     
    <v-ons-fab
      position="bottom right"
      :visible="true"
      @click="toggleSearchMode"
      ref='search'
    >
      <icon name="search"></icon>
    </v-ons-fab>
    
  </v-ons-page>

</template>

<script>
import customToolbar from '../partials/CustomToolbar.vue'
import Detail from './Detail.vue'
import translate from '../translater/translate'
import shuffle from '../assets/js/shuffle'
import fontConverter from '../translater/fontConverter'

export default {
  props: ['toggleMenu'],
  components: { customToolbar },
  data() {
    return {
      movies : this.$store.state.fixtures.movies,
      searchKeyword : '',
      searchMode: false,
      page: 1,
      perPage: 150,
      dialogVisible: false,
      clickedMovie: '',
      wishListMovies: this.$store.state.fixtures.wishlist,
    }
  },
  computed: {
    genere() {
      let genere = this.$store.state.fixtures.currentGenere[0]
      let currentTabIndex = this.$store.state.tabbar.index
      
      if(genere === "All Series" && currentTabIndex === 0) {
        this.$store.dispatch('fixtures/SAVE_CURRENT_GENERE','All Movies')
      }
      return this.$store.state.fixtures.currentGenere[0];
    },
    filteredMovies: function () {
      // var movies = shuffle(this.movies),
      var movies = this.movies,
          searchKeyword = this.searchKeyword,
          releaseYear = this.releaseYear;
      
      // movies = this.sortMoviesByYear(movies)
      // movies = shuffle(movies)

      if(!searchKeyword){
          return this.filterByCurrentGenere(movies)
      } else {
        searchKeyword = searchKeyword.trim().toLowerCase();

        var filtered_movies = movies.filter(function(item){
            if(item.title.toLowerCase().indexOf(searchKeyword) !== -1 && item.code > 0){
                return item;
            }
        })

      // Return an array with the filtered data.
      return filtered_movies.slice(0,this.page* this.perPage);
      }  
    },
    wishListCodes() {
      if(this.wishListMovies) {
        return this.wishListMovies.map(item => item.code)
      } else {
        return []
      }
    }
  },
  methods: {
    imagePath: function (code) {

      try {
      // a path we KNOW is totally bogus and not a module
        return require('../assets/poster/'+code+'.jpg')
      }
      catch (e) {
        return require('../assets/poster/sample.jpg')
      }

    },
    releaseYear(fullYear) {
      return fullYear.split("-")[0]
    },
    filterByCurrentGenere(inputMovies) {
      let result;
      // this.page = 1
      let currentPage = this.page
      let moviesPerPage = this.perPage
      if(this.genere !== 'All Movies') {
        result = inputMovies.filter((item) => {
          return item.genere.indexOf(this.genere) >= 0 || this.checkLanguage(item.language)
        })
        result = result.slice(0, currentPage * moviesPerPage)
        return result;
      }
      return inputMovies.slice(0, currentPage * moviesPerPage)
    },
    sortMoviesByYear(movies) {
      return movies.sort((a, b) => {
        if (a.code > b.code) {
          return 1;
        }
        if (a.code < b.code) {
          return -1;
        }
        return 0;
      })
    },
    checkLanguage(lang) {
      if(this.genere === 'hi' || this.genere === 'te' || this.genere === 'ta') {
        return lang === 'hi' || lang === 'te' || lang === 'ta'
      } else if(this.genere === 'cn' || this.genere === 'zh') {
        return lang === 'cn' || lang === 'zh'
      } else {
        return lang === this.genere
      }
      
    },
    translateToMyanmar(str) {
      return translate(str)
    },
    toggleSearchMode() {
      this.searchMode=!this.searchMode
      this.searchKeyword = ''
    },
    toggleDialog(movie) {
      this.dialogVisible = true
      this.clickedMovie = movie
    },
    handleClick() {
      this.$store.commit('navigator/push', Detail);
    },
    addToWishList(wishMovie) {
      
      if(this.wishListCodes.indexOf(wishMovie.code) < 0) {
        this.$store.dispatch('fixtures/ADD_TO_WISHLIST',wishMovie)
        this.dialogVisible = false;
        localStorage.setItem('wishList', JSON.stringify(this.wishListMovies))
      } else {
        this.dialogVisible = false;
      }
    },
    isWishListed(movie) {
      this.wishListMovies.forEach((m) => {
        console.log(m.code)
        if(movie.code == m.code) {
          return true
        }
      })
      return false
    },
    convertFont(src) {
      let currentFont = this.$store.state.fixtures.font
      if(currentFont === 'uni') {
        return fontConverter.convertToUni(src)
      } else {
        return src;
      }
      
    }
  }
};
</script>

<style scoped>

#container {
    
    background: #1a1a1c;
    text-align: center;
    padding-bottom: 20px;
  }

  #movie-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
    padding-top: 20px;
    background: #1a1a1c;
    min-height: calc(100vh - 85px);
  }

  #searchInput {
    display: block;
    width: 95%;
    height: 45px;
    font-size: 14px;
    background: rgba(255,255,255,0.8);
    border-radius: 0px;
    border: 2px solid #fff;
    border-radius: 0px;
    left: 50%;
    transform: translateX(-50%);
    margin: 20px auto;
    padding-left: 20px;
    position: fixed;
    top: 0px;
    box-sizing: border-box;
    z-index: 200;
    
  }
  
  .movie-card {
    position: relative;
    width: 50%;
    color: #fff;
    /* border: 1px solid #e2e2e2; */
    box-sizing: border-box;
    margin-bottom: 15px;
    
  }

  .movie-card > img {
    display: block;
    /* min-height: 240px; */
    width: 85%;
    margin: 0 auto;
  }

  .name-year-container {
    position: relative;
    width: 100%;
    min-height: 30px;
  }

  .name-year-container > h4 {
    font-size: 15px;
    font-weight: lighter
  }

  .release-year {
    position: absolute;
    z-index: 90;
    top: 0px;
    left: 20px;
    width: 50px;
    background: #010101;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
    padding: 2px;
  }

  .vote {
    position: absolute;
    z-index: 90;
    top: -50px;
    left: 20px;
    width: 50px;
    background: #010101;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
    padding: 2px;
  }

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.page__background {
    background-color: #212198;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
}

#more-btn {
    font-size: 11px;
    height: 30px;
    background: #dd1b1a;
    border-radius: 15px;
}













</style>