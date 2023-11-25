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
          opponent_id: number | null
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
          opponent_id?: number | null
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
          opponent_id?: number | null
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
            foreignKeyName: "tetris_games_opponent_id_fkey"
            columns: ["opponent_id"]
            referencedRelation: "players"
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
      calculate_combined_median: {
        Args: Record<PropertyKey, never>
        Returns: {
          player_fms_id: number
          player_fms_name: string
          profile_picture_url: string
          combined_median: number
        }[]
      }
      get_player_v_player_results: {
        Args: {
          player1_id: number
          player2_id: number
        }
        Returns: {
          match_id: number
          game_number: number
          round_max: string
          event_name: string
          player1_style: string
          player1_topout: string
          player1_score: number
          player1_result: string
          player2_result: string
          player2_score: number
          player2_topout: string
          player2_style: string
        }[]
      }
      lifetime_stats:
        | {
            Args: Record<PropertyKey, never>
            Returns: {
              id: number
              name: string
              profile_picture_url: string
              twitch_url: string
              games_won: number
              maxout_games: number
              total_games: number
              winning_percentage: number
            }[]
          }
        | {
            Args: {
              event_year_param: number
            }
            Returns: {
              id: number
              name: string
              profile_picture_url: string
              twitch_url: string
              games_won: number
              total_games: number
              maxout_games: number
              winning_percentage: number
            }[]
          }
      year_stats: {
        Args: {
          event_year_param: number
        }
        Returns: {
          id: number
          name: string
          profile_picture_url: string
          twitch_url: string
          games_won: number
          maxout_games: number
          total_games: number
          winning_percentage: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

