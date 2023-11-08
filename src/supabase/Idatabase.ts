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
          name: string
          year: number
        }
        Insert: {
          id?: number
          name: string
          year: number
        }
        Update: {
          id?: number
          name?: string
          year?: number
        }
        Relationships: []
      }
      matches: {
        Row: {
          event_id: number
          id: number
          loser_id: number
          winner_id: number
        }
        Insert: {
          event_id: number
          id?: number
          loser_id: number
          winner_id: number
        }
        Update: {
          event_id?: number
          id?: number
          loser_id?: number
          winner_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "matches_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_loser_id_fkey"
            columns: ["loser_id"]
            referencedRelation: "players"
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
          name: string
          profile_picture_url: string | null
          twitch_url: string | null
        }
        Insert: {
          id?: number
          name: string
          profile_picture_url?: string | null
          twitch_url?: string | null
        }
        Update: {
          id?: number
          name?: string
          profile_picture_url?: string | null
          twitch_url?: string | null
        }
        Relationships: []
      }
      tetris_games: {
        Row: {
          cap: string
          final_score: number | null
          game_link: string | null
          game_number: number
          game_result: boolean
          id: number
          level_start: number
          lines_29: number | null
          match_id: number
          match_pairing: string
          no_m_lines: number | null
          no_m_score: number | null
          player_id: number
          playstyle: string
          post_score_19: number | null
          round: string
          score_29: number | null
          sps: boolean
          start_19l: number | null
          start_29l: number | null
          topout_type: string
          total_lines: number | null
          trans_19: number | null
          trans_29: number | null
        }
        Insert: {
          cap: string
          final_score?: number | null
          game_link?: string | null
          game_number: number
          game_result: boolean
          id?: number
          level_start: number
          lines_29?: number | null
          match_id: number
          match_pairing: string
          no_m_lines?: number | null
          no_m_score?: number | null
          player_id: number
          playstyle: string
          post_score_19?: number | null
          round: string
          score_29?: number | null
          sps: boolean
          start_19l?: number | null
          start_29l?: number | null
          topout_type: string
          total_lines?: number | null
          trans_19?: number | null
          trans_29?: number | null
        }
        Update: {
          cap?: string
          final_score?: number | null
          game_link?: string | null
          game_number?: number
          game_result?: boolean
          id?: number
          level_start?: number
          lines_29?: number | null
          match_id?: number
          match_pairing?: string
          no_m_lines?: number | null
          no_m_score?: number | null
          player_id?: number
          playstyle?: string
          post_score_19?: number | null
          round?: string
          score_29?: number | null
          sps?: boolean
          start_19l?: number | null
          start_29l?: number | null
          topout_type?: string
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

