<template>
  <q-page class="q-pa-lg bg-grey-3 column ">
    <q-item class="row align-items">
      <q-item-section >
           <h5 class="q-mt-none">Wall of Fame</h5>
        </q-item-section>
      <q-item-section
      
       side>
        <q-btn 
          class="q-mt-none"
          @click.stop="showPassword()"
          flat round  color="dark" icon="lock" text-color="dark" />
        </q-item-section>

        <q-item-section v-if="this.showPasswordBox == true" side>
          <q-input outlined type="password" v-model="passwordText" label="Password"/>
          
        </q-item-section>

         <q-item-section v-if="this.showPasswordBox == true" side>
          <q-btn 
          class="q-mt-none"
          @click.stop="checkPassword()"
          flat round  color="dark" icon="login" text-color="dark" />
          
        </q-item-section>
     
          
    </q-item>
    
     <div 
     v-if="this.adminMode == true"
     
     dense separator bordered class="addDonation q-pa-lg bg-white row">
       <q-item  class=" justify-center row">
         <q-item-section style="max-width: 10rem">
           <q-item-label class="text-center text-h6" style="max-width: 1rem" >Add Contribution</q-item-label>
        </q-item-section>
       <q-item-section style="max-width: 20rem">
         
      <q-input outlined v-model="text" label="Contributor Name"/>
       </q-item-section>
        <q-item-section>
           <q-input
      v-model.number="amount"
      type="number"
      outlined
      prefix="$"
      
      suffix=" USD"
      min = "1"
      label="Contribution Amount" 
      style="max-width: 20rem"
    />
       </q-item-section>
        <q-item-section side>
          
    <q-btn 
    @click="addNewTask()"
    push color="white" class="text-black" size="1.45rem" outlined icon="add" style="max-width: 3rem" />
       </q-item-section>
     </q-item>
     </div>

    
    <q-list
    class="bg-white"
    separator
    bordered
    >
     

      <q-item 
      v-for="(task, index) in tasks"
      :key="task.contributor"
      clickable
      @click="this.selectedIndex = index"
      :class="getLeader(index)"
      v-ripple>
       
        <q-item-section>
          <q-item-label class="text-subtitle1">{{index+1}}- {{task.contributor}}:</q-item-label>
          
          
        </q-item-section>
        
        <q-item-section
        
        >
          <q-btn 
          v-if="this.amount > 0"
          @click.stop="editTask(index)"
          flat  dense color="primary" icon="add"/>
          
          
        </q-item-section>
        <q-item-section
        v-if="this.selectedIndex == index && this.adminMode"
        side
        >
          <q-btn 
          @click.stop="deleteTask(index)"
          flat round  dense color="primary" icon="delete" text-color="negative"/>
          
          
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-h6 text-bold">$ {{getAmountFormatted(task.amount)}}</q-item-label>
        </q-item-section>
      </q-item>

    </q-list>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import db from 'src/boot/firebase'
import { collection, query, limit, orderBy, onSnapshot, addDoc, doc, setDoc, deleteDoc, getDoc} from "firebase/firestore";



export default {
  data(){
    return {
      
      text: null,
      alertText: null,
      adminMode: false,
      amount: null,
      selectedIndex: null,
      passwordText: "",
      correctPassword: "-1",
      showPasswordBox: false,
      tasks: [
      ]
    }
  },
  methods:{
    getLeader(pos){
    return {
            'top': pos == 0,
            'second': pos == 1,
            'third': pos == 2
            }
    },
    addNewTask(){
      let newTask = {
        amount: this.amount,
        contributor: this.text
      }
      const docRef = addDoc(collection(db, "contributions"), {
         amount: this.amount,
        contributor: this.text
      });

      this.amount = ''
      this.text = ''
    },
    getAmountFormatted(int){
      const str = (int).toLocaleString()
      return str;
    },
    showPassword(){
      const docRef = doc(db, "data", "info");
      const docSnap =  getDoc(doc(db, "data", "info")).then(docSnap => {
      if (docSnap.exists()) {
        this.correctPassword = docSnap.data().password;
      } else {
        console.log("No such document!");
      }
})


      this.showPasswordBox = !this.showPasswordBox;
    },
    checkPassword(){
      if(this.passwordText == this.correctPassword && this.correctPassword != -1){
        this.adminMode = true,
        this.showPasswordBox = false
      }
    },
    deleteTask(index){
      let newTask = {
        id: this.tasks.at(index).id
      }
      console.log(newTask.id)
      deleteDoc(doc(db, "contributions", ""+newTask.id));
    },editTask(index){
      let newTask = {
        amount: this.amount + this.tasks.at(index).amount,
        contributor: this.tasks.at(index).contributor
      }
      this.tasks.at(index).amount = newTask.amount
      setDoc(doc(db, "contributions",  this.tasks.at(index).id), newTask);
    }
  },
  mounted(){
    

const q = query(collection(db, "contributions"),orderBy("amount"));
const unsubscribe = onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    let dataChange = change.doc.data();
    let newTask = {
        amount: dataChange.amount,
        contributor: dataChange.contributor,
        id: null
      }
    if (change.type === "added") {
        console.log("New donation: ", change.doc.id);
        newTask.id = change.doc.id
        this.tasks.unshift(newTask)
        this.tasks.sort((a, b) => (a.amount > b.amount) ? -1 : 1)
    }
    if (change.type === "modified") {
        console.log("Modified donation: ", dataChange);
        
        this.tasks.sort((a, b) => (a.amount > b.amount) ? -1 : 1)
    }
    if (change.type === "removed") {
        let idToDelete = change.doc.id;
      var index = this.tasks.findIndex(tasks=>tasks.id === idToDelete)
      this.tasks.splice(index,1)
    }
  });
});


  }
  
}
</script>

<style lang="scss">
.top{
   //text-decoration: underline;
    //color: rgb(238, 184, 35);
}
.second{
    //color: rgb(137, 152, 155);
}
.third{
    //color: rgb(168, 119, 27);
}
.addDonation{
  margin: 10px;
}
</style>
