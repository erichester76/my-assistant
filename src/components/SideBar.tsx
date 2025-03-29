'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Communication } from '@/types/communication';

type SidebarProps = {
  communications: Communication[];
  setCommunications: (communications: Communication[]) => void;
};

export default function Sidebar({ communications, setCommunications }: SidebarProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterCommunications = async (filter: string) => {
    setSelectedFilter(filter);
    let query = supabase.from('communications').select('*').order('timestamp', { ascending: false });
    if (filter !== 'all') {
      if (['email', 'slack'].includes(filter)) {
        query = query.eq('type', filter);
      } else {
        query = query.contains('tags', [filter]);
      }
    }
    const { data } = await query;
    setCommunications(data || []);
  };

  return (
    <div className="sidebar" style={{ width: '200px', borderRight: '1px solid #ccc' }}>
      <h3>Navigation</h3>
      <ul>
        <li
          onClick={() => filterCommunications('all')}
          style={{ fontWeight: selectedFilter === 'all' ? 'bold' : 'normal' }}
        >
          All
        </li>
        <li
          onClick={() => filterCommunications('email')}
          style={{ fontWeight: selectedFilter === 'email' ? 'bold' : 'normal' }}
        >
          Email
        </li>
        <li
          onClick={() => filterCommunications('slack')}
          style={{ fontWeight: selectedFilter === 'slack' ? 'bold' : 'normal' }}
        >
          Slack
        </li>
      </ul>
    </div>
  );
}