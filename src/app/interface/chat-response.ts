export interface Ichat {
  chat_text: string;
  created_at: string;
  edtable: boolean;
  id: string;
  sender: string;
  users: {
    avatar_url: string;
    full_name: string;
    id: string;
  };
}
