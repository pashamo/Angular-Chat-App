import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';
// import { ChatComponent } from './pages/chat-component/chat-component';
// import { LoginComponent } from './pages/login-component/login-component';

export const routes: Routes = [
    {
        path: 'chat',
        // component: ChatComponent
        loadComponent: () => import('./pages/chat-component/chat-component').then((com)=>com.ChatComponent),
        canActivate: [authGuard],
    },
    {
        path: 'login',
        // component: LoginComponent
        loadComponent: () => import('./pages/login-component/login-component').then((com)=>com.LoginComponent),
    },
    {
        path: '',
        // component: LoginComponent
        loadComponent: () => import('./pages/login-component/login-component').then((com)=>com.LoginComponent),
    }
];
