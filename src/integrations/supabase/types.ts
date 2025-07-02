export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      apps: {
        Row: {
          created_at: string
          description: string | null
          icon_name: string | null
          id: string
          is_free: boolean
          name: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          is_free?: boolean
          name: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          is_free?: boolean
          name?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      availability_rules: {
        Row: {
          created_at: string | null
          day_of_week: number
          end_time: string
          id: string
          school_id: string
          service_id: string | null
          start_time: string
          updated_at: string | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          created_at?: string | null
          day_of_week: number
          end_time: string
          id?: string
          school_id: string
          service_id?: string | null
          start_time: string
          updated_at?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          created_at?: string | null
          day_of_week?: number
          end_time?: string
          id?: string
          school_id?: string
          service_id?: string | null
          start_time?: string
          updated_at?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "availability_rules_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "availability_rules_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          contractor_email: string | null
          contractor_name: string | null
          contractor_phone: string | null
          created_at: string | null
          created_by_user_id: string | null
          end_time: string
          google_calendar_event_id: string | null
          id: string
          notes: string | null
          school_id: string
          service_id: string
          start_time: string
          status: Database["public"]["Enums"]["booking_status"]
          updated_at: string | null
        }
        Insert: {
          contractor_email?: string | null
          contractor_name?: string | null
          contractor_phone?: string | null
          created_at?: string | null
          created_by_user_id?: string | null
          end_time: string
          google_calendar_event_id?: string | null
          id?: string
          notes?: string | null
          school_id: string
          service_id: string
          start_time: string
          status?: Database["public"]["Enums"]["booking_status"]
          updated_at?: string | null
        }
        Update: {
          contractor_email?: string | null
          contractor_name?: string | null
          contractor_phone?: string | null
          created_at?: string | null
          created_by_user_id?: string | null
          end_time?: string
          google_calendar_event_id?: string | null
          id?: string
          notes?: string | null
          school_id?: string
          service_id?: string
          start_time?: string
          status?: Database["public"]["Enums"]["booking_status"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_categories: {
        Row: {
          created_at: string
          description: string | null
          icon_name: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      deal_ratings: {
        Row: {
          created_at: string
          deal_id: string | null
          helpful_count: number
          id: string
          rating: number
          review: string | null
          school_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          deal_id?: string | null
          helpful_count?: number
          id?: string
          rating: number
          review?: string | null
          school_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          deal_id?: string | null
          helpful_count?: number
          id?: string
          rating?: number
          review?: string | null
          school_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deal_ratings_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deal_ratings_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      deals: {
        Row: {
          created_at: string
          deal_code: string | null
          deal_price: number
          deal_url: string | null
          description: string | null
          featured: boolean
          id: string
          minimum_quantity: number | null
          original_price: number | null
          product_id: string | null
          savings_amount: number | null
          savings_percentage: number | null
          school_id: string | null
          status: string
          submitted_by_user_id: string | null
          supplier_id: string | null
          title: string
          updated_at: string
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          created_at?: string
          deal_code?: string | null
          deal_price: number
          deal_url?: string | null
          description?: string | null
          featured?: boolean
          id?: string
          minimum_quantity?: number | null
          original_price?: number | null
          product_id?: string | null
          savings_amount?: number | null
          savings_percentage?: number | null
          school_id?: string | null
          status?: string
          submitted_by_user_id?: string | null
          supplier_id?: string | null
          title: string
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          created_at?: string
          deal_code?: string | null
          deal_price?: number
          deal_url?: string | null
          description?: string | null
          featured?: boolean
          id?: string
          minimum_quantity?: number | null
          original_price?: number | null
          product_id?: string | null
          savings_amount?: number | null
          savings_percentage?: number | null
          school_id?: string | null
          status?: string
          submitted_by_user_id?: string | null
          supplier_id?: string | null
          title?: string
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deals_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          confirmed_by: Json | null
          created_at: string | null
          description: string | null
          file_url: string | null
          id: string
          revision: number | null
          school_id: string | null
          title: string | null
          trust_id: string | null
          type: string | null
          uploader_id: string | null
        }
        Insert: {
          confirmed_by?: Json | null
          created_at?: string | null
          description?: string | null
          file_url?: string | null
          id?: string
          revision?: number | null
          school_id?: string | null
          title?: string | null
          trust_id?: string | null
          type?: string | null
          uploader_id?: string | null
        }
        Update: {
          confirmed_by?: Json | null
          created_at?: string | null
          description?: string | null
          file_url?: string | null
          id?: string
          revision?: number | null
          school_id?: string | null
          title?: string | null
          trust_id?: string | null
          type?: string | null
          uploader_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_trust_id_fkey"
            columns: ["trust_id"]
            isOneToOne: false
            referencedRelation: "trusts"
            referencedColumns: ["id"]
          },
        ]
      }
      estates_plan: {
        Row: {
          actual_cost: number | null
          area: string | null
          details: string | null
          documentation_url: string | null
          element: string | null
          estimated_cost: number | null
          funding_source: string | null
          id: string
          inserted_at: string | null
          issue: string | null
          month_scheduled: string | null
          project: string | null
          project_start_date: string | null
          risk_impact: number | null
          risk_likelihood: number | null
          risk_mitigation: string | null
          risk_score: number | null
          school_id: string | null
          school_year: string | null
          status: string | null
        }
        Insert: {
          actual_cost?: number | null
          area?: string | null
          details?: string | null
          documentation_url?: string | null
          element?: string | null
          estimated_cost?: number | null
          funding_source?: string | null
          id?: string
          inserted_at?: string | null
          issue?: string | null
          month_scheduled?: string | null
          project?: string | null
          project_start_date?: string | null
          risk_impact?: number | null
          risk_likelihood?: number | null
          risk_mitigation?: string | null
          risk_score?: number | null
          school_id?: string | null
          school_year?: string | null
          status?: string | null
        }
        Update: {
          actual_cost?: number | null
          area?: string | null
          details?: string | null
          documentation_url?: string | null
          element?: string | null
          estimated_cost?: number | null
          funding_source?: string | null
          id?: string
          inserted_at?: string | null
          issue?: string | null
          month_scheduled?: string | null
          project?: string | null
          project_start_date?: string | null
          risk_impact?: number | null
          risk_likelihood?: number | null
          risk_mitigation?: string | null
          risk_score?: number | null
          school_id?: string | null
          school_year?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "estates_plan_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      gias_import_staging: {
        Row: {
          address3: string | null
          admissions_policy_code: string | null
          admissions_policy_name: string | null
          boarders_code: string | null
          boarders_name: string | null
          bso_inspectorate_name: string | null
          census_date: string | null
          close_date: string | null
          county_name: string | null
          created_at: string | null
          date_of_last_inspection_visit: string | null
          diocese_code: string | null
          diocese_name: string | null
          establishment_name: string | null
          establishment_number: string | null
          establishment_status_code: string | null
          establishment_status_name: string | null
          establishment_type_group_code: string | null
          establishment_type_group_name: string | null
          fe_he_identifier: string | null
          federation_flag_name: string | null
          federations_code: string | null
          federations_name: string | null
          further_education_type_name: string | null
          gender_code: string | null
          gender_name: string | null
          head_first_name: string | null
          head_last_name: string | null
          head_preferred_job_title: string | null
          head_title_name: string | null
          id: string
          inspectorate_report: string | null
          la_code: string | null
          la_name: string | null
          last_changed_date: string | null
          locality: string | null
          next_inspection_visit: string | null
          number_of_boys: string | null
          number_of_girls: string | null
          number_of_pupils: string | null
          nursery_provision_name: string | null
          official_sixth_form_code: string | null
          official_sixth_form_name: string | null
          open_date: string | null
          percentage_fsm: string | null
          phase_of_education_code: string | null
          phase_of_education_name: string | null
          postcode: string | null
          processed: boolean | null
          raw_data: string | null
          reason_establishment_closed_code: string | null
          reason_establishment_closed_name: string | null
          reason_establishment_opened_code: string | null
          reason_establishment_opened_name: string | null
          religious_character_code: string | null
          religious_character_name: string | null
          religious_ethos_name: string | null
          school_capacity: string | null
          school_sponsor_flag_name: string | null
          school_sponsors_name: string | null
          school_website: string | null
          special_classes_code: string | null
          special_classes_name: string | null
          statutory_high_age: string | null
          statutory_low_age: string | null
          street: string | null
          telephone_num: string | null
          town: string | null
          trust_school_flag_code: string | null
          trust_school_flag_name: string | null
          trusts_code: string | null
          trusts_name: string | null
          type_of_establishment_code: string | null
          type_of_establishment_name: string | null
          ukprn: string | null
          urn: number | null
        }
        Insert: {
          address3?: string | null
          admissions_policy_code?: string | null
          admissions_policy_name?: string | null
          boarders_code?: string | null
          boarders_name?: string | null
          bso_inspectorate_name?: string | null
          census_date?: string | null
          close_date?: string | null
          county_name?: string | null
          created_at?: string | null
          date_of_last_inspection_visit?: string | null
          diocese_code?: string | null
          diocese_name?: string | null
          establishment_name?: string | null
          establishment_number?: string | null
          establishment_status_code?: string | null
          establishment_status_name?: string | null
          establishment_type_group_code?: string | null
          establishment_type_group_name?: string | null
          fe_he_identifier?: string | null
          federation_flag_name?: string | null
          federations_code?: string | null
          federations_name?: string | null
          further_education_type_name?: string | null
          gender_code?: string | null
          gender_name?: string | null
          head_first_name?: string | null
          head_last_name?: string | null
          head_preferred_job_title?: string | null
          head_title_name?: string | null
          id?: string
          inspectorate_report?: string | null
          la_code?: string | null
          la_name?: string | null
          last_changed_date?: string | null
          locality?: string | null
          next_inspection_visit?: string | null
          number_of_boys?: string | null
          number_of_girls?: string | null
          number_of_pupils?: string | null
          nursery_provision_name?: string | null
          official_sixth_form_code?: string | null
          official_sixth_form_name?: string | null
          open_date?: string | null
          percentage_fsm?: string | null
          phase_of_education_code?: string | null
          phase_of_education_name?: string | null
          postcode?: string | null
          processed?: boolean | null
          raw_data?: string | null
          reason_establishment_closed_code?: string | null
          reason_establishment_closed_name?: string | null
          reason_establishment_opened_code?: string | null
          reason_establishment_opened_name?: string | null
          religious_character_code?: string | null
          religious_character_name?: string | null
          religious_ethos_name?: string | null
          school_capacity?: string | null
          school_sponsor_flag_name?: string | null
          school_sponsors_name?: string | null
          school_website?: string | null
          special_classes_code?: string | null
          special_classes_name?: string | null
          statutory_high_age?: string | null
          statutory_low_age?: string | null
          street?: string | null
          telephone_num?: string | null
          town?: string | null
          trust_school_flag_code?: string | null
          trust_school_flag_name?: string | null
          trusts_code?: string | null
          trusts_name?: string | null
          type_of_establishment_code?: string | null
          type_of_establishment_name?: string | null
          ukprn?: string | null
          urn?: number | null
        }
        Update: {
          address3?: string | null
          admissions_policy_code?: string | null
          admissions_policy_name?: string | null
          boarders_code?: string | null
          boarders_name?: string | null
          bso_inspectorate_name?: string | null
          census_date?: string | null
          close_date?: string | null
          county_name?: string | null
          created_at?: string | null
          date_of_last_inspection_visit?: string | null
          diocese_code?: string | null
          diocese_name?: string | null
          establishment_name?: string | null
          establishment_number?: string | null
          establishment_status_code?: string | null
          establishment_status_name?: string | null
          establishment_type_group_code?: string | null
          establishment_type_group_name?: string | null
          fe_he_identifier?: string | null
          federation_flag_name?: string | null
          federations_code?: string | null
          federations_name?: string | null
          further_education_type_name?: string | null
          gender_code?: string | null
          gender_name?: string | null
          head_first_name?: string | null
          head_last_name?: string | null
          head_preferred_job_title?: string | null
          head_title_name?: string | null
          id?: string
          inspectorate_report?: string | null
          la_code?: string | null
          la_name?: string | null
          last_changed_date?: string | null
          locality?: string | null
          next_inspection_visit?: string | null
          number_of_boys?: string | null
          number_of_girls?: string | null
          number_of_pupils?: string | null
          nursery_provision_name?: string | null
          official_sixth_form_code?: string | null
          official_sixth_form_name?: string | null
          open_date?: string | null
          percentage_fsm?: string | null
          phase_of_education_code?: string | null
          phase_of_education_name?: string | null
          postcode?: string | null
          processed?: boolean | null
          raw_data?: string | null
          reason_establishment_closed_code?: string | null
          reason_establishment_closed_name?: string | null
          reason_establishment_opened_code?: string | null
          reason_establishment_opened_name?: string | null
          religious_character_code?: string | null
          religious_character_name?: string | null
          religious_ethos_name?: string | null
          school_capacity?: string | null
          school_sponsor_flag_name?: string | null
          school_sponsors_name?: string | null
          school_website?: string | null
          special_classes_code?: string | null
          special_classes_name?: string | null
          statutory_high_age?: string | null
          statutory_low_age?: string | null
          street?: string | null
          telephone_num?: string | null
          town?: string | null
          trust_school_flag_code?: string | null
          trust_school_flag_name?: string | null
          trusts_code?: string | null
          trusts_name?: string | null
          type_of_establishment_code?: string | null
          type_of_establishment_name?: string | null
          ukprn?: string | null
          urn?: number | null
        }
        Relationships: []
      }
      incidents: {
        Row: {
          attachment_paths: string[] | null
          category: string | null
          created_at: string
          date_reported: string
          date_resolved: string | null
          id: number
          incident_description: string | null
          incident_title: string
          linked_maintenance_request_id: number | null
          linked_project_id: number | null
          location_details: string | null
          priority: string | null
          reported_by_user_id: string | null
          resolution_notes: string | null
          school_id: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          attachment_paths?: string[] | null
          category?: string | null
          created_at?: string
          date_reported?: string
          date_resolved?: string | null
          id?: number
          incident_description?: string | null
          incident_title: string
          linked_maintenance_request_id?: number | null
          linked_project_id?: number | null
          location_details?: string | null
          priority?: string | null
          reported_by_user_id?: string | null
          resolution_notes?: string | null
          school_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          attachment_paths?: string[] | null
          category?: string | null
          created_at?: string
          date_reported?: string
          date_resolved?: string | null
          id?: number
          incident_description?: string | null
          incident_title?: string
          linked_maintenance_request_id?: number | null
          linked_project_id?: number | null
          location_details?: string | null
          priority?: string | null
          reported_by_user_id?: string | null
          resolution_notes?: string | null
          school_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_linked_maintenance_request"
            columns: ["linked_maintenance_request_id"]
            isOneToOne: false
            referencedRelation: "maintenance_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_school"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_request_comments: {
        Row: {
          comment: string
          created_at: string
          id: number
          maintenance_request_id: number
          user_id: string
          user_name: string | null
        }
        Insert: {
          comment: string
          created_at?: string
          id?: number
          maintenance_request_id: number
          user_id: string
          user_name?: string | null
        }
        Update: {
          comment?: string
          created_at?: string
          id?: number
          maintenance_request_id?: number
          user_id?: string
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_maintenance_request"
            columns: ["maintenance_request_id"]
            isOneToOne: false
            referencedRelation: "maintenance_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_requests: {
        Row: {
          assigned_to_team: string | null
          assigned_to_user_id: string | null
          attachment_paths: string[] | null
          category: string | null
          created_at: string
          date_completed: string | null
          description: string | null
          due_date: string | null
          id: number
          linked_project_id: number | null
          location_details: string | null
          priority: string | null
          request_title: string
          requested_by_user_id: string | null
          risk_impact: number | null
          risk_likelihood: number | null
          school_id: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          assigned_to_team?: string | null
          assigned_to_user_id?: string | null
          attachment_paths?: string[] | null
          category?: string | null
          created_at?: string
          date_completed?: string | null
          description?: string | null
          due_date?: string | null
          id?: number
          linked_project_id?: number | null
          location_details?: string | null
          priority?: string | null
          request_title: string
          requested_by_user_id?: string | null
          risk_impact?: number | null
          risk_likelihood?: number | null
          school_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          assigned_to_team?: string | null
          assigned_to_user_id?: string | null
          attachment_paths?: string[] | null
          category?: string | null
          created_at?: string
          date_completed?: string | null
          description?: string | null
          due_date?: string | null
          id?: number
          linked_project_id?: number | null
          location_details?: string | null
          priority?: string | null
          request_title?: string
          requested_by_user_id?: string | null
          risk_impact?: number | null
          risk_likelihood?: number | null
          school_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_school"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          created_at: string | null
          description: string | null
          icon_url: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category_id: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          supplier_id: string | null
          typical_price: number | null
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          supplier_id?: string | null
          typical_price?: number | null
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          supplier_id?: string | null
          typical_price?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "deal_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_migration_status: string | null
          avatar_url: string | null
          current_school_id: string | null
          department: string | null
          full_name: string | null
          id: string
          job_title: string | null
          onboarding_completed: boolean
          phone: string | null
          role: string | null
          trust_id: string | null
          updated_at: string | null
        }
        Insert: {
          account_migration_status?: string | null
          avatar_url?: string | null
          current_school_id?: string | null
          department?: string | null
          full_name?: string | null
          id: string
          job_title?: string | null
          onboarding_completed?: boolean
          phone?: string | null
          role?: string | null
          trust_id?: string | null
          updated_at?: string | null
        }
        Update: {
          account_migration_status?: string | null
          avatar_url?: string | null
          current_school_id?: string | null
          department?: string | null
          full_name?: string | null
          id?: string
          job_title?: string | null
          onboarding_completed?: boolean
          phone?: string | null
          role?: string | null
          trust_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_current_school_id_fkey"
            columns: ["current_school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_trust_id_fkey"
            columns: ["trust_id"]
            isOneToOne: false
            referencedRelation: "trusts"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          age_years: string
          asset_id: string | null
          budget_year: string
          condition: string
          created_at: string | null
          description: string
          estimated_cost: number
          funding_source: string
          id: string
          initial_risk_impact: number | null
          initial_risk_likelihood: number | null
          location: string
          priority: string
          project_lead: string
          project_title: string
          remaining_life_years: string
          remedial_works: string
          risk_impact: number
          risk_level: string | null
          risk_likelihood: number
          risk_mitigation: string
          risk_override_occurred: boolean | null
          risk_score: number | null
          room_number: string
          school_id: string | null
          section_type: string
          specific_area: string
          status: string | null
          submitted_by_user_id: string | null
          submitter_email: string
          updated_at: string | null
        }
        Insert: {
          age_years: string
          asset_id?: string | null
          budget_year: string
          condition: string
          created_at?: string | null
          description: string
          estimated_cost: number
          funding_source: string
          id?: string
          initial_risk_impact?: number | null
          initial_risk_likelihood?: number | null
          location: string
          priority: string
          project_lead: string
          project_title: string
          remaining_life_years: string
          remedial_works: string
          risk_impact: number
          risk_level?: string | null
          risk_likelihood: number
          risk_mitigation: string
          risk_override_occurred?: boolean | null
          risk_score?: number | null
          room_number: string
          school_id?: string | null
          section_type: string
          specific_area: string
          status?: string | null
          submitted_by_user_id?: string | null
          submitter_email: string
          updated_at?: string | null
        }
        Update: {
          age_years?: string
          asset_id?: string | null
          budget_year?: string
          condition?: string
          created_at?: string | null
          description?: string
          estimated_cost?: number
          funding_source?: string
          id?: string
          initial_risk_impact?: number | null
          initial_risk_likelihood?: number | null
          location?: string
          priority?: string
          project_lead?: string
          project_title?: string
          remaining_life_years?: string
          remedial_works?: string
          risk_impact?: number
          risk_level?: string | null
          risk_likelihood?: number
          risk_mitigation?: string
          risk_override_occurred?: boolean | null
          risk_score?: number | null
          room_number?: string
          school_id?: string | null
          section_type?: string
          specific_area?: string
          status?: string | null
          submitted_by_user_id?: string | null
          submitter_email?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      risk_audit_log: {
        Row: {
          changed_at: string | null
          changed_by_user_id: string
          id: string
          new_risk_level: string | null
          new_risk_score: number | null
          old_risk_level: string | null
          old_risk_score: number | null
          reason: string | null
          ticket_id: number
          ticket_type: string
        }
        Insert: {
          changed_at?: string | null
          changed_by_user_id: string
          id?: string
          new_risk_level?: string | null
          new_risk_score?: number | null
          old_risk_level?: string | null
          old_risk_score?: number | null
          reason?: string | null
          ticket_id: number
          ticket_type: string
        }
        Update: {
          changed_at?: string | null
          changed_by_user_id?: string
          id?: string
          new_risk_level?: string | null
          new_risk_score?: number | null
          old_risk_level?: string | null
          old_risk_score?: number | null
          reason?: string | null
          ticket_id?: number
          ticket_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "risk_audit_log_changed_by_user_id_fkey"
            columns: ["changed_by_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      safety_actions: {
        Row: {
          action_description: string | null
          action_title: string
          assigned_to_role: string | null
          assigned_to_user_id: string | null
          checked_by_user_id: string | null
          completion_date: string | null
          completion_notes: string | null
          compliance_check_date: string | null
          compliance_check_notes: string | null
          compliance_check_status: string | null
          created_at: string
          due_date: string | null
          evidence_attachment_paths: string[] | null
          id: number
          linked_incident_id: number | null
          linked_maintenance_request_id: number | null
          linked_project_id: number | null
          priority: string | null
          requires_compliance_check: boolean | null
          school_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          action_description?: string | null
          action_title: string
          assigned_to_role?: string | null
          assigned_to_user_id?: string | null
          checked_by_user_id?: string | null
          completion_date?: string | null
          completion_notes?: string | null
          compliance_check_date?: string | null
          compliance_check_notes?: string | null
          compliance_check_status?: string | null
          created_at?: string
          due_date?: string | null
          evidence_attachment_paths?: string[] | null
          id?: number
          linked_incident_id?: number | null
          linked_maintenance_request_id?: number | null
          linked_project_id?: number | null
          priority?: string | null
          requires_compliance_check?: boolean | null
          school_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          action_description?: string | null
          action_title?: string
          assigned_to_role?: string | null
          assigned_to_user_id?: string | null
          checked_by_user_id?: string | null
          completion_date?: string | null
          completion_notes?: string | null
          compliance_check_date?: string | null
          compliance_check_notes?: string | null
          compliance_check_status?: string | null
          created_at?: string
          due_date?: string | null
          evidence_attachment_paths?: string[] | null
          id?: number
          linked_incident_id?: number | null
          linked_maintenance_request_id?: number | null
          linked_project_id?: number | null
          priority?: string | null
          requires_compliance_check?: boolean | null
          school_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_linked_incident"
            columns: ["linked_incident_id"]
            isOneToOne: false
            referencedRelation: "incidents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_linked_maintenance_request"
            columns: ["linked_maintenance_request_id"]
            isOneToOne: false
            referencedRelation: "maintenance_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_school"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      school_app_subscriptions: {
        Row: {
          app_id: string
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean
          school_id: string
          subscription_type: string
          updated_at: string
        }
        Insert: {
          app_id: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          school_id: string
          subscription_type?: string
          updated_at?: string
        }
        Update: {
          app_id?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          school_id?: string
          subscription_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "school_app_subscriptions_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "school_app_subscriptions_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      school_kb_entries: {
        Row: {
          access_level: string
          content: string
          created_at: string
          embedding: string | null
          id: string
          school_id: string
          topic: string | null
          updated_at: string
        }
        Insert: {
          access_level?: string
          content: string
          created_at?: string
          embedding?: string | null
          id?: string
          school_id: string
          topic?: string | null
          updated_at?: string
        }
        Update: {
          access_level?: string
          content?: string
          created_at?: string
          embedding?: string | null
          id?: string
          school_id?: string
          topic?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      schools: {
        Row: {
          accreditation_expiry_date: string | null
          address_county: string | null
          address_locality: string | null
          address_postcode: string | null
          address_street: string | null
          address_town: string | null
          address3: string | null
          administrative_ward_code: string | null
          administrative_ward_name: string | null
          admissions_policy_code: string | null
          admissions_policy_name: string | null
          boarders_code: string | null
          boarders_name: string | null
          capacity: number | null
          census_date: string | null
          ch_number: string | null
          close_date: string | null
          country_name: string | null
          created_at: string
          date_of_last_inspection: string | null
          diocese_code: string | null
          diocese_name: string | null
          district: string | null
          district_administrative_code: string | null
          district_administrative_name: string | null
          easting: number | null
          establishment_accredited_code: string | null
          establishment_accredited_name: string | null
          establishment_number: string | null
          establishment_status_code: string | null
          establishment_type: string | null
          establishment_type_code: string | null
          establishment_type_group: string | null
          establishment_type_group_code: string | null
          estates_email: string | null
          estates_google_managed: boolean | null
          fe_he_identifier: string | null
          federation_code: string | null
          federation_flag: string | null
          federation_name: string | null
          fsm: number | null
          fsm_percentage: number | null
          further_education_type: string | null
          gender: string | null
          gender_code: string | null
          giasUrn: string | null
          google_domain_suffix: string | null
          gor_code: string | null
          gor_name: string | null
          gov_region: string | null
          gss_la_code: string | null
          has_nursery: boolean | null
          has_sixth_form: boolean | null
          head_first_name: string | null
          head_last_name: string | null
          head_preferred_job_title: string | null
          headteacher_name: string | null
          headteacher_title: string | null
          id: string
          inspectorate_name: string | null
          inspectorate_report: string | null
          is_test_account: boolean
          la_code: string | null
          la_name: string | null
          laestab: string | null
          last_changed_date: string | null
          last_dfe_sync: string | null
          local_authority: string | null
          locality: string | null
          logo_url: string | null
          lsoa_code: string | null
          msoa_code: string | null
          name: string
          next_inspection_visit: string | null
          northing: number | null
          number_of_boys: number | null
          number_of_girls: number | null
          nursery_provision: string | null
          official_sixth_form_code: string | null
          official_sixth_form_name: string | null
          open_date: string | null
          parliamentary_constituency: string | null
          parliamentary_constituency_code: string | null
          parliamentary_constituency_name: string | null
          phase: string | null
          phase_code: string | null
          previous_establishment_number: string | null
          previous_la_code: string | null
          previous_la_name: string | null
          qab_name: string | null
          qab_name_code: string | null
          qab_report: string | null
          raw_import_data: Json | null
          reason_establishment_closed_code: string | null
          reason_establishment_closed_name: string | null
          reason_establishment_opened_code: string | null
          reason_establishment_opened_name: string | null
          religious_character: string | null
          religious_character_code: string | null
          religious_ethos: string | null
          resourced_provision_capacity: number | null
          resourced_provision_on_roll: number | null
          school_sponsor_flag: string | null
          school_sponsors: string | null
          site_name: string | null
          special_classes_code: string | null
          special_classes_name: string | null
          status: string | null
          statutory_high_age: number | null
          statutory_low_age: number | null
          telephone: string | null
          total_pupils: number | null
          trust_code: string | null
          trust_id: string | null
          trust_joined_date: string | null
          trust_name: string | null
          trust_school_flag_code: string | null
          trust_school_flag_name: string | null
          ukprn: string | null
          uprn: string | null
          urban_rural_code: string | null
          urban_rural_desc: string | null
          urban_rural_name: string | null
          urn: number
          ward: string | null
          website: string | null
        }
        Insert: {
          accreditation_expiry_date?: string | null
          address_county?: string | null
          address_locality?: string | null
          address_postcode?: string | null
          address_street?: string | null
          address_town?: string | null
          address3?: string | null
          administrative_ward_code?: string | null
          administrative_ward_name?: string | null
          admissions_policy_code?: string | null
          admissions_policy_name?: string | null
          boarders_code?: string | null
          boarders_name?: string | null
          capacity?: number | null
          census_date?: string | null
          ch_number?: string | null
          close_date?: string | null
          country_name?: string | null
          created_at?: string
          date_of_last_inspection?: string | null
          diocese_code?: string | null
          diocese_name?: string | null
          district?: string | null
          district_administrative_code?: string | null
          district_administrative_name?: string | null
          easting?: number | null
          establishment_accredited_code?: string | null
          establishment_accredited_name?: string | null
          establishment_number?: string | null
          establishment_status_code?: string | null
          establishment_type?: string | null
          establishment_type_code?: string | null
          establishment_type_group?: string | null
          establishment_type_group_code?: string | null
          estates_email?: string | null
          estates_google_managed?: boolean | null
          fe_he_identifier?: string | null
          federation_code?: string | null
          federation_flag?: string | null
          federation_name?: string | null
          fsm?: number | null
          fsm_percentage?: number | null
          further_education_type?: string | null
          gender?: string | null
          gender_code?: string | null
          giasUrn?: string | null
          google_domain_suffix?: string | null
          gor_code?: string | null
          gor_name?: string | null
          gov_region?: string | null
          gss_la_code?: string | null
          has_nursery?: boolean | null
          has_sixth_form?: boolean | null
          head_first_name?: string | null
          head_last_name?: string | null
          head_preferred_job_title?: string | null
          headteacher_name?: string | null
          headteacher_title?: string | null
          id?: string
          inspectorate_name?: string | null
          inspectorate_report?: string | null
          is_test_account?: boolean
          la_code?: string | null
          la_name?: string | null
          laestab?: string | null
          last_changed_date?: string | null
          last_dfe_sync?: string | null
          local_authority?: string | null
          locality?: string | null
          logo_url?: string | null
          lsoa_code?: string | null
          msoa_code?: string | null
          name: string
          next_inspection_visit?: string | null
          northing?: number | null
          number_of_boys?: number | null
          number_of_girls?: number | null
          nursery_provision?: string | null
          official_sixth_form_code?: string | null
          official_sixth_form_name?: string | null
          open_date?: string | null
          parliamentary_constituency?: string | null
          parliamentary_constituency_code?: string | null
          parliamentary_constituency_name?: string | null
          phase?: string | null
          phase_code?: string | null
          previous_establishment_number?: string | null
          previous_la_code?: string | null
          previous_la_name?: string | null
          qab_name?: string | null
          qab_name_code?: string | null
          qab_report?: string | null
          raw_import_data?: Json | null
          reason_establishment_closed_code?: string | null
          reason_establishment_closed_name?: string | null
          reason_establishment_opened_code?: string | null
          reason_establishment_opened_name?: string | null
          religious_character?: string | null
          religious_character_code?: string | null
          religious_ethos?: string | null
          resourced_provision_capacity?: number | null
          resourced_provision_on_roll?: number | null
          school_sponsor_flag?: string | null
          school_sponsors?: string | null
          site_name?: string | null
          special_classes_code?: string | null
          special_classes_name?: string | null
          status?: string | null
          statutory_high_age?: number | null
          statutory_low_age?: number | null
          telephone?: string | null
          total_pupils?: number | null
          trust_code?: string | null
          trust_id?: string | null
          trust_joined_date?: string | null
          trust_name?: string | null
          trust_school_flag_code?: string | null
          trust_school_flag_name?: string | null
          ukprn?: string | null
          uprn?: string | null
          urban_rural_code?: string | null
          urban_rural_desc?: string | null
          urban_rural_name?: string | null
          urn: number
          ward?: string | null
          website?: string | null
        }
        Update: {
          accreditation_expiry_date?: string | null
          address_county?: string | null
          address_locality?: string | null
          address_postcode?: string | null
          address_street?: string | null
          address_town?: string | null
          address3?: string | null
          administrative_ward_code?: string | null
          administrative_ward_name?: string | null
          admissions_policy_code?: string | null
          admissions_policy_name?: string | null
          boarders_code?: string | null
          boarders_name?: string | null
          capacity?: number | null
          census_date?: string | null
          ch_number?: string | null
          close_date?: string | null
          country_name?: string | null
          created_at?: string
          date_of_last_inspection?: string | null
          diocese_code?: string | null
          diocese_name?: string | null
          district?: string | null
          district_administrative_code?: string | null
          district_administrative_name?: string | null
          easting?: number | null
          establishment_accredited_code?: string | null
          establishment_accredited_name?: string | null
          establishment_number?: string | null
          establishment_status_code?: string | null
          establishment_type?: string | null
          establishment_type_code?: string | null
          establishment_type_group?: string | null
          establishment_type_group_code?: string | null
          estates_email?: string | null
          estates_google_managed?: boolean | null
          fe_he_identifier?: string | null
          federation_code?: string | null
          federation_flag?: string | null
          federation_name?: string | null
          fsm?: number | null
          fsm_percentage?: number | null
          further_education_type?: string | null
          gender?: string | null
          gender_code?: string | null
          giasUrn?: string | null
          google_domain_suffix?: string | null
          gor_code?: string | null
          gor_name?: string | null
          gov_region?: string | null
          gss_la_code?: string | null
          has_nursery?: boolean | null
          has_sixth_form?: boolean | null
          head_first_name?: string | null
          head_last_name?: string | null
          head_preferred_job_title?: string | null
          headteacher_name?: string | null
          headteacher_title?: string | null
          id?: string
          inspectorate_name?: string | null
          inspectorate_report?: string | null
          is_test_account?: boolean
          la_code?: string | null
          la_name?: string | null
          laestab?: string | null
          last_changed_date?: string | null
          last_dfe_sync?: string | null
          local_authority?: string | null
          locality?: string | null
          logo_url?: string | null
          lsoa_code?: string | null
          msoa_code?: string | null
          name?: string
          next_inspection_visit?: string | null
          northing?: number | null
          number_of_boys?: number | null
          number_of_girls?: number | null
          nursery_provision?: string | null
          official_sixth_form_code?: string | null
          official_sixth_form_name?: string | null
          open_date?: string | null
          parliamentary_constituency?: string | null
          parliamentary_constituency_code?: string | null
          parliamentary_constituency_name?: string | null
          phase?: string | null
          phase_code?: string | null
          previous_establishment_number?: string | null
          previous_la_code?: string | null
          previous_la_name?: string | null
          qab_name?: string | null
          qab_name_code?: string | null
          qab_report?: string | null
          raw_import_data?: Json | null
          reason_establishment_closed_code?: string | null
          reason_establishment_closed_name?: string | null
          reason_establishment_opened_code?: string | null
          reason_establishment_opened_name?: string | null
          religious_character?: string | null
          religious_character_code?: string | null
          religious_ethos?: string | null
          resourced_provision_capacity?: number | null
          resourced_provision_on_roll?: number | null
          school_sponsor_flag?: string | null
          school_sponsors?: string | null
          site_name?: string | null
          special_classes_code?: string | null
          special_classes_name?: string | null
          status?: string | null
          statutory_high_age?: number | null
          statutory_low_age?: number | null
          telephone?: string | null
          total_pupils?: number | null
          trust_code?: string | null
          trust_id?: string | null
          trust_joined_date?: string | null
          trust_name?: string | null
          trust_school_flag_code?: string | null
          trust_school_flag_name?: string | null
          ukprn?: string | null
          uprn?: string | null
          urban_rural_code?: string | null
          urban_rural_desc?: string | null
          urban_rural_name?: string | null
          urn?: number
          ward?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "schools_trust_id_fkey"
            columns: ["trust_id"]
            isOneToOne: false
            referencedRelation: "trusts"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string | null
          default_duration_minutes: number
          description: string | null
          id: string
          name: string
          trust_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          default_duration_minutes?: number
          description?: string | null
          id?: string
          name: string
          trust_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          default_duration_minutes?: number
          description?: string | null
          id?: string
          name?: string
          trust_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "services_trust_id_fkey"
            columns: ["trust_id"]
            isOneToOne: false
            referencedRelation: "trusts"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          description: string | null
          id: string
          logo_url: string | null
          name: string
          updated_at: string
          verified: boolean
          website: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          updated_at?: string
          verified?: boolean
          website?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          updated_at?: string
          verified?: boolean
          website?: string | null
        }
        Relationships: []
      }
      trusts: {
        Row: {
          address_county: string | null
          address_locality: string | null
          address_postcode: string | null
          address_street: string | null
          address_town: string | null
          companies_house_number: string | null
          created_at: string
          dfe_group_id: string | null
          dfe_group_uid: number | null
          group_id: string | null
          group_type: string | null
          group_type_code: string | null
          id: string
          is_test_account: boolean
          last_dfe_sync: string | null
          logo_url: string | null
          name: string
          open_date: string | null
          raw_import_data: Json | null
          uid: string | null
          ukprn: string | null
        }
        Insert: {
          address_county?: string | null
          address_locality?: string | null
          address_postcode?: string | null
          address_street?: string | null
          address_town?: string | null
          companies_house_number?: string | null
          created_at?: string
          dfe_group_id?: string | null
          dfe_group_uid?: number | null
          group_id?: string | null
          group_type?: string | null
          group_type_code?: string | null
          id?: string
          is_test_account?: boolean
          last_dfe_sync?: string | null
          logo_url?: string | null
          name: string
          open_date?: string | null
          raw_import_data?: Json | null
          uid?: string | null
          ukprn?: string | null
        }
        Update: {
          address_county?: string | null
          address_locality?: string | null
          address_postcode?: string | null
          address_street?: string | null
          address_town?: string | null
          companies_house_number?: string | null
          created_at?: string
          dfe_group_id?: string | null
          dfe_group_uid?: number | null
          group_id?: string | null
          group_type?: string | null
          group_type_code?: string | null
          id?: string
          is_test_account?: boolean
          last_dfe_sync?: string | null
          logo_url?: string | null
          name?: string
          open_date?: string | null
          raw_import_data?: Json | null
          uid?: string | null
          ukprn?: string | null
        }
        Relationships: []
      }
      user_deal_preferences: {
        Row: {
          category_id: string | null
          created_at: string
          email_notifications: boolean
          id: string
          user_id: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          email_notifications?: boolean
          id?: string
          user_id?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string
          email_notifications?: boolean
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_deal_preferences_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "deal_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          is_primary: boolean
          is_verified: boolean
          updated_at: string
          user_id: string
          verified_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_primary?: boolean
          is_verified?: boolean
          updated_at?: string
          user_id: string
          verified_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_primary?: boolean
          is_verified?: boolean
          updated_at?: string
          user_id?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      user_modules: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          module_id: string
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          module_id: string
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          module_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_modules_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_modules_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          role: string
          user_id: string
        }
        Insert: {
          role: string
          user_id: string
        }
        Update: {
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      user_saved_deals: {
        Row: {
          created_at: string
          deal_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          deal_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          deal_id?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_saved_deals_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      user_school_history: {
        Row: {
          created_at: string
          end_date: string | null
          id: string
          is_current: boolean
          role: string | null
          school_id: string
          start_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: string
          is_current?: boolean
          role?: string | null
          school_id: string
          start_date?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: string
          is_current?: boolean
          role?: string | null
          school_id?: string
          start_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_school_history_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      user_schools: {
        Row: {
          school_id: string
          user_id: string
        }
        Insert: {
          school_id: string
          user_id: string
        }
        Update: {
          school_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_schools_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_schools_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_trust_usage_stats: {
        Args: { trust_uuid: string }
        Returns: {
          total_schools: number
          active_schools: number
          inactive_schools: number
          total_users: number
          total_deals_used: number
        }[]
      }
      match_kb_entries: {
        Args: {
          query_embedding: string
          match_threshold: number
          match_count: number
          filter_school_id: string
        }
        Returns: {
          id: string
          content: string
          access_level: string
          similarity: number
        }[]
      }
      process_gias_import: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
    }
    Enums: {
      booking_status:
        | "pending_confirmation"
        | "confirmed"
        | "completed"
        | "cancelled_by_contractor"
        | "cancelled_by_school"
        | "no_show"
      user_role: "user" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      booking_status: [
        "pending_confirmation",
        "confirmed",
        "completed",
        "cancelled_by_contractor",
        "cancelled_by_school",
        "no_show",
      ],
      user_role: ["user", "admin"],
    },
  },
} as const
