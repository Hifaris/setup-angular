import { Component,Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
  standalone:false
})
export class PostListComponent implements OnInit,OnDestroy {

  posts:Post[]=[]
  private postsSub!:Subscription;
  // Constructor ทำงานตอนclass ถูกสร้าง
constructor( public postsService:PostService){}

// ngOnInit ทำงานถัดมาเพื่อดึงข้อมูล
ngOnInit(){
  this.postsService.getPosts();
  this.postsSub = this.postsService.getPostUpdateListener() // Subscribe รอรับข้อมูลใหม่
  .subscribe((posts:Post[])=>{
     this.posts = posts // อัปเดตโพสต์ใหม่ทันที
     console.log(posts)
  })
}

onDelete(postId:string){
  this.postsService.deletePost(postId)
}

ngOnDestroy(){
  this.postsSub.unsubscribe()  // ยกเลิกการ subscribe เมื่อ Component ถูกทำลาย เช่น เปลี่ยนหน้า ngif
}

}
