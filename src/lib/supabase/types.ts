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
      wallets: {
        Row: {
          id: string
          user_id: string
          balance: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          balance?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          balance?: number
          created_at?: string
          updated_at?: string
        }
      }
      wallet_transactions: {
        Row: {
          id: string
          wallet_id: string
          type: 'deposit' | 'withdrawal' | 'payment'
          amount: number
          status: 'pending' | 'completed' | 'failed'
          payment_method?: 'stripe' | 'cryptomus'
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          wallet_id: string
          type: 'deposit' | 'withdrawal' | 'payment'
          amount: number
          status?: 'pending' | 'completed' | 'failed'
          payment_method?: 'stripe' | 'cryptomus'
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          wallet_id?: string
          type?: 'deposit' | 'withdrawal' | 'payment'
          amount?: number
          status?: 'pending' | 'completed' | 'failed'
          payment_method?: 'stripe' | 'cryptomus'
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
