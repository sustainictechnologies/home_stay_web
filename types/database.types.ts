export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          full_name: string
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          avatar_url?: string | null
        }
      }
      categories: {
        Row: {
          id: number
          name: string
          slug: string
          icon: string | null
          description: string | null
        }
        Insert: {
          id?: number
          name: string
          slug: string
          icon?: string | null
          description?: string | null
        }
        Update: {
          name?: string
          slug?: string
          icon?: string | null
          description?: string | null
        }
      }
      homestays: {
        Row: {
          id: string
          title: string
          slug: string
          location_district: string
          village_name: string
          host_name: string
          contact_phone: string
          calling_window: string
          languages_spoken: string[]
          youtube_video_id: string | null
          latitude: number
          longitude: number
          is_verified: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          location_district: string
          village_name: string
          host_name: string
          contact_phone: string
          calling_window?: string
          languages_spoken?: string[]
          youtube_video_id?: string | null
          latitude: number
          longitude: number
          is_verified?: boolean
          created_at?: string
        }
        Update: {
          title?: string
          slug?: string
          location_district?: string
          village_name?: string
          host_name?: string
          contact_phone?: string
          calling_window?: string
          languages_spoken?: string[]
          youtube_video_id?: string | null
          latitude?: number
          longitude?: number
          is_verified?: boolean
        }
      }
      homestay_blocks: {
        Row: {
          id: string
          homestay_id: string
          block_type: string
          sort_order: number
          content_data: Json
        }
        Insert: {
          id?: string
          homestay_id: string
          block_type: string
          sort_order: number
          content_data?: Json
        }
        Update: {
          block_type?: string
          sort_order?: number
          content_data?: Json
        }
      }
      homestay_categories: {
        Row: {
          homestay_id: string
          category_id: number
        }
        Insert: {
          homestay_id: string
          category_id: number
        }
        Update: {
          homestay_id?: string
          category_id?: number
        }
      }
      reviews: {
        Row: {
          id: string
          homestay_id: string
          user_id: string
          rating: number
          comment: string
          created_at: string
        }
        Insert: {
          id?: string
          homestay_id: string
          user_id: string
          rating: number
          comment: string
          created_at?: string
        }
        Update: {
          rating?: number
          comment?: string
        }
      }
    }
  }
}