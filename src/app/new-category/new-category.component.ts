import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../Models/category';
import { CategoriesService } from '../Services/categories.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  categoryArray :Array<any>
  newForm!: FormGroup;
  formCategory:string;
  formStatus:string='Add';
  categoryID:string;

  catObj:Category;

  constructor(private fb: FormBuilder, 
    private afs:AngularFirestore, 
    private service:CategoriesService
    )
   { }
  

  ngOnInit(): void {
     this.onState();
     this.service.loadData().subscribe(data => {
      console.log(data);
      this.categoryArray = data;
     });
  }

  onState(){
     this.newForm= this.fb.group({
        categories:['' ,Validators.required],
     });
  }

  get cat(){
    // return this.newForm.get('categories');
    return this.newForm.controls['categories'];
  }
   
  onSubmit(){


        let categoryData : Category={
          category:this.newForm.value.categories,
        } 

    if(this.formStatus === 'Add'){
        this.service.savaData(categoryData);
        this.onReset();
      }else if(this.formStatus==='Update'){
       
          this.service.updateData(this.categoryID,categoryData);
          this.onReset();
          this.formStatus = 'Add';
      }



  }

   onReset(){
    this.newForm.reset();
   }

    onUpdate(category){
    
      this.catObj=category.data.category;
      this.newForm.controls['categories'].setValue(this.catObj);
      this.formStatus='Update';
      this.categoryID=category.id;
       
    }
     
onDelete(id){
  this.service.deleteData(id);
}


}
 