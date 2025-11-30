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
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: string
          selected_environment_id: string | null
          default_medical_centre_id: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: string
          selected_environment_id?: string | null
          default_medical_centre_id?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: string
          selected_environment_id?: string | null
          default_medical_centre_id?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      environments: {
        Row: {
          id: string
          name: string
          code: string
          description: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          code: string
          description?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string
          description?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      ebir_categories: {
        Row: {
          id: string
          environment_id: string
          name: string
          code: string
          description: string | null
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          environment_id: string
          name: string
          code: string
          description?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          environment_id?: string
          name?: string
          code?: string
          description?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      medical_centres: {
        Row: {
          id: string
          name: string
          code: string | null
          city: string | null
          country: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          code?: string | null
          city?: string | null
          country?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string | null
          city?: string | null
          country?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      procedures: {
        Row: {
          id: string
          user_id: string
          environment_id: string | null
          ebir_category_id: string | null
          medical_centre_id: string | null
          procedure_name: string
          procedure_date: string
          accession_number: string | null
          operator_role: string | null
          notes: string | null
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          environment_id?: string | null
          ebir_category_id?: string | null
          medical_centre_id?: string | null
          procedure_name: string
          procedure_date: string
          accession_number?: string | null
          operator_role?: string | null
          notes?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          environment_id?: string | null
          ebir_category_id?: string | null
          medical_centre_id?: string | null
          procedure_name?: string
          procedure_date?: string
          accession_number?: string | null
          operator_role?: string | null
          notes?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      learning_materials: {
        Row: {
          id: string
          user_id: string
          environment_id: string | null
          title: string
          description: string | null
          file_url: string
          file_type: string
          category: string | null
          tags: string[] | null
          is_linked_to_procedure: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          environment_id?: string | null
          title: string
          description?: string | null
          file_url: string
          file_type?: string
          category?: string | null
          tags?: string[] | null
          is_linked_to_procedure?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          environment_id?: string | null
          title?: string
          description?: string | null
          file_url?: string
          file_type?: string
          category?: string | null
          tags?: string[] | null
          is_linked_to_procedure?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      institutions: {
        Row: {
          id: string
          name: string
          license_type: string | null
          max_users: number
          is_active: boolean
          license_start_date: string | null
          license_end_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          license_type?: string | null
          max_users?: number
          is_active?: boolean
          license_start_date?: string | null
          license_end_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          license_type?: string | null
          max_users?: number
          is_active?: boolean
          license_start_date?: string | null
          license_end_date?: string | null
          created_at?: string
          updated_at?: string
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
