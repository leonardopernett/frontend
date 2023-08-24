import { Injectable } from "@angular/core";

declare var webkitSpeechRecognition:any

@Injectable({
  providedIn: "root"
})
export class VoiceService {

  transcript:string[] = []
  isStarted:boolean = false
  recognition = new webkitSpeechRecognition()
  text= ""
  
  init(){ 
    
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
    this.recognition.lang = 'es-ES';
  
    this.recognition.addEventListener('result',(event:any) => {
       const transcript = Array.from(event.results)
         .map( (result:any) => result[0])
         .map( (result) => result.transcript)
          this.transcript = [...transcript]
          this.text  = this.transcript.map( (item) => item).join('')
          console.log( this.text)
    })

  }

  start(){
    this.recognition.start()
    this.isStarted = true;
    console.log('Speech recognition started');
  }

  stop(){
    this.recognition.stop()
    this.isStarted = false;
    console.log('Speech recognition stop');
  }

}