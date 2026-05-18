import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login-component/login-component';
import { ChatComponent } from './pages/chat-component/chat-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, ChatComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('chat-app');
}
