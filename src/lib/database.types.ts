export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: number;
          name: string;
          website: string | null;
          memo: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          website?: string | null;
          memo?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          website?: string | null;
          memo?: string | null;
          created_at?: string;
        };
      };
      docs: {
        Row: {
          id: number;
          title: string;
          body: string;
          created_at: string;
          updated_at: string;
          user_id: number;
          last_updated_user_id: number;
        };
        Insert: {
          title: string;
          body: string;
          created_at?: string;
          updated_at?: string;
          user_id: number;
          last_updated_user_id: number;
        };
        Update: {
          title?: string;
          body?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: number;
          last_updated_user_id?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
