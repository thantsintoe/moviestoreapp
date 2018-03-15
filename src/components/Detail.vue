
<template>

  <v-ons-page id="allmovies">
    <!-- <custom-toolbar :title="Hi" :action="toggleMenu"></custom-toolbar> -->
    <div class="left">
        <v-ons-back-button>Back</v-ons-back-button>
    </div>

    <h1>hello</h1>
 
  </v-ons-page>

</template>


<script>

import translate from '../translater/translate'

export default {
  data() {
    return {
    }
  },
  props: ['movie'],
  computed: {
  
  },
  methods: {
    
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
    border-radius: 5px;
    border: none;
    left: 50%;
    transform: translateX(-50%);
    margin: 20px auto;
    padding-left: 20px;
    position: fixed;
    top: 50px;
    box-sizing: border-box;
    z-index: 200;
    
  }
  
  .movie-card {
    position: relative;
    width: 50%;
    color: #fff;
    /* border: 1px solid #e2e2e2; */
    box-sizing: border-box;
    margin-bottom: 30px;
    
  }

  .movie-card > img {
    display: block;
    /* height: 220px; */
    width: 70%;
    margin: 0 auto;
  }

  .name-year-container {
    position: relative;
    width: 100%;
    height: 40px;
  }

  .name-year-container .release-year {
    position: absolute;
    z-index: 90;
    top: -45px;
    left: 30px;
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


</style>