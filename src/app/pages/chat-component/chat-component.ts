import { Component, effect, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { Chat } from '../../supabase/chat';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ichat } from '../../interface/chat-response';
import { DatePipe } from '@angular/common';
import { DeleteModal } from '../../layout/delete-modal/delete-modal';

@Component({
  selector: 'app-chat-component',
  imports: [ReactiveFormsModule, DatePipe, DeleteModal],
  templateUrl: './chat-component.html',
  styleUrl: './chat-component.css',
})
export class ChatComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private chat = inject(Chat);
  private fb = inject(FormBuilder);
  chatForm!: FormGroup;
  chats = signal<Ichat[]>([]);

  constructor() {
    this.chatForm = this.fb.group({
      chat_message: ['', Validators.required],
    });

    effect(() => {
      this.onListChat();
    });
  }

  async logOut() {
    this.auth
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  onSubmit() {
    const formValue = this.chatForm.value.chat_message;
    console.log(formValue);
    this.chat
      .chatMessage(formValue)
      .then((res) => {
        console.log(res);
        this.chatForm.reset();
        this.onListChat();
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  onListChat() {
    this.chat
      .listChat()
      .then((res) => {
        console.log(res);
        
        this.chats.set(res || []);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  openDropdown(msg: Ichat) {
    this.chat.selectedMessage(msg);
  }

  getCurrentUser():string {
    return this.auth.currentUserId;
  }
}
