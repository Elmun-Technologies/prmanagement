/**
 * API layer — all Supabase database operations in one place.
 * Import from this file, not from supabase.ts directly.
 */
import { supabase } from './supabase';
import type {
  DbTaskStatus, DbKpiValue, DbStandup, DbBonusUnlock,
  DbOrgNode, DbMemberContact, DbCustomMember,
  DbTaskResource, DbTaskResultLink, DbAnnouncement,
} from './supabase';

// ═══════════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════════
export const auth = {
  /** Sign up a new team member */
  async signUp(email: string, password: string, roleId: string, displayName: string) {
    return supabase.auth.signUp({
      email,
      password,
      options: { data: { role_id: roleId, display_name: displayName } },
    });
  },

  /** Sign in with email + password */
  async signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
  },

  async signOut() {
    return supabase.auth.signOut();
  },

  async getSession() {
    return supabase.auth.getSession();
  },

  async getUser() {
    return supabase.auth.getUser();
  },

  onAuthStateChange(callback: Parameters<typeof supabase.auth.onAuthStateChange>[0]) {
    return supabase.auth.onAuthStateChange(callback);
  },
};

// ═══════════════════════════════════════════════════════
// PROFILES
// ═══════════════════════════════════════════════════════
export const profiles = {
  async getAll() {
    return supabase.from('profiles').select('*').order('created_at');
  },

  async getById(id: string) {
    return supabase.from('profiles').select('*').eq('id', id).single();
  },

  async updateRole(userId: string, roleId: string) {
    return supabase
      .from('profiles')
      .update({ role_id: roleId, updated_at: new Date().toISOString() })
      .eq('id', userId);
  },

  async updateDisplayName(userId: string, displayName: string) {
    return supabase
      .from('profiles')
      .update({ display_name: displayName, updated_at: new Date().toISOString() })
      .eq('id', userId);
  },
};

// ═══════════════════════════════════════════════════════
// TASKS
// ═══════════════════════════════════════════════════════
export const tasks = {
  /** Get all task statuses (only overrides from default 'pending') */
  async getAll(): Promise<DbTaskStatus[]> {
    const { data, error } = await supabase.from('task_statuses').select('*');
    if (error) { console.error('[api.tasks.getAll]', error); return []; }
    return data || [];
  },

  /** Upsert a task status */
  async setStatus(taskId: string, status: 'pending' | 'inprogress' | 'done', updatedBy?: string) {
    const { error } = await supabase.from('task_statuses').upsert({
      task_id: taskId,
      status,
      updated_by: updatedBy || null,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'task_id' });
    if (error) console.error('[api.tasks.setStatus]', error);
    return !error;
  },

  /** Subscribe to task changes — real-time */
  subscribe(callback: (payload: { new: DbTaskStatus }) => void) {
    return supabase
      .channel('task-statuses')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'task_statuses' }, callback)
      .subscribe();
  },
};

// ═══════════════════════════════════════════════════════
// KPIs
// ═══════════════════════════════════════════════════════
export const kpis = {
  async getAll(): Promise<Record<string, number>> {
    const { data, error } = await supabase.from('kpi_values').select('*');
    if (error) { console.error('[api.kpis.getAll]', error); return {}; }
    const result: Record<string, number> = {};
    (data || []).forEach((row: DbKpiValue) => { result[row.key] = Number(row.value); });
    return result;
  },

  async set(key: string, value: number, updatedBy?: string) {
    const { error } = await supabase.from('kpi_values').upsert({
      key,
      value,
      updated_by: updatedBy || null,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'key' });
    if (error) console.error('[api.kpis.set]', error);
    return !error;
  },

  async setMany(values: Record<string, number>, updatedBy?: string) {
    const rows = Object.entries(values).map(([key, value]) => ({
      key, value,
      updated_by: updatedBy || null,
      updated_at: new Date().toISOString(),
    }));
    const { error } = await supabase.from('kpi_values').upsert(rows, { onConflict: 'key' });
    if (error) console.error('[api.kpis.setMany]', error);
    return !error;
  },

  subscribe(callback: (payload: { new: DbKpiValue }) => void) {
    return supabase
      .channel('kpi-values')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'kpi_values' }, callback)
      .subscribe();
  },
};

// ═══════════════════════════════════════════════════════
// STANDUPS
// ═══════════════════════════════════════════════════════
export const standups = {
  async getAll(): Promise<DbStandup[]> {
    const { data, error } = await supabase
      .from('standups')
      .select('*')
      .order('submitted_at', { ascending: false });
    if (error) { console.error('[api.standups.getAll]', error); return []; }
    return data || [];
  },

  async getByDate(date: string): Promise<DbStandup[]> {
    const { data, error } = await supabase
      .from('standups')
      .select('*')
      .eq('date', date)
      .order('submitted_at');
    if (error) { console.error('[api.standups.getByDate]', error); return []; }
    return data || [];
  },

  async upsert(entry: Omit<DbStandup, 'id' | 'submitted_at'> & { submitted_by?: string | null }) {
    const { error } = await supabase.from('standups').upsert({
      ...entry,
      submitted_at: new Date().toISOString(),
    }, { onConflict: 'date,role_id' });
    if (error) console.error('[api.standups.upsert]', error);
    return !error;
  },

  subscribe(callback: (payload: { new: DbStandup }) => void) {
    return supabase
      .channel('standups')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'standups' }, callback)
      .subscribe();
  },
};

// ═══════════════════════════════════════════════════════
// BONUSES
// ═══════════════════════════════════════════════════════
export const bonuses = {
  async getUnlocked(): Promise<string[]> {
    const { data, error } = await supabase.from('bonus_unlocks').select('bonus_id');
    if (error) { console.error('[api.bonuses.getUnlocked]', error); return []; }
    return (data || []).map((r: DbBonusUnlock) => r.bonus_id);
  },

  async unlock(bonusId: string, unlockedBy?: string) {
    const { error } = await supabase.from('bonus_unlocks').upsert({
      bonus_id: bonusId,
      unlocked_by: unlockedBy || null,
      unlocked_at: new Date().toISOString(),
    }, { onConflict: 'bonus_id' });
    if (error) console.error('[api.bonuses.unlock]', error);
    return !error;
  },

  subscribe(callback: (payload: { new: DbBonusUnlock }) => void) {
    return supabase
      .channel('bonus-unlocks')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bonus_unlocks' }, callback)
      .subscribe();
  },
};

// ═══════════════════════════════════════════════════════
// ORG NODES
// ═══════════════════════════════════════════════════════
export const orgNodes = {
  async getAll(): Promise<DbOrgNode[]> {
    const { data, error } = await supabase
      .from('org_nodes')
      .select('*')
      .order('level')
      .order('sort_order');
    if (error) { console.error('[api.orgNodes.getAll]', error); return []; }
    return data || [];
  },

  async upsert(node: Partial<DbOrgNode> & { id: string }) {
    const { error } = await supabase.from('org_nodes').upsert({
      ...node,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'id' });
    if (error) console.error('[api.orgNodes.upsert]', error);
    return !error;
  },

  async delete(id: string) {
    const { error } = await supabase.from('org_nodes').delete().eq('id', id);
    if (error) console.error('[api.orgNodes.delete]', error);
    return !error;
  },

  async bulkUpsert(nodes: DbOrgNode[]) {
    const { error } = await supabase.from('org_nodes').upsert(
      nodes.map((n) => ({ ...n, updated_at: new Date().toISOString() })),
      { onConflict: 'id' }
    );
    if (error) console.error('[api.orgNodes.bulkUpsert]', error);
    return !error;
  },
};

// ═══════════════════════════════════════════════════════
// MEMBER CONTACTS
// ═══════════════════════════════════════════════════════
export const memberContacts = {
  async getAll(): Promise<DbMemberContact[]> {
    const { data, error } = await supabase.from('member_contacts').select('*');
    if (error) { console.error('[api.memberContacts.getAll]', error); return []; }
    return data || [];
  },

  async upsert(contact: DbMemberContact) {
    const { error } = await supabase.from('member_contacts').upsert({
      ...contact,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'role_id' });
    if (error) console.error('[api.memberContacts.upsert]', error);
    return !error;
  },
};

// ═══════════════════════════════════════════════════════
// CUSTOM MEMBERS
// ═══════════════════════════════════════════════════════
export const customMembers = {
  async getAll(): Promise<DbCustomMember[]> {
    const { data, error } = await supabase
      .from('custom_members')
      .select('*')
      .order('added_at');
    if (error) { console.error('[api.customMembers.getAll]', error); return []; }
    return data || [];
  },

  async add(member: Omit<DbCustomMember, 'id' | 'added_at'>) {
    const { data, error } = await supabase
      .from('custom_members')
      .insert({ ...member, added_at: new Date().toISOString() })
      .select()
      .single();
    if (error) console.error('[api.customMembers.add]', error);
    return data as DbCustomMember | null;
  },

  async update(id: string, member: Partial<DbCustomMember>) {
    const { error } = await supabase
      .from('custom_members')
      .update(member)
      .eq('id', id);
    if (error) console.error('[api.customMembers.update]', error);
    return !error;
  },

  async remove(id: string) {
    const { error } = await supabase.from('custom_members').delete().eq('id', id);
    if (error) console.error('[api.customMembers.remove]', error);
    return !error;
  },
};

// ═══════════════════════════════════════════════════════
// TASK RESOURCES
// ═══════════════════════════════════════════════════════
export const taskResources = {
  async getByTask(taskId: string): Promise<DbTaskResource[]> {
    const { data, error } = await supabase
      .from('task_resources')
      .select('*')
      .eq('task_id', taskId);
    if (error) { console.error('[api.taskResources.getByTask]', error); return []; }
    return data || [];
  },

  async getAll(): Promise<DbTaskResource[]> {
    const { data, error } = await supabase.from('task_resources').select('*');
    if (error) { console.error('[api.taskResources.getAll]', error); return []; }
    return data || [];
  },

  async add(resource: Omit<DbTaskResource, 'id' | 'added_at'>) {
    const { data, error } = await supabase
      .from('task_resources')
      .insert({ ...resource, added_at: new Date().toISOString() })
      .select()
      .single();
    if (error) console.error('[api.taskResources.add]', error);
    return data as DbTaskResource | null;
  },

  async remove(id: number) {
    const { error } = await supabase.from('task_resources').delete().eq('id', id);
    if (error) console.error('[api.taskResources.remove]', error);
    return !error;
  },
};

// ═══════════════════════════════════════════════════════
// TASK RESULT LINKS
// ═══════════════════════════════════════════════════════
export const taskResultLinks = {
  async getAll(): Promise<DbTaskResultLink[]> {
    const { data, error } = await supabase.from('task_result_links').select('*');
    if (error) { console.error('[api.taskResultLinks.getAll]', error); return []; }
    return data || [];
  },

  async set(taskId: string, url: string, submittedBy?: string) {
    const { error } = await supabase.from('task_result_links').upsert({
      task_id: taskId,
      url,
      submitted_by: submittedBy || null,
      submitted_at: new Date().toISOString(),
    }, { onConflict: 'task_id' });
    if (error) console.error('[api.taskResultLinks.set]', error);
    return !error;
  },

  async remove(taskId: string) {
    const { error } = await supabase.from('task_result_links').delete().eq('task_id', taskId);
    if (error) console.error('[api.taskResultLinks.remove]', error);
    return !error;
  },
};

// ═══════════════════════════════════════════════════════
// ANNOUNCEMENTS
// ═══════════════════════════════════════════════════════
export const announcements = {
  async getActive(): Promise<DbAnnouncement[]> {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .or('expires_at.is.null,expires_at.gt.' + new Date().toISOString())
      .order('is_pinned', { ascending: false })
      .order('posted_at', { ascending: false });
    if (error) { console.error('[api.announcements.getActive]', error); return []; }
    return data || [];
  },

  async post(ann: Omit<DbAnnouncement, 'id' | 'posted_at'>) {
    const { data, error } = await supabase
      .from('announcements')
      .insert({ ...ann, posted_at: new Date().toISOString() })
      .select()
      .single();
    if (error) console.error('[api.announcements.post]', error);
    return data as DbAnnouncement | null;
  },

  async delete(id: string) {
    const { error } = await supabase.from('announcements').delete().eq('id', id);
    if (error) console.error('[api.announcements.delete]', error);
    return !error;
  },

  subscribe(callback: (payload: { new: DbAnnouncement }) => void) {
    return supabase
      .channel('announcements')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'announcements' }, callback)
      .subscribe();
  },
};

// ═══════════════════════════════════════════════════════
// USER XP (Gamification)
// ═══════════════════════════════════════════════════════
export const userXP = {
  async get(userId: string) {
    const { data, error } = await supabase
      .from('user_xp')
      .select('*')
      .eq('user_id', userId)
      .single();
    if (error && error.code !== 'PGRST116') console.error('[api.userXP.get]', error);
    return data || { user_id: userId, total_xp: 0, streak: 0, last_active: null };
  },

  async addXP(userId: string, amount: number) {
    const current = await userXP.get(userId);
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const newStreak = current.last_active === yesterday ? current.streak + 1 : 1;

    const { error } = await supabase.from('user_xp').upsert({
      user_id: userId,
      total_xp: (current.total_xp || 0) + amount,
      streak: newStreak,
      last_active: today,
    }, { onConflict: 'user_id' });
    if (error) console.error('[api.userXP.addXP]', error);
    return !error;
  },

  async getLeaderboard() {
    const { data, error } = await supabase
      .from('user_xp')
      .select('*, profiles(display_name, role_id, avatar_emoji)')
      .order('total_xp', { ascending: false })
      .limit(10);
    if (error) { console.error('[api.userXP.getLeaderboard]', error); return []; }
    return data || [];
  },
};
