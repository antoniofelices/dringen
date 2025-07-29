export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      hpi: {
        Row: {
          additional_tests: string | null
          bfp: number | null
          certainty: string | null
          cie10: string | null
          date_of: string
          diagnosis: string | null
          eating: string | null
          examination: string | null
          fc: number | null
          feces: string | null
          fr: number | null
          gfp: number | null
          heat: number | null
          id: string
          imc: number | null
          mmp: number | null
          mood: string | null
          pad: number | null
          pas: number | null
          person_height: number | null
          person_weight: number | null
          profile_id: string
          sleep: string | null
          thirst: string | null
          treatment: string | null
          type_of: string | null
          urine: string | null
          waist: number | null
        }
        Insert: {
          additional_tests?: string | null
          bfp?: number | null
          certainty?: string | null
          cie10?: string | null
          date_of: string
          diagnosis?: string | null
          eating?: string | null
          examination?: string | null
          fc?: number | null
          feces?: string | null
          fr?: number | null
          gfp?: number | null
          heat?: number | null
          id?: string
          imc?: number | null
          mmp?: number | null
          mood?: string | null
          pad?: number | null
          pas?: number | null
          person_height?: number | null
          person_weight?: number | null
          profile_id: string
          sleep?: string | null
          thirst?: string | null
          treatment?: string | null
          type_of?: string | null
          urine?: string | null
          waist?: number | null
        }
        Update: {
          additional_tests?: string | null
          bfp?: number | null
          certainty?: string | null
          cie10?: string | null
          date_of?: string
          diagnosis?: string | null
          eating?: string | null
          examination?: string | null
          fc?: number | null
          feces?: string | null
          fr?: number | null
          gfp?: number | null
          heat?: number | null
          id?: string
          imc?: number | null
          mmp?: number | null
          mood?: string | null
          pad?: number | null
          pas?: number | null
          person_height?: number | null
          person_weight?: number | null
          profile_id?: string
          sleep?: string | null
          thirst?: string | null
          treatment?: string | null
          type_of?: string | null
          urine?: string | null
          waist?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_checkup_profile"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pfsh: {
        Row: {
          family_history: string | null
          id: string
          past_medical_history: string | null
          profile_id: string
          social_history: string | null
        }
        Insert: {
          family_history?: string | null
          id?: string
          past_medical_history?: string | null
          profile_id: string
          social_history?: string | null
        }
        Update: {
          family_history?: string | null
          id?: string
          past_medical_history?: string | null
          profile_id?: string
          social_history?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_profile"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          birthday: string | null
          birthplace: string | null
          dni: string
          email: string | null
          gender: string | null
          id: string
          occupation: string | null
          phone: string | null
          place_of_residence: string | null
          user_last_name: string
          user_name: string
        }
        Insert: {
          birthday?: string | null
          birthplace?: string | null
          dni: string
          email?: string | null
          gender?: string | null
          id?: string
          occupation?: string | null
          phone?: string | null
          place_of_residence?: string | null
          user_last_name: string
          user_name: string
        }
        Update: {
          birthday?: string | null
          birthplace?: string | null
          dni?: string
          email?: string | null
          gender?: string | null
          id?: string
          occupation?: string | null
          phone?: string | null
          place_of_residence?: string | null
          user_last_name?: string
          user_name?: string
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
