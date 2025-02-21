import { Component, OnInit} from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostService } from "../post.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";


@Component({
    selector:'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls:['./post-create.component.css'],
    standalone:false
})
export class PostCreateComponent implements OnInit{
    enteredContent = '';
    enteredTitle = '';
    post:Post | undefined
    private mode = 'create';
    private postId: string | null = null;
    
    constructor(public postsService:PostService,public route: ActivatedRoute){}
    
    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
          if (paramMap.has('postId')) {
            this.mode = 'edit';
            this.postId = paramMap.get('postId');  // ค่าของ postId เป็น string หรือ null
            if (this.postId) {  // ตรวจสอบว่า postId เป็น string ก่อน
            this.postsService.getPost(this.postId).subscribe((postData)=>{
                this.post = {
                  _id: postData._id,
                  title: postData.title,
                  content: postData.content
                };
            });  // ส่ง postId ที่เป็น string ไป
            }
          } else {
            this.mode = 'create';
            this.postId = null;  // ในโหมดสร้างโพสต์ ไม่มี postId
            this.post = undefined;  // post ยังไม่มีข้อมูล
          }
        });
      }
      
    onAddPost(form:NgForm){

        if(form.invalid){
            return
        }
        if(this.mode === 'create'){
            this.postsService.addPost(form.value.title,form.value.content)
        }else{
            if(this.postId){
                
                this.postsService.updatePost(this.postId,form.value.title,form.value.content)
            }else{
                console.log('postId is missing');
            }
        }
      form.resetForm()
   }
}