import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Category } from '../Models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  
  
  constructor( private afs:AngularFirestore) { }
  
  savaData(categoryData){     
       this.afs.collection('categories').add(categoryData).then(ref =>{
        console.log(ref);
        alert('Added category Successfully');
       }).catch(err =>{
        console.log(err);
       });
  }

      loadData(){
       return this.afs.collection('categories').snapshotChanges().pipe(
          map( action =>{
            return action.map(a=>{
              let data=a.payload.doc.data();
              const id=a.payload.doc.id;
              return {id, data};
            })
          })
        )
      }

     updateData(id, editedData){
      alert('Updated category Successfully');
       return  this.afs.collection('categories').doc(id).update(editedData).then(res =>{
        
       })
     } 

     deleteData(id){
        alert('Deleted category Successfully');
      this.afs.collection('categories').doc(id).delete().then(() =>{

      });
     }

}
