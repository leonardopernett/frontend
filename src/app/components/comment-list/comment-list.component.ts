import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommentsApiService, comment } from "../../api/comments-api.service";
import { take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { googleAnalytics } from "../../services/googleAnalytics.service";
import { StateService } from "../../services/state.service";
import {ActivatedRoute} from "@angular/router";
import Swal from 'sweetalert2'
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {


  @Input()
  articleId: string;

  @Input()
  comentarios: comment[] = [];

  @ViewChild('input', { static:false })
  input: ElementRef;
  public isEmojiPickerVisible: boolean;

  public comments: comment[] = []
  public emojiMode = false;
  public commentOnReply = '';



  constructor(
    private commentsApi: CommentsApiService,
    private route:ActivatedRoute,
    private translate:TranslateService
  ) {  }

  ngOnInit() {
   
    this.obtenercomentarios()
    
  }

  public obtenercomentarios(){

    this.comments=[]

    this.commentsApi.getComments(this.articleId, { from: 0, size: 10 }).pipe(
      take(1),
      tap(comments => {
        console.log(comments)
        this.comments = comments
        this.comentarios = [...this.comments]
      
      })
    ).subscribe()
  }

  sendComment(){
    this.commentsApi.postComment({ text :this.input.nativeElement.value },this.articleId).subscribe(data=>{
      this.obtenercomentarios()
      this.input.nativeElement.value = '';
    })
  }

  iconoSeleccionado(event){
    if((this.input.nativeElement.value + event.emoji.native).length < 250 ){
      this.input.nativeElement.value = this.input.nativeElement.value.slice(0,this.input.nativeElement.selectionStart) + event.emoji.native + this.input.nativeElement.value.slice(this.input.nativeElement.selectionStart)
    }
  }


  public localStrings = {
    search: 'Buscar',
    emojilist: 'Lista de emojis',
    notfound: 'Ningun emoji encontrado',
    clear: 'Limpiar',
    categories: {
      search: 'Resultados',
      recent: 'Mas usados',
      people: 'Sonrisas y personas',
      nature: 'Animales y naturaleza',
      foods: 'Comidas y bebidas',
      activity: 'Actividades',
      places: 'Viaje y lugares',
      objects: 'Objetos',
      symbols: 'Simbolos',
      flags: 'Banderas',
      custom: 'Custom',
    },
    skintones: {
      1: 'Default Skin Tone',
      2: 'Light Skin Tone',
      3: 'Medium-Light Skin Tone',
      4: 'Medium Skin Tone',
      5: 'Medium-Dark Skin Tone',
      6: 'Dark Skin Tone',
    },
  }

  borrarcomentarios(){


      Swal.fire({
        title: this.translate.instant('Estas Seguro?'),
        text: this.translate.instant('Quieres Borrar todos  los comentario?'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText:  this.translate.instant('Si'),
      }).then((result) => {
        if (result.isConfirmed) {
          this.commentsApi.deleteComments(this.route.snapshot.params.id).subscribe(
            ()=>{
            this.obtenercomentarios()
            },
            error=>console.log(error) 
          )
        
        }
      })

  }


}