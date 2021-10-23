<template>
  <q-page class="q-pa-lg diagramBox">
    <q-item-label center-align
          class="headerText text-h4"
        >
          Map
        </q-item-label>
        <iframe src="https://drive.google.com/file/d/1es2cdl7XjNSx2X1gqzHPhf3qMhxXc3wf/preview" class="webpagesmall q-pa-lg bg-white" allow="autoplay"></iframe>
        <q-item-label center-align
          class="headerText text-h4"
        >
          Agenda
        </q-item-label>
        <iframe src="https://docs.google.com/document/d/e/2PACX-1vQqMd-Fp8HVRjAf846eiKYYJcYaoOkYwj7lFDLnhV1vTZb9cw7KRiQIzfsh33aLCxJVOGS73-CJInbI/pub?embedded=true" class="webpage q-pa-lg"></iframe>
    
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  
})
</script>
<style lang="scss">
.diagramBox{
  height: 2rem;
  padding: 10%;
}
.test{
  z-index: -1;
  height: auto;

}
.webpage{
   width: 100%; height: 100%; margin: 0; padding: 0
}
.webpagesmall{
   width: 100%; height: 60%; margin: 0; padding: 0
}
.headerText{
  text-align: center;
  margin: 8%;
}

</style>