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
