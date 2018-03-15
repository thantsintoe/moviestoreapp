<template id="main">
  <v-ons-splitter>
    <v-ons-splitter-side
      swipeable width="200px" collapse="" side="left"
      :open.sync="isOpen"
    >
      <v-ons-page>
        <v-ons-list>
          <!-- <v-ons-list-item v-for="page in pages"
            tappable modifier="chevron"
            @click="currentPage = page; openSide = false"
            :key="page"
          > -->
          <v-ons-list-header id="font-setting-container">
              <v-ons-button @click="isZawgyi=true;isUni=false;toggleFont()" v-bind:class="{ active: isZawgyi, fontSetting: true }" style="align-self: flex-start">Change Font</v-ons-button>
              <!-- <v-ons-button @click="isZawgyi=false;isUni=true;toggleFont()" v-bind:class="{ active: isUni, fontSetting: true }" class="fontSetting" style="align-self: flex-start">Unicode</v-ons-button> -->
            </v-ons-list-header>
          <v-ons-list-header @click="isCategoryVisible= !isCategoryVisible">{{convertFont("႐ုပ္ရွင္အမ်ိဳးအစား")}}</v-ons-list-header>
          <!-- <transition> -->
          <template v-if="isCategoryVisible">
            <v-ons-list-item v-for="page in pages"
              tappable modifier="chevron"
              @click="setGenere(page,0); openSide = false"
              :key="page"
            >
              <div class="center">{{ convertFont(translateToMyanmar(page)) }}</div>
            </v-ons-list-item>
          </template>
          <!-- </transition> -->
          <v-ons-list-header @click="isSerieCategoryVisible= !isSerieCategoryVisible">{{convertFont("ဇာတ္လမ္းတြဲမ်ား")}}</v-ons-list-header>
          <template v-if="isSerieCategoryVisible">
            
            <v-ons-list-item v-for="lang in serie_languages"
              tappable modifier="chevron"
              @click="setGenere(lang,1); openSide = false"
              :key="lang"
            >
              <div class="center">{{ convertFont(translateToMyanmar(lang))}} <span v-show="lang!=='All Series'"> {{convertFont("ဇာတ္လမ္းတြဲ")}}</span></div>
            </v-ons-list-item>
          </template>

          <v-ons-list-header @click="isLanguageVisible=!isLanguageVisible">{{convertFont("ဘာသာစကား")}}</v-ons-list-header>
          <template v-if="isLanguageVisible">
            <v-ons-list-item v-for="lang in languages"
              tappable material modifier=""
              @click="setGenere(lang,0)"
              :key="lang"
            >
              <div class="center">{{ convertFont(translateToMyanmar(lang)) }} </div>
            </v-ons-list-item>
          </template>
        </v-ons-list>
      </v-ons-page>
    </v-ons-splitter-side>

    <v-ons-splitter-content>
      <!-- <component :is="currentPage" :toggle-menu="() => openSide = !openSide"></component> -->
      <app-tabbar></app-tabbar>
    </v-ons-splitter-content>
  </v-ons-splitter>
</template>

<script>

import { mapGetters, mapActions} from 'vuex'
import translate from './translater/translate'

import All from './components/All.vue'
import Genere from './components/Genere.vue'
import AppTabbar from './AppTabbar.vue'
import fontConverter from './translater/fontConverter'

export default {
  data() {
    return {
      currentPage: 'all',
      pages: [
        'All Movies',
        'Animation',
        'Action',
        'Adventure',
        'Drama', 
        'Comedy',
        'Crime',
        'Family',
        'History',
        'Horror',
        'Music',
        'Mystery',
        'Romance',
        'Science Fiction',
        'Thriller',
        'War',
        'Western'
      ],
      serie_languages : [
        'All Series',
        "ko",
        "en",
        "cn",
        "ja"
      ],
      languages : [    
        "ko",
        "en",
        "cn",
        "ja",
        "hi"
      ],
      openSide: this.$store.state.splitter.open,
      store: this.$store,
      isCategoryVisible: false,
      isLanguageVisible: false,
      isSerieCategoryVisible: false,
      isZawgyi : true,
      isUni: false
    };
  },
  computed: {
    isOpen: {
      get() {
        return this.$store.state.splitter.open;
      },
      set(newValue) {
        this.$store.commit('splitter/toggle', newValue)
      }
    }
  },
  components: {
    all: All,
    genere: Genere,
    AppTabbar: AppTabbar
  },
  methods : {
    setGenere(selectedGenere, tabIndex) {
      // console.log(this)
      this.$store.dispatch('fixtures/SAVE_CURRENT_GENERE',selectedGenere)
      this.loadView(tabIndex)
    },
    translateToMyanmar(str) {
      return translate(str)
    },
    loadView(index) {
      this.$store.commit('tabbar/set', index);
      this.$store.commit('splitter/toggle',false);
    },
    toggleFont() {
      this.$store.dispatch('fixtures/TOGGLE_FONT')
      this.$store.commit('splitter/toggle',false);
    },
    convertFont(src) {
      let currentFont = this.$store.state.fixtures.font
      if(currentFont === 'uni') {
        return fontConverter.convertToUni(src)
      } else {
        return src;
      }
      
    }
  },
  created() {
    this.$store.dispatch('fixtures/LOAD_MOVIE_LIST')
    this.$store.dispatch('fixtures/LOAD_SERIE_LIST')

    
    if(localStorage.getItem('wishList') === '') {
      this.$store.dispatch('fixtures/LOAD_WISH_LIST', [])
    } else {
      let wishList = JSON.parse(localStorage.getItem('wishList'))
      this.$store.dispatch('fixtures/LOAD_WISH_LIST', wishList)
    }
    
  }
}
</script>

<style scoped>
ons-splitter-side[animation=overlay] {
  border-left: 1px solid #bbb;
}
.page, .page--material {
    background-color: transparent !important;
    background: #040404 !important;
  }

.list-header--material {
    background: #dd1b1b;
    color: #fff;
    border: none;
    font-size: 18px;
    padding: 8px 16px;
    height: 56px;
    text-align: center;
    padding-top: 15px;
    border-bottom: 2px solid #ffffff47;
}

.list-item--material {
    border: none;
    border-bottom: 1px solid #e9e9e97a;
    /* border-top: 1px solid #59575782; */
}

.toolbar--material {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    height: 56px;
    border-bottom: 0;
    box-shadow: 0 1px 5px rgba(0, 0, 0, .3);
    padding: 0;
    background-color: #dd1b1b;
    background-size: 0;
}

#font-setting-container {
  background: #fff;
  display: flex;
  flex-direction: row;
  padding: 0;
  height: 55px;

}

#font-setting-container > .button--material {
  width: 100%;
  border: none;
  border-radius: 0;
  /* box-shadow: none; */
  height: 55px;
  padding-top: 10px;
  background: #c7c1c1

}

#font-setting-container > .button--material.active {
  background:#f07f0d
}


</style>
