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
      events: {
        Row: {
          id: number
          name: string | null
          year: number | null
        }
        Insert: {
          id?: number
          name?: string | null
          year?: number | null
        }
        Update: {
          id?: number
          name?: string | null
          year?: number | null
        }
        Relationships: []
      }
      matches: {
        Row: {
          event_id: number | null
          id: number
          winner_id: number | null
        }
        Insert: {
          event_id?: number | null
          id?: number
          winner_id?: number | null
        }
        Update: {
          event_id?: number | null
          id?: number
          winner_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_winner_id_fkey"
            columns: ["winner_id"]
            referencedRelation: "players"
            referencedColumns: ["id"]
          }
        ]
      }
      players: {
        Row: {
          id: number
          name: string | null
          profile_picture_url: string | null
          twitch_url: string | null
        }
        Insert: {
          id?: number
          name?: string | null
          profile_picture_url?: string | null
          twitch_url?: string | null
        }
        Update: {
          id?: number
          name?: string | null
          profile_picture_url?: string | null
          twitch_url?: string | null
        }
        Relationships: []
      }
      tetris_games: {
        Row: {
          cap: string | null
          final_score: number | null
          game_link: string | null
          game_number: number | null
          game_result: boolean | null
          id: number
          level_start: number | null
          lines_29: number | null
          match_id: number | null
          match_pairing: string | null
          no_m_lines: number | null
          no_m_score: number | null
          player_id: number | null
          playstyle: string | null
          post_score_19: number | null
          round: string | null
          score_29: number | null
          sps: boolean | null
          start_19l: number | null
          start_29l: number | null
          topout_type: string | null
          total_lines: number | null
          trans_19: number | null
          trans_29: number | null
        }
        Insert: {
          cap?: string | null
          final_score?: number | null
          game_link?: string | null
          game_number?: number | null
          game_result?: boolean | null
          id?: number
          level_start?: number | null
          lines_29?: number | null
          match_id?: number | null
          match_pairing?: string | null
          no_m_lines?: number | null
          no_m_score?: number | null
          player_id?: number | null
          playstyle?: string | null
          post_score_19?: number | null
          round?: string | null
          score_29?: number | null
          sps?: boolean | null
          start_19l?: number | null
          start_29l?: number | null
          topout_type?: string | null
          total_lines?: number | null
          trans_19?: number | null
          trans_29?: number | null
        }
        Update: {
          cap?: string | null
          final_score?: number | null
          game_link?: string | null
          game_number?: number | null
          game_result?: boolean | null
          id?: number
          level_start?: number | null
          lines_29?: number | null
          match_id?: number | null
          match_pairing?: string | null
          no_m_lines?: number | null
          no_m_score?: number | null
          player_id?: number | null
          playstyle?: string | null
          post_score_19?: number | null
          round?: string | null
          score_29?: number | null
          sps?: boolean | null
          start_19l?: number | null
          start_29l?: number | null
          topout_type?: string | null
          total_lines?: number | null
          trans_19?: number | null
          trans_29?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tetris_games_match_id_fkey"
            columns: ["match_id"]
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tetris_games_player_id_fkey"
            columns: ["player_id"]
            referencedRelation: "players"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
