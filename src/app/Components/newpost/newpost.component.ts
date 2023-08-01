import { ReadVarExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/Interfaces/post';
import { CategoriesService } from 'src/app/Services/categories.service';
import { PostsService } from 'src/app/Services/posts.service';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {
  permalink:string;
  imgSrc:any= './assets/placeholder-image.jpg';
  selectedImage:any;
  categories:Array<any> = [];
  postForm:FormGroup;
  disables=true
  post:any;
  formStatus:string='Add';
  docId:string


  constructor( private _service: CategoriesService,
               private fb: FormBuilder,
               private  _postService: PostsService,
               private aroute:ActivatedRoute,
               ) 
  
  { 
     
    this.aroute.queryParams.subscribe(params =>{
      this.docId=params['id'];
       this._postService.loadOneData(params['id']).subscribe(post => {
           this.post = post;
          
           console.log(post);
          this.postForm=this.fb.group({
          title:[this.post.title,[Validators.required, Validators.minLength(10)]],
          permalink:[this.post.permalink, [Validators.required]],
          excerpt:[this.post.excerpt, [Validators.required,Validators.minLength(10)]],
          category:[`${this.post.category.categoryId}-${this.post.category.category}`, Validators.required, ],
          postimage:['', Validators.required,],
          content:[this.post.content, Validators.required],
        })
        this.imgSrc=this.post.postImgPath;
        this.formStatus='Update';
      });
    })


    this.postForm=this.fb.group({
      title:['',[Validators.required, Validators.minLength(10)]],
      permalink:['', [Validators.required]],
      excerpt:['', [Validators.required,Validators.minLength(10)]],
      category:['', Validators.required, ],
      postimage:['', Validators.required,],
      content:['', Validators.required],
    })
  }

  ngOnInit(): void {
     this._service.loadData().subscribe(val=>{
      this.categories=val;     
     })
  }
  
    get fc( ){
      return this.postForm.controls;
    }
    
    get title(){
      return this.postForm.get('title');
    }

    get permalin(){
      return this.postForm.get('permalink');
    }

    get excerpt(){
      return this.postForm.get('excerpt');
    }

    get category(){
      return this.postForm.get('category');
    }

    get postimage(){
      return this.postForm.controls['postimage']
    }

    get content(){
      return this.postForm.get('content');
    }








  onTitleChanged(event): void {
   const title=event.target.value;
   this.permalink= title.replace(/\s/g,'-');
  
     
  }

  showPreview(event){
      const reader= new FileReader();
      reader.onload=(e)=>{
          this.imgSrc =e.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage=event.target.files[0];
      
  }


  onSubmit(){
  //    console.log( this.postForm.value );

    let splited= this.postForm.value.category.split('-')
    // console.log( splited);

    const postData:Post={
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId:splited[0],
        category: splited[1],
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: '',
      createdAt: new Date(),
    }

    this._postService.uploadImage(this.selectedImage ,postData, this.formStatus,this.docId )
    this.postForm.reset();
    this.imgSrc='./assets/placeholder-image.jpg';
  }


}
