<template>
<q-btn label="Alert" color="primary" @click="alert = true" />

    <q-dialog v-model="alert">
      <q-card class="alertCard">
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-h6 text-body1">
          {{this.alertText}}
        </q-card-section>
        <q-card-section class="q-pt-none text-subtitle2 alertLine ">
          {{this.alertTime}}
        </q-card-section>

        <q-card-actions align="center" class="q-ma-md bg-grey">
          <q-btn flat label="OK" color="primary" @click="setLastAlert" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          text-color="dark"
          @click="toggleLeftDrawer"
        />


      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md bottomMargin">
        <div class="q-px-lg q-pt-xl q-mb-md"></div>

      </div>
      <div>
        <q-img
      src="statics/fapia.jpg"
      class="header-image absolute-top center" />
      <div class="headerBox">
      <q-img
      :src="currentBannerURL"
      class="banner absolute-bottom" />
      <div class="absolute-bottom centerAlign sponsorBanner">Sponsored Content</div>
      </div>
      </div>
      
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Pages
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-item-label
          header
        >
          External Links
        </q-item-label>
        <q-item
          clickable
          @click="openLink(0)"
          exact
          tag="a"
          target="blank"
        >
          <q-item-section
            avatar
          >
            <q-icon name="public" />
          </q-item-section>

          <q-item-section>
            <q-item-label>FAPIA Website</q-item-label>
            
          </q-item-section>
        </q-item>

        <q-item
          clickable
          @click="openLink(1)"
          exact
          tag="a"
          target="blank"
        >
          <q-item-section
            avatar
          >
            <q-icon name="manage_accounts" />
          </q-item-section>

          <q-item-section>
            <q-item-label>FAPIA Members</q-item-label>
            
          </q-item-section>
        </q-item>

        <q-item
          clickable
          @click="openLink(2)"
          exact
          tag="a"
          target="blank"
          class="absolute-bottom"
        >
          <q-item-section
            avatar
          >
            <q-icon   class="text-red" name="bolt" />
          </q-item-section>

          <q-item-section>
            <q-item-label style="color:black; text-decoration: underline;">Powered by GeoGianni.com</q-item-label>
            
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Information',
    icon: 'info',
    to: '/'
  },
  {
    title: 'Wall of Fame',
    icon: 'format_list_numbered',
    to: '/donations'
  }//,
  //{
  //  title: 'Event Sponsors',
   // icon: 'volunteer_activism',
   // to: '/sponsors'
  //}
];

import { defineComponent, ref } from 'vue'
import { date, LocalStorage } from 'quasar'
import { getStorage, getDownloadURL  } from "firebase/storage";


import db from 'src/boot/firebase'
import { collection, query, onSnapshot, limit, getDoc, orderBy, doc} from "firebase/firestore";
import { openURL } from 'quasar'


export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const currentBannerURL = ref('https://firebasestorage.googleapis.com/v0/b/fapia-live.appspot.com/o/bannerImages%2Fbanner1.jpg?alt=media&token=1347c49a-d3f9-4eef-b302-0ccba37cdbe5')

    return {
       alert: ref(null),
       done: false,
       lastAlertID: 0,
       alertText: "",
       alertTime: null,
      essentialLinks: linksList,
      currentAlertID: null,
      currentBannerURL,
      bannerCount: -1,
      
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  methods:{
  openLink(index){
    if(index == 0)
      openURL('https://www.fapia.net/') 
    if(index == 1)
      openURL('https://fapia.memberclicks.net/login#/login') 
      if(index == 2)
      openURL('https://GeoGianni.com') 
  },
  setLastAlert: function (event){
    
    LocalStorage.set("lastAlertID", this.currentAlertID)
    this.lastAlertID = this.currentAlertID
    
          
    this.alert = false;
    console.log("DONE!" + LocalStorage.getItem("lastAlertID"));
  },
  
  getCurrentBannerImage(index){
    
    if(this.bannerCount == -1){
      const docRef = doc(db, "data", "info");
      const docSnap =  getDoc(doc(db, "data", "info")).then(docSnap => {
      if (docSnap.exists()) {
        console.log("BC: "+docSnap.data().bannerCount);
        this.bannerCount = docSnap.data().bannerCount;
      } else {
        console.log("No such document!");
      }
    });
    }

      const dRef = doc(db, "bannerUrls", "banner0");
      const dSnap =  getDoc(doc(db, "bannerUrls", "banner"+index)).then(dSnap => {
      if (dSnap.exists()) {
        this.currentBannerURL = dSnap.data().URL;
      } else {
        console.log("No such document!");
      }
      })
  
  },
  getNewestAlert(){
      
    console.log("Start:" + LocalStorage.getItem("lastAlertID"));
        
      if( LocalStorage.getItem("lastAlertID") != null){

       this.lastAlertID = LocalStorage.getItem("lastAlertID")
      }
      console.log("WHOA" + this.lastAlertID + this.currentAlertID);
        if(this.lastAlertID != this.currentAlertID || this.lastAlertID == null ){
          this.alert = true;
          console.log("test");
        }
    }
  },
  created() {
    setInterval(() => this.getCurrentBannerImage(Math.floor(Math.random() * 2)), 10000);
  },
  mounted(){
    this.setLastAlert();
const a = query(collection(db, "alerts"), orderBy("time"));
const unsub = onSnapshot(a, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    let dataChange = change.doc.data();
    let newAlert = {
        alertText: dataChange.alertText,
        id: null,
        time: dataChange.time
      }
    if (change.type === "added") {
        console.log("New Alert: ", change.doc.id);
        console.log("New Alert: ", this.lastAlertID + " " + this.alert);
        this.getNewestAlert();
        newAlert.id = change.doc.id
        this.alertText = newAlert.alertText;
        this.currentAlertID = newAlert.id;
       
        this.alertTime = newAlert.time.toDate().toDateString() + "\n" + "at " +newAlert.time.toDate().toLocaleTimeString()+"";
        console.log("tast: " + this.alertText);
        if(change.doc.id != this.lastAlertID)
        this.alert = true;
    }
    if (change.type === "modified") {
        console.log("Modified Alert: ", dataChange);
        this.getNewestAlert();
    }
    if (change.type === "removed") {
        console.log("Removed Alert: ", dataChange);
    }
  });
});

  }
})
</script>
<style lang="scss">
.bottomMargin{
  padding-top: 5%;
  padding-bottom: 15%;
}
.sponsorBanner{
}
 .header-image{
   height: 60%;
   width:  100%;
   z-index: -1;
 }
 .banner{
   margin-top: 5%;
   z-index: -1;
   height: 30%;
      width:  100%;
  margin-bottom: 1.5rem;
  
 }+
 .centerAlign{
   text-align: center;
 }
 .alertLine{
   white-space:pre-line;
 }
 .alertCard{
   padding: 1rem;
 }
</style>
