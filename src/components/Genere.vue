<template id="genere">
  <v-ons-page>
    <custom-toolbar title="News" :action="toggleMenu"></custom-toolbar>
    <p style="text-align: center">
      Some news here.
    </p>
  </v-ons-page>
</template>

<script>
import customToolbar from '../partials/CustomToolbar.vue'
export default {
  props: ['toggleMenu'],
  components: { customToolbar }
};
</script>

<style>

</style>