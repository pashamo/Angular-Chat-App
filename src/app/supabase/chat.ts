import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Chat {
  private supabase!: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseURL, environment.supabaseKey);
  }

  async chatMessage(text: string) {
    try {
      const { data, error } = await this.supabase.from('chat').insert({ "chat_text": text });

      if (error) {
        alert(error.message);
      }
      return data;
    } catch (error) {
      alert(error);
    }
    return false
  }
}
