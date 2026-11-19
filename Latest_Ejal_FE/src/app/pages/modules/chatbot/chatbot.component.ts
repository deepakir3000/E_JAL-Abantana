import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChatbotService } from '@app/services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ChatbotComponent implements OnInit {

  flag = false;
  id : any;
  fake : any;

  constructor(private service: ChatbotService) { }


  open(){
    console.log('open');
    this.flag = true;
  }

  close(){
    console.log('close');
    this.flag = false;
    }

   public data: any = [
    {text: 'Welcome dear', class: 'bot'}
   ]

  submit(){
    this.fake = "";
    this.id = (Math.floor(Math.random() * 1000));
    var check = ((document.getElementById("field") as HTMLInputElement).value);
    console.log(check, this.id);
    this.data.push({text: check, class: 'user'});

    this.service.sendChatBotMessage({id: 1, newMessage: check}).subscribe(res=>{
      console.log(res);
      this.data.push({text: res.message, class: 'bot'});

    })
    
  }
  ngOnInit() {
  }

}
