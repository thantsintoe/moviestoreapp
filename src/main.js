// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
// const fs = require('fs')

import storeLike from './store.js'
import CustomToolbar from './partials/CustomToolbar.vue'
import AppNavigator from './AppNavigator.vue'

// Webpack CSS import
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
import VueOnsen from 'vue-onsenui' // This already imports 'onsenui'

// or import all icons if you don't care about bundle size
import 'vue-awesome/icons'

Vue.use(Vuex)
Vue.use(VueOnsen)

/* Register component with one of 2 methods */
import Icon from 'vue-awesome/components/Icon'

// globally (in your main .js file)
Vue.component('icon', Icon)

Vue.component('custom-toolbar', CustomToolbar) // Common toolbar

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(AppNavigator),
  store: new Vuex.Store(storeLike),
  beforeCreate () {
    // Shortcut for Material Design
    Vue.prototype.md = this.$ons.platform.isAndroid()

    // Set iPhoneX flag based on URL
    if (window.location.search.match(/iphonex/i)) {
      document.documentElement.setAttribute('onsflag-iphonex-portrait', '')
      document.documentElement.setAttribute('onsflag-iphonex-landscape', '')
    }
  }
})
