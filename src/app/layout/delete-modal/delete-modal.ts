import { Component, effect, inject, signal } from '@angular/core';
import { Chat } from '../../supabase/chat';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-modal',
  imports: [],
  templateUrl: './delete-modal.html',
  styleUrl: './delete-modal.css',
})
export class DeleteModal {
  private chat = inject(Chat);
  private router = inject(Router);
  dismiss = signal(false);

  constructor() {
    effect(() => {
      console.log(this.chat.savedMessage());
    });
  }

  deleteMessage() {
    const id = (this.chat.savedMessage() as { id: string }).id;
    this.chat
      .deleteMessage(id)
      .then(() => {
        let currentURL = this.router.url;
        this.dismiss.set(true);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentURL]);
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  }
}
