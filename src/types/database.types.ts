export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      dn_appointment: {
        Row: {
          appointment_date: string
          created_at: string | null
          health_consumer_id: string
          hpi_id: string | null
          id: string
          notes: string | null
          physician_id: string
          status: Database["public"]["Enums"]["dn_appointment_status"] | null
          updated_at: string | null
        }
        Insert: {
          appointment_date: string
          created_at?: string | null
          health_consumer_id: string
          hpi_id?: string | null
          id?: string
          notes?: string | null
          physician_id: string
          status?: Database["public"]["Enums"]["dn_appointment_status"] | null
          updated_at?: string | null
        }
        Update: {
          appointment_date?: string
          created_at?: string | null
          health_consumer_id?: string
          hpi_id?: string | null
          id?: string
          notes?: string | null
          physician_id?: string
          status?: Database["public"]["Enums"]["dn_appointment_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dn_appointment_health_consumer_id_fkey"
            columns: ["health_consumer_id"]
            isOneToOne: false
            referencedRelation: "dn_health_consumer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dn_appointment_hpi_id_fkey"
            columns: ["hpi_id"]
            isOneToOne: false
            referencedRelation: "dn_hpi"
            referencedColumns: ["id"]
          },
        ]
      }
      dn_health_consumer: {
        Row: {
          birthday: string | null
          birthplace: string | null
          created_at: string | null
          dni: string
          email: string | null
          gender: string | null
          id: string
          occupation: string | null
          phone: string | null
          place_of_residence: string | null
          updated_at: string | null
          user_last_name: string
          user_name: string
        }
        Insert: {
          birthday?: string | null
          birthplace?: string | null
          created_at?: string | null
          dni: string
          email?: string | null
          gender?: string | null
          id?: string
          occupation?: string | null
          phone?: string | null
          place_of_residence?: string | null
          updated_at?: string | null
          user_last_name: string
          user_name: string
        }
        Update: {
          birthday?: string | null
          birthplace?: string | null
          created_at?: string | null
          dni?: string
          email?: string | null
          gender?: string | null
          id?: string
          occupation?: string | null
          phone?: string | null
          place_of_residence?: string | null
          updated_at?: string | null
          user_last_name?: string
          user_name?: string
        }
        Relationships: []
      }
      dn_hpi: {
        Row: {
          additional_tests: string | null
          bfp: number | null
          created_at: string | null
          eating: string | null
          examination: string | null
          fc: number | null
          feces: string | null
          fr: number | null
          gfp: number | null
          health_consumer_id: string
          heat: number | null
          id: string
          imc: number | null
          mmp: number | null
          mood: string | null
          oximetry: number | null
          pad: number | null
          pas: number | null
          person_height: number | null
          person_weight: number | null
          sleep: string | null
          test: string | null
          thirst: string | null
          treatment: string | null
          type_of: string | null
          updated_at: string | null
          urine: string | null
          waist: number | null
        }
        Insert: {
          additional_tests?: string | null
          bfp?: number | null
          created_at?: string | null
          eating?: string | null
          examination?: string | null
          fc?: number | null
          feces?: string | null
          fr?: number | null
          gfp?: number | null
          health_consumer_id: string
          heat?: number | null
          id?: string
          imc?: number | null
          mmp?: number | null
          mood?: string | null
          oximetry?: number | null
          pad?: number | null
          pas?: number | null
          person_height?: number | null
          person_weight?: number | null
          sleep?: string | null
          test?: string | null
          thirst?: string | null
          treatment?: string | null
          type_of?: string | null
          updated_at?: string | null
          urine?: string | null
          waist?: number | null
        }
        Update: {
          additional_tests?: string | null
          bfp?: number | null
          created_at?: string | null
          eating?: string | null
          examination?: string | null
          fc?: number | null
          feces?: string | null
          fr?: number | null
          gfp?: number | null
          health_consumer_id?: string
          heat?: number | null
          id?: string
          imc?: number | null
          mmp?: number | null
          mood?: string | null
          oximetry?: number | null
          pad?: number | null
          pas?: number | null
          person_height?: number | null
          person_weight?: number | null
          sleep?: string | null
          test?: string | null
          thirst?: string | null
          treatment?: string | null
          type_of?: string | null
          updated_at?: string | null
          urine?: string | null
          waist?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_checkup_profile"
            columns: ["health_consumer_id"]
            isOneToOne: false
            referencedRelation: "dn_health_consumer"
            referencedColumns: ["id"]
          },
        ]
      }
      dn_hpi_diagnosis: {
        Row: {
          certainty:
            | Database["public"]["Enums"]["dn_diagnosis_certainty"]
            | null
          cie10: string | null
          created_at: string | null
          diagnosis: string | null
          hpi_id: string
          id: string
          updated_at: string | null
        }
        Insert: {
          certainty?:
            | Database["public"]["Enums"]["dn_diagnosis_certainty"]
            | null
          cie10?: string | null
          created_at?: string | null
          diagnosis?: string | null
          hpi_id: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          certainty?:
            | Database["public"]["Enums"]["dn_diagnosis_certainty"]
            | null
          cie10?: string | null
          created_at?: string | null
          diagnosis?: string | null
          hpi_id?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_checkup_hpi"
            columns: ["hpi_id"]
            isOneToOne: false
            referencedRelation: "dn_hpi"
            referencedColumns: ["id"]
          },
        ]
      }
      dn_pfsh: {
        Row: {
          created_at: string | null
          family_history: string | null
          health_consumer_id: string
          id: string
          past_medical_history: string | null
          social_history: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          family_history?: string | null
          health_consumer_id: string
          id?: string
          past_medical_history?: string | null
          social_history?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          family_history?: string | null
          health_consumer_id?: string
          id?: string
          past_medical_history?: string | null
          social_history?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_health_consumer"
            columns: ["health_consumer_id"]
            isOneToOne: false
            referencedRelation: "dn_health_consumer"
            referencedColumns: ["id"]
          },
        ]
      }
      dn_users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          dni: string
          id: string
          is_active: boolean | null
          role: Database["public"]["Enums"]["dn_user_role"] | null
          updated_at: string | null
          user_last_name: string
          user_name: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          dni: string
          id: string
          is_active?: boolean | null
          role?: Database["public"]["Enums"]["dn_user_role"] | null
          updated_at?: string | null
          user_last_name: string
          user_name: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          dni?: string
          id?: string
          is_active?: boolean | null
          role?: Database["public"]["Enums"]["dn_user_role"] | null
          updated_at?: string | null
          user_last_name?: string
          user_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      dn_users_all_data: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          dni: string | null
          email: string | null
          id: string | null
          is_active: boolean | null
          role: Database["public"]["Enums"]["dn_user_role"] | null
          updated_at: string | null
          user_last_name: string | null
          user_name: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_physician: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      medical_office: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      reset_dev_tables: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      appointment_status: "scheduled" | "completed" | "cancelled"
      diagnosis_certainty: "confirmed" | "probable" | "suspected"
      dn_appointment_status: "scheduled" | "completed" | "cancelled"
      dn_diagnosis_certainty: "confirmed" | "probable" | "suspected"
      dn_user_role: "user" | "medical_office" | "physician" | "admin"
      user_role: "user" | "medical_office" | "physician" | "admin"
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
    Enums: {
      appointment_status: ["scheduled", "completed", "cancelled"],
      diagnosis_certainty: ["confirmed", "probable", "suspected"],
      dn_appointment_status: ["scheduled", "completed", "cancelled"],
      dn_diagnosis_certainty: ["confirmed", "probable", "suspected"],
      dn_user_role: ["user", "medical_office", "physician", "admin"],
      user_role: ["user", "medical_office", "physician", "admin"],
    },
  },
} as const
