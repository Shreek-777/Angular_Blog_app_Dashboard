import { isDelegatedFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { runInThisContext } from 'vm';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor( 
     private storage:AngularFireStorage,
     private afs:AngularFirestore,
     private router:Router
     
     ) { }

    uploadImage(selectedImage,postData, formStatus,id){
        const filePath=`postimage/${Date.now()}`;
        console.log(filePath);
    
        this.storage.upload(filePath,selectedImage).then(() => {
          console.log(" Upladed image Successfully");

          this.storage.ref(filePath).getDownloadURL().subscribe(url => {
            postData.postImgPath=url;
            // alert('Post successfully uploaded');

            if(formStatus === 'Update')
            {
              this.updateData(id ,postData);
            }else{
              this.saveData(postData);
            }
           
        });
  
        })
       
    
    }
    saveData(postData) {
      this.afs.collection('posts').add(postData).then( ref=>{
         alert('Post successfully uploaded');
        this.router.navigate(['/posts']);
      })
    }


    loadData(){
      return this.afs.collection('posts').snapshotChanges().pipe(
         map( action =>{
           return action.map(a=>{
             let data=a.payload.doc.data();
             const id=a.payload.doc.id;
             return {id, data};
           })
         })
       )
     }

     loadOneData(id: string){
      // returns observable
      return this.afs.collection('posts').doc(id).valueChanges();

     }
   

     updateData(id, postData){
         this.afs.doc(`posts/${id}`).update(postData).then(() => {
          alert('Post updated successfully');
          this.router.navigate(['/posts']);
         })
     }

     deleteImg(postImgPath , id){
      this.storage.storage.refFromURL(postImgPath).delete().then(() => {
          this.deleteData(id);
      });
     }

     deleteData(id){
         this.afs.doc(`posts/${id}`).delete().then(() => {
           alert('Post deleted successfully......');
         })
     }


     markFeatured(id,featuredData){
      this.afs.doc(`posts/${id}`).update(featuredData).then(() => {
       
      })
     }
}
