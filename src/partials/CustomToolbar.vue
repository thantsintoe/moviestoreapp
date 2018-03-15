<template id="toolbar">
  <v-ons-toolbar>
    <div class="left">
      <v-ons-toolbar-button @click="toggleSplitter">
        <!-- <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon> -->
        <icon name="bars"></icon>
      </v-ons-toolbar-button>
    </div>
    <div class="center">{{ convertFont(title) }}</div>
    <div class="right">
    <v-ons-toolbar-button>
        <icon name="shopping-bag"></icon>
        <v-ons-button @click="showPopover($event, 'right')" id="wishlist" style="align-self: flex-start"> MY LIST </v-ons-button>
    </v-ons-toolbar-button>

    </div>



    <v-ons-popover cancelable
      :visible.sync="popoverVisible"
      :target="popoverTarget"
    >
      <p style="text-align: center">My List ({{numberOfWishListItem}} Movies)</p>
      <ul id="wishlist-movies">
        <li v-for="movie in wishListMovies" :key="movie.code">{{movie.code}} - {{movie.title}}</li>
      </ul>
      <button @click="handleClearWishList">Clear</button>
    </v-ons-popover>
  </v-ons-toolbar>

  
</template>

<script>
import fontConverter from '../translater/fontConverter'
export default {
  props: ['title', 'action'],
  data() {
    return {
      switchOn : true,
      popoverVisible: false,
      popoverTarget: null,
      popoverDirection: 'up',
      coverTarget: false
    }
  },
  computed: {
    numberOfWishListItem() {
      if(this.wishListMovies) {
        return this.wishListMovies.length
      } else {
        return 0
      }
    },
    wishListMovies() {
      return this.$store.state.fixtures.wishlist
    }
  },
  methods: {
    toggleSplitter() {
      this.$store.commit('splitter/toggle', true)
    },
    handleShuffleClick() {
      this.$store.dispatch('fixtures/SHUFFLE_MOVIE_LIST')
    },
    showPopover(event, direction, coverTarget = false) {
      this.popoverTarget = event;
      this.popoverDirection = direction;
      this.coverTarget = coverTarget;
      this.popoverVisible = true;
    },
    handleClearWishList() {
      this.$store.dispatch('fixtures/CLEAR_WISH_LIST')
      this.wishListMovies = []
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

@font-face {
    font-family: myFont;
    src: url(../assets/fonts/ZawgyiOne.ttf);
}

* {
  font-family: 'myFont';
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
    border-bottom: 1px solid rgba(255,255,255,0.2);
    /* box-shadow: 0 1px 5px rgba(0, 0, 0, .3); */
    padding: 0;
    background-color: #dd1b1b;
    background-size: 0;
}

.toolbar--material__center {
    
    color: #ffffff;
  
}

.toolbar-button--material {
    font-size: 22px;
    color: #ffffff;
    display: inline-block;
    padding: 0 12px;
    height: 100%;
    margin: 0;
    border: none;
    border-radius: 0;
    vertical-align: baseline;
    vertical-align: initial;
    transition: background-color 0.25s linear;
}

#wishlist {
  background: #de1c1c;
  /* color: #de1c1c; */
  widows: 100px;
  box-shadow: 0px 0px;
}

#wishlist .fa-icon {
  fill: #fff;
}



</style>
