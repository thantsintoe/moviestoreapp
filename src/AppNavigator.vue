<template>
  <v-ons-navigator swipeable swipe-target-width="50px"
    :page-stack="pageStack"
    :options="options"
    :pop-page="storePop"
  ></v-ons-navigator>
  <!-- <v-ons-navigator swipeable swipe-target-width="50px"
    :page-stack="pageStack"
    :pop-page="storePop"
    :options="options"
  ></v-ons-navigator> -->
</template>

<script>

import AppSplitter from './AppSplitter.vue';
import Detail from './components/Detail.vue'

export default {
  beforeCreate() {
    this.$store.commit('navigator/push', AppSplitter);
    
  },
  data() {
    return {
      shutUp: this.md
    }
  },
  computed: {
    pageStack() {
      return this.$store.state.navigator.stack;
      // return [AppSplitter];
    },
    options() {
      return this.$store.state.navigator.options;
    }
  },
  methods: {
    storePop() {
      // this.$store.commit('navigator/clear');
      // this.$store.commit('navigator/push',AppSplitter);
    }
  },
  mounted: function () {
    // this.$store.dispatch('fixtures/LOAD_MATCH_LIST')
  }
};
</script>

<style>

@font-face {
    font-family: myFont;
    src: url(assets/fonts/ZawgyiOne.ttf);
    /* src: url(assets/fonts/CormorantInfant-Regular.ttf); */
}

/* * {
  font-family: 'myFont';
} */

#my-dialog {
  /* background: #444444e0; */
    color: #333;
    padding: 20px;
    text-align: center;
}

.dialog--material {
  width: 80%;
}

.dialog-container--material p {
  width: 100%;
  text-align: left;
  /* padding-bottom: 40px; */
}

.dialog-container--material .movie-summary {
  padding-bottom: 40px;
  font-family: 'myFont';
}

.dialog-container--material img {
  width: 50%;
  text-align: center;
  display: block;
  margin: 0 auto;
  border: 5px solid #ffffff17;
  box-shadow: 0px 3px 30px 1px #00000047;
}


.dialog-container--material {
    border-radius: 2px;
    /* background: #444444e0; */
    color: #333;
    overflow: scroll!important;
    height: 400px!important;
}

.dialog-container {
    border-radius: 2px;
    /* background: red; */
    color: #333;
    overflow: scroll!important;
    height: 400px!important;
}

.movie-code {
  color: #c3b02d;
  background: #ffffff0f;
  width: 64px;
  height: 24px;
  padding: 4px;
  margin: 20px auto;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
}

.movie-detail-dialog-box h3 {
  margin: 10px auto 20px auto;
  font-size: 24px;
  font-weight: bolder;
  color: #ed4b4b;
}

.add-btn {
  width: 50%;
  height: 50px;
  background: #ed4b4b;
  color: #fff;
  font-size: 16px;
  position: fixed;
  top: calc(100% - 50px);
  border: none;
  outline: none;
}

.cancel-btn {
  width: 50%;
  height: 50px;
  background: #d6d6d6;
  color: #3a3939;
  font-size: 16px;
  position: fixed;
  top: calc(100% - 50px);
  border: none;
  outline: none;
}

.add-btn .fa-icon,.cancel-btn .fa-icon {
  margin-right: 10px;
  position: relative;
  display: inline-block;
  top: 3px;
}


.popover--material__content {
    background-color: #fbf9f9;
    border-radius: 5px;
    color: #1a1a1c;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12), 0 3px 1px -2px rgba(0, 0, 0, .2);
}

.popover--material__content > p {
  background: #d6d6d6;
  margin-top: 0px;
  height: 40px;
  padding-top: 15px;
  color: #333;
  font-size: 18px;
}

.popover--material__content > ul {
  padding: 0px;
  text-align: left;
}

.popover--material__content > ul > li {
  color: #555;
  padding: 8px;
  padding-left: 15px;
  border-bottom: 1px solid #ebebeb;
  

}

.popover--material__content button {
    width: 85px;
    margin: 0 auto;
    margin-bottom: 10px;
    height: 35px;
    color: #f29b9b;
    font-size: 12px;
    display: block;
    background: none;
    border: 1px solid #f29b9b;
    border-radius: 20px;
    font-weight: bold;
    text-transform: uppercase;
    outline: none;
}

</style>
