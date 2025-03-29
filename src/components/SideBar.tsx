// src/components/Sidebar.tsx
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Communication } from '@/types/communication';

// Define props type for Sidebar
type SidebarProps = {
  communications: Communication[];
  setCommunications: (communications: Communication[]) => void;
};

export default function Sidebar({ communications, setCommunications }: SidebarProps) {
  const [tags, setTags] = useState<{ tag: string; count: number }[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Calculate tags and their counts based on communications
  useEffect(() => {
    const fetchTags = () => {
      const allTags = communications.flatMap((d) => d.tags || []);
      const uniqueTags = Array.from(new Set(allTags));
      const tagCounts = uniqueTags.map((tag) => ({
        tag,
        count: allTags.filter((t) => t === tag).length,
      }));
      setTags(tagCounts);
    };
    fetchTags();
  }, [communications]);

  // Filter communications based on type or tag
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
        <li onClick={() => filterCommunications('all')}>All</li>
        <li onClick={() => filterCommunications('email')}>Email</li>
        <li onClick={() => filterCommunications('slack')}>Slack</li>
      </ul>
      <h3>Tags</h3>
      <ul>
        {tags.map(({ tag, count }) => (
          <li key={tag} onClick={() => filterCommunications(tag)}>
            {tag} ({count})
          </li>
        ))}
      </ul>
    </div>
  );
}