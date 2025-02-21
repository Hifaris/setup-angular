import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>(); //  สร้าง Subject เพื่อเก็บข้อมูลโพสต์ใหม่

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/post')
      .pipe(
        map((postData) => {
          return postData.posts.map((post: Post) => {
            return {
              title: post.title,
              content: post.content,
              _id: post._id,
            };
          });
        })
      )
      .subscribe((transformData) => {
        this.posts = transformData;
        this.postsUpdated.next([...this.posts]); // ส่งข้อมูลไปยัง subscribers
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable(); // แปลงเป็น Observable สำหรับการ subscribe
  }

  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; content: string }>(
      'http://localhost:3000/api/post/' + id
    );
  }

  addPost(title: string, content: string) {
    const post: Post = { _id: '', title: title, content: content };

    this.http
      .post<{ message: string; postId: string }>(
        'http://localhost:3000/api/post',
        post
      )
      .subscribe((response) => {
        const _id = response.postId;
        post._id = _id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  updatePost(id:string,title:string,content:string){
     const post: Post = {_id:id,title:title,content:content}
     this.http.put('http://localhost:3000/api/post/' + id,post)
     .subscribe(response=>{
       const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p._id === id);
       updatedPosts[oldPostIndex] = post;
       this.posts = updatedPosts;
       this.postsUpdated.next([...this.posts]);
     })
  }

  deletePost(postId: string) {
    this.http
      .delete<{ message: string }>('http://localhost:3000/api/post/' + postId)
      .subscribe((response) => {
        console.log(response.message);
        const updatedPosts = this.posts.filter((post) => post._id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}

//แต่ถ้าเราใช้ asObservable() → Component จะ แค่ subscribe ได้เท่านั้น (ไม่สามารถแก้ไขข้อมูลได้)
//เฉพาะ Service เท่านั้น ที่สามารถเรียก next() เพื่อกระจายข้อมูลได้ ส่วน Component จะทำหน้าที่แค่ รับฟัง (listen)
