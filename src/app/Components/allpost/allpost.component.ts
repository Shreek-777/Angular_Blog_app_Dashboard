import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/Interfaces/post';
import { PostsService } from 'src/app/Services/posts.service';

@Component({
  selector: 'app-allpost',
  templateUrl: './allpost.component.html',
  styleUrls: ['./allpost.component.css']
})
export class AllpostComponent implements OnInit {

    postArray: Array<any>;
     constructor(private _postService: PostsService) { }

  ngOnInit(): void {
   
      this._postService.loadData().subscribe(data => {
    
          this.postArray=data;
      });
  }

  onDelete( id,postImgPath){
     this._postService.deleteImg(id,postImgPath)
  }


  onFeatured(id,value){
     const featuredData={
      isFeatured:value
     }
     this._postService.markFeatured(id,featuredData);
  }
}
