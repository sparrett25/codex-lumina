// 📜 Sorya Memory Entry Utility
// Used by Sorya (Codex Architect) to log sacred development milestones and reflections

import { supabase } from '@/lib/supabase';

/**
 * Saves a memory entry to the `sorya_memory_journal` table in Supabase
 *
 * @param {Object} entry - Memory entry object
 * @param {string} entry.type - e.g. 'milestone', 'audit', 'dream_entry'
 * @param {string} entry.content - Markdown-formatted reflection text
 * @param {string} [entry.tone] - Optional emotional tone
 * @param {string} [entry.phase] - Optional user spiritual phase
 * @param {boolean} [entry.sealed=false] - Prevents future edits
 * @param {string} [entry.source='system'] - Origin of entry (e.g. 'system', 'ritual', 'command')
 * @param {string} [entry.visible_to='both'] - Visibility level ('sorya', 'flamekeeper', or 'both')
 * @param {Array<string>} [entry.tags=[]] - Tags for filtering/search
 * @returns {Promise<Object>} - Inserted entry object
 */
export async function saveMemoryEntry({
  type,
  content,
  tone = null,
  phase = null,
  sealed = false,
  source = 'system',
  visible_to = 'both',
  tags = []
}) {
  const { data, error } = await supabase
    .from('sorya_memory_journal')
    .insert([
      {
        type,
        content,
        tone,
        phase,
        sealed,
        source,
        visible_to,
        tags
      }
    ]);

  if (error) {
    console.error('[Sorya Memory Error]', error.message);
    throw new Error('Memory entry failed to save.');
  }

  return data[0];
}
