
<template>
  <v-ons-page id="allseries">
    <transition name="fade">
      <!-- <v-ons-search-input autofocus v-show="searchMode" v-model="searchKeyword" placeholder="Search a movie"></v-ons-search-input> -->
      <input id="seriesearchInput" v-show="searchMode" type="text" autofocus v-model="searchKeyword" placeholder="ရွာေဖြရန္">
    </transition>
    <div id="container">
      <div id="serie-container">
          <transition name="fade" v-for="serie in filteredSeries" :key="serie.title">
          <div class="movie-card">

            <img :src="imagePath(serie.code)" alt="" @click="toggleDialog(serie)">
            <div class="name-year-container">
              <h4 style="text-align: center">{{ serie.title }}</h4>
              
            </div>
            
            <p class="movie-code" style="text-align: center">{{ serie.code }} </p>
          </div>
          </transition>
          
      </div>
      <v-ons-button id="more-btn" @click="page++">ဆက္လက္ေဖာ္ျပပါ</v-ons-button>
    </div>

    <v-ons-dialog id="mydialog" cancelable :visible.sync="dialogVisible">

      <v-ons-row>
        <v-ons-col v-if="dialogVisible">
          <p style="text-align: center">{{ clickedSerie.title }}</p>
          <img :src="imagePath(clickedSerie.code)" alt="">
          <p style="text-align: center">{{ clickedSerie.episode }} Episodes</p>
          <p style="text-align: center">{{ clickedSerie.status }}</p>
        
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
import translate from '../translater/translate'

export default {
  props: ['toggleMenu'],
  components: { customToolbar },
  data() {
    return {
      series : this.$store.state.fixtures.series,
      searchKeyword : '',
      searchMode: false,
      page: 1,
      perPage: 200,
      dialogVisible: false,
      clickedSerie: ''
    }
  },
  computed: {
    genere() {
      let genere = this.$store.state.fixtures.currentGenere[0]
      let currentTabIndex = this.$store.state.tabbar.index
      let serie_genere_list = [
          'All Series',
          "en",
          "ko",
          "cn",
          "ja"
      ]
      if(serie_genere_list.indexOf(genere) < 0 && currentTabIndex === 1) {
        this.$store.dispatch('fixtures/SAVE_CURRENT_GENERE','All Series')
      }
      return this.$store.state.fixtures.currentGenere[0];
    },
    filteredSeries: function () {
      let series = this.series,
          searchKeyword = this.searchKeyword
      
      series = series.filter((item) => {
        return item.status !== "not complete"
      })

      if(!searchKeyword){
          return this.filterByCurrentGenere(series)
      } else {
        searchKeyword = searchKeyword.trim().toLowerCase();

        var filtered_series = series.filter(function(item){
            if(item.title.toLowerCase().indexOf(searchKeyword) !== -1 && item.status !== "not complete"){
                return item;
            }
        })

        // Return an array with the filtered data.
        return filtered_series.slice(0,this.page* this.perPage);

      }

      
    }
  },
  methods: {
    imagePath: function (code) {

      try {
      // a path we KNOW is totally bogus and not a module
        return require('../assets/serie_poster/'+code+'.jpg')
      }
      catch (e) {
        return require('../assets/serie_poster/sample.jpg')
      }

    },
    filterByCurrentGenere(inputMovies) {
      let result;
      let currentPage = this.page
      let moviesPerPage = this.perPage
      if(this.genere !== 'All Series') {
        result = inputMovies.filter((item) => {
          return this.checkLanguage(item.language)
        })
        result = result.slice(0, currentPage * moviesPerPage)
        return result;
      }
      return inputMovies.slice(0, currentPage * moviesPerPage)
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
    toggleDialog(serie) {
      this.dialogVisible = true
      this.clickedSerie = serie
    },
    handleClick() {
      this.$store.commit('navigator/push', Detail);
    }
  },
  created() {
    let serie_genere_list = [
        'All Series',
        "en",
        "ko",
        "cn",
        "ja"
    ]

    if(serie_genere_list.indexOf(this.genere) < 0) {
      this.$store.dispatch('fixtures/SAVE_CURRENT_GENERE','All Series')
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

  #serie-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
    padding-top: 20px;
    background: #1a1a1c;
    min-height: calc(100vh - 85px);
  }

  #seriesearchInput {
    display: block;
    width: 95%;
    height: 45px;
    font-size: 14px;
    border-radius: 5px;
    background: rgba(255,255,255,0.8);
    border-radius: 0px;
    border: 2px solid #fff;
    margin: 20px auto;
    margin-left: 10px;
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
    background: #1fc06daa;
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