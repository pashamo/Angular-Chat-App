import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { Chat } from '../../supabase/chat';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-component',
  imports: [ReactiveFormsModule, ],
  templateUrl: './chat-component.html',
  styleUrl: './chat-component.css',
})
export class ChatComponent {
  private auth = inject(AuthService)
  private router = inject(Router);
  private chat = inject(Chat);
  private fb = inject(FormBuilder);
  chatForm!: FormGroup

  constructor() {
    this.chatForm = this.fb.group({
      chat_message: ['', Validators.required]
    })
  }

  async logOut() {
    this.auth.signOut().then(()=>{
      this.router.navigate(['/login'])
    }).catch((err) => {
      alert(err.message);
    })
  }

  async onSubmit() {
    const formValue = this.chatForm.value.chat_message;
    console.log(formValue);
    this.chat.chatMessage(formValue).then((res) => {
      console.log(res);
      this.chatForm.reset()
    }).catch((err) => {
      alert(err.message);
    });
  }
}
