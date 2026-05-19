import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { Ichat } from '../interface/chat-response';

@Injectable({
  providedIn: 'root',
})
export class Chat {
  private supabase!: SupabaseClient;
  savedMessage = signal({});

  constructor() {
    this.supabase = createClient(environment.supabaseURL, environment.supabaseKey);
  }

  async chatMessage(text: string) {
    try {
      const { data, error } = await this.supabase.from('chat').insert({ chat_text: text });

      if (error) {
        alert(error.message);
      }
      return data;
    } catch (error) {
      alert(error);
    }
    return false;
  }

  async listChat() {
    try {
      const { data, error } = await this.supabase.from('chat').select('*,users(*)');

      if (error) {
        alert(error.message);
      }

      return data;
    } catch (error) {
      throw error;
    }
    return false;
  }

  selectedMessage(msg: Ichat) {
    this.savedMessage.set(msg)
  }

  async deleteMessage(id: string) {
    const {data, error} = await this.supabase.from('chat').delete().eq('id',id)

    return data
  }
}