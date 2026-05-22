import { createClient } from '@supabase/supabase-js';

// ──────────────────────────────────────────────────────────────────
// Supabase client — reads from Vite env variables
// Set these in .env.local (local dev) or Netlify env vars (production)
// ──────────────────────────────────────────────────────────────────
const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL  as string;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnon) {
  console.warn(
    '[Supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing.\n' +
    'Copy .env.example to .env.local and fill in your Supabase project credentials.'
  );
}

export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnon || 'placeholder', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: { eventsPerSecond: 10 },
  },
});

// ──────────────────────────────────────────────────────────────────
// Database types (matches schema.sql)
// ──────────────────────────────────────────────────────────────────
export interface DbProfile {
  id: string;
  email: string | null;
  role_id: string;
  display_name: string | null;
  avatar_emoji: string;
  created_at: string;
  updated_at: string;
}

export interface DbTaskStatus {
  task_id: string;
  status: 'pending' | 'inprogress' | 'done';
  updated_by: string | null;
  updated_at: string;
}

export interface DbKpiValue {
  key: string;
  value: number;
  updated_by: string | null;
  updated_at: string;
}

export interface DbStandup {
  id: string;
  date: string;
  role_id: string;
  role_name: string | null;
  role_emoji: string | null;
  yesterday: string;
  today: string;
  blockers: string;
  mood: number;
  submitted_by: string | null;
  submitted_at: string;
}

export interface DbBonusUnlock {
  bonus_id: string;
  unlocked_by: string | null;
  unlocked_at: string;
}

export interface DbOrgNode {
  id: string;
  parent_id: string | null;
  name: string;
  title: string;
  emoji: string;
  color: string;
  department: string;
  level: number;
  is_external: boolean;
  is_vacant: boolean;
  sort_order: number;
  updated_at: string;
}

export interface DbMemberContact {
  role_id: string;
  real_name: string;
  phone: string;
  telegram: string;
  updated_at: string;
}

export interface DbCustomMember {
  id: string;
  name: string;
  role_label: string;
  emoji: string;
  phone: string;
  telegram: string;
  note: string;
  added_at: string;
}

export interface DbTaskResource {
  id: number;
  task_id: string;
  resource_type: string;
  label: string;
  url: string;
  hint: string;
  required: boolean;
  added_at: string;
}

export interface DbTaskResultLink {
  task_id: string;
  url: string;
  submitted_by: string | null;
  submitted_at: string;
}

export interface DbAnnouncement {
  id: string;
  title: string;
  body: string;
  emoji: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  posted_by: string | null;
  posted_at: string;
  expires_at: string | null;
  is_pinned: boolean;
}

export interface DbUserXP {
  user_id: string;
  total_xp: number;
  streak: number;
  last_active: string | null;
}

// Type for the full database schema
export type Database = {
  public: {
    Tables: {
      profiles:          { Row: DbProfile         };
      task_statuses:     { Row: DbTaskStatus       };
      kpi_values:        { Row: DbKpiValue         };
      standups:          { Row: DbStandup          };
      bonus_unlocks:     { Row: DbBonusUnlock      };
      org_nodes:         { Row: DbOrgNode          };
      member_contacts:   { Row: DbMemberContact    };
      custom_members:    { Row: DbCustomMember     };
      task_resources:    { Row: DbTaskResource     };
      task_result_links: { Row: DbTaskResultLink   };
      announcements:     { Row: DbAnnouncement     };
      user_xp:           { Row: DbUserXP           };
    };
  };
};
