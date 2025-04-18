import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useUserSync } from '@/contexts/UserSyncContext';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { Dialog } from '@headlessui/react';

dayjs.extend(isoWeek);

const blocks = ['morning', 'midday', 'evening'];
const blockLabels = {
  morning: '🌞',
  midday: '🌿',
  evening: '🔥'
};

const toneColors = {
  light: 'text-sky-400',
  dark: 'text-amber-500',
  neutral: 'text-violet-400'
};

export default function WeeklyRhythmReflection() {
  const { user, profile } = useUserSync();
  const [weeklyData, setWeeklyData] = useState({});
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);

  const tone = profile?.energy || 'neutral';
  const today = dayjs();
  const startOfWeek = today.startOf('isoWeek');
  const endOfWeek = today.endOf('isoWeek');

  useEffect(() => {
    const fetchWeekly = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('daily_rhythm_log')
        .select('date, block_id')
        .eq('user_id', user.id)
        .gte('date', startOfWeek.format('YYYY-MM-DD'))
        .lte('date', endOfWeek.format('YYYY-MM-DD'));

      if (!error && data) {
        const map = {};
        data.forEach(({ date, block_id }) => {
          const iso = dayjs(date).format('YYYY-MM-DD');
          if (!map[iso]) map[iso] = {};
          map[iso][block_id] = true;
        });
        setWeeklyData(map);

        let currentStreak = 0;
        const reversedDays = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day')).reverse();
        for (const day of reversedDays) {
          const iso = day.format('YYYY-MM-DD');
          const blocksForDay = map[iso] || {};
          const allComplete = blocks.every((block) => blocksForDay[block]);
          if (allComplete) {
            currentStreak++;
          } else {
            break;
          }
        }
        setStreak(currentStreak);
      }
      setLoading(false);
    };

    fetchWeekly();
  }, [user]);

  if (!user || loading) return null;

  const weekDays = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));

  return (
    <div className="mt-16 border-t border-indigo-800 pt-10 relative">
      <h2 className={`text-xl font-bold text-center mb-4 ${toneColors[tone]}`}>
        Weekly Rhythm Reflection
      </h2>

      {streak > 0 && (
        <div className="text-center text-amber-400 font-semibold text-base mb-6 animate-pulse">
          🔥 {streak}-Day Rhythm Streak
          <div className="text-xs text-zinc-400 mt-1 italic">
            Each day completed with all 3 rituals continues your sacred streak.
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-center border-collapse">
          <thead>
            <tr>
              <th className="p-2 text-left text-zinc-400">Day</th>
              {blocks.map((block) => (
                <th key={block} className="p-2 text-zinc-500">
                  {blockLabels[block]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weekDays.map((day) => {
              const iso = day.format('YYYY-MM-DD');
              return (
                <tr
                  key={iso}
                  className="border-t border-zinc-800 hover:bg-zinc-900/50 cursor-pointer transition duration-200"
                  onClick={() => setSelectedDay({ date: iso, label: day.format('dddd') })}
                >
                  <td className="p-2 text-zinc-300 text-left">{day.format('dddd')}</td>
                  {blocks.map((block) => (
                    <td key={block} className="p-2">
                      {weeklyData[iso]?.[block] ? (
                        <span className="text-emerald-400">✅</span>
                      ) : (
                        <span className="text-zinc-600">–</span>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedDay && (
        <Dialog open={!!selectedDay} onClose={() => setSelectedDay(null)} className="fixed z-50 inset-0 bg-black/60 flex items-center justify-center">
          <Dialog.Panel className="relative z-[100] bg-zinc-900/95 backdrop-blur-md rounded-2xl p-6 w-full max-w-md border border-indigo-700 shadow-xl">
            <Dialog.Title className="text-lg font-bold text-indigo-300 mb-2 text-center">
              {selectedDay.label}'s Reflection
            </Dialog.Title>
            <div className="text-sm text-zinc-400 mb-4 text-center">
              {selectedDay.date}
            </div>
            <ul className="mb-4 space-y-2 text-indigo-300 bg-zinc-900/90 p-4 rounded-xl shadow-inner">
              {blocks.map((block) => (
                <li key={block}>
                  {blockLabels[block]} {weeklyData[selectedDay.date]?.[block] ? '✅ Completed' : '– Not marked'}
                </li>
              ))}
            </ul>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => alert('🔄 Ritual Replay logic coming soon')}
                className="px-4 py-2 bg-indigo-700 rounded-lg hover:bg-indigo-600 text-sm text-white"
              >
                Relaunch Ritual
              </button>
              <button
                onClick={() => setSelectedDay(null)}
                className="px-4 py-2 bg-zinc-700 rounded-lg hover:bg-zinc-600 text-sm text-zinc-300"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </Dialog>
      )}
    </div>
  );
}
