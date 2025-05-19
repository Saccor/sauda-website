export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: number
          created_at: string
          platform: string
          post_url: string
          media_url: string
          caption: string
          artist: string
        }
        Insert: {
          id?: number
          created_at?: string
          platform: string
          post_url: string
          media_url: string
          caption: string
          artist: string
        }
        Update: {
          id?: number
          created_at?: string
          platform?: string
          post_url?: string
          media_url?: string
          caption?: string
          artist?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 