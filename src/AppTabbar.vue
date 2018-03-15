<template>
  <v-ons-page :style="swipePosition">
    <custom-toolbar :title="convertFont(translateToMyanmar(genere))" :toggle-menu="() => openSide = !openSide"></custom-toolbar>

    <v-ons-tabbar position="auto"
      :modifier="md ? 'autogrow white-content' : null"
      :on-swipe="md ? onSwipe : null"
      :tabbar-style="swipeTheme"
      :tabs="tabs"
      :index.sync="index"
    ></v-ons-tabbar>
  </v-ons-page>
</template>


<script>

import All from './components/All.vue';
import Series from './components/Series.vue';
import translate from './translater/translate'
import fontConverter from './translater/fontConverter'

// Just a linear interpolation formula
const lerp = (x0, x1, t) => parseInt((1 - t) * x0 + t * x1, 10);
// RGB colors
const red = [244, 67, 54];
const blue = [30, 136, 229];
const purple = [103, 58, 183];

export default {
  data () {
    return {
      shutUp: !this.md,
      showingTip: false,
      colors: red,
      animationOptions: {},
      topPosition: 0,
      tabs: [        
        {
          label: "Movies",
          icon: this.md ? null : 'ion-home',
          page: All,
          theme: red
        },
        {
          label: "TV Series",
          icon: this.md ? null : 'ion-edit',
          page: Series,
          theme: blue
        }
      ]
    };
  },

  methods: {
    onSwipe(index, animationOptions) {
      // Apply the same transition as ons-tabbar
      this.animationOptions = animationOptions;

      // Interpolate colors and top position
      const a = Math.floor(index), b = Math.ceil(index), ratio = index % 1;
      this.colors = this.colors.map((c, i) => lerp(this.tabs[a].theme[i], this.tabs[b].theme[i], ratio));
      this.topPosition = lerp(this.tabs[a].top || 0, this.tabs[b].top || 0, ratio);
    },
    translateToMyanmar(str) {
      return translate(str)
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

  computed: {
    index: {
      get() {
        return this.$store.state.tabbar.index;
      },
      set(newValue) {
        this.$store.commit('tabbar/set', newValue)
      }
    },
    title() {
      return this.md ? 'Movies' : this.tabs[this.index].title || this.tabs[this.index].label;
    },
    swipeTheme() {
      return this.md && {
        backgroundColor: "rgb(51, 50, 51)",
        transition: `all ${this.animationOptions.duration || 0}s ${this.animationOptions.timing || ''}`
      }
    },
     swipePosition() {
      return this.md && {
        top: this.topPosition + 'px',
        transition: `all ${this.animationOptions.duration || 0}s ${this.animationOptions.timing || ''}`
      }
    },
     genere() {
      return this.$store.state.fixtures.currentGenere[0];
    }
    
  }
};
</script>

<style>
/* Custom 'white-content' modifier */

.page--material .toolbar--white-content__center,
.page--material .toolbar-button--white-content,
.page--material :checked + .tabbar--white-content__button {
  color: white;
}

.page--material .tabbar--white-content__button {
  color: rgba(200, 200, 200, 0.5);
}

.page--material .tabbar--white-content__border {
  background-color: rgb(222, 28, 28);
  width: 100px;
}
</style>
