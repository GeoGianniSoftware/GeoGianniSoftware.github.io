<template>
  <q-page class="q-pa-lg column">
    <q-item-label center-align
          class="headerText text-h4"
        >
          Event Sponsors
        </q-item-label>
        <div class="webpage">
    <q-carousel
      animated
      v-model="slide"
      arrows
      navigation
      infinite
      text-color="dark"
      class="q-pa-lg  diagramBox"
    >
      <q-carousel-slide :name="1" img-src="statics/break.png" />
      <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
      <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
    </q-carousel>
  </div>
    
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue'

export default defineComponent({
   setup () {
    return {
      slide: ref(1),
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'
    }
  }
})
</script>
<style lang="scss">
.diagramBox{
  height: 500px;
  max-height: 1600px;
  background-position: 50%;
}
.test{
  z-index: -1;
  height: auto;

}
.webpage{
  width: auto;
}
.headerText{
  text-align: center;
  margin: 8%;
}

</style>