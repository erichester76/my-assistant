// src/components/InboxLayout.tsx
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Sidebar from '@/components/SideBar';
import CommunicationList from '@/components/CommunicationList';
import CommunicationPreview from '@/components/CommunicationPreview';
import { Communication } from '@/types/communication';

export default function InboxLayout() {
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [selectedComm, setSelectedComm] = useState<Communication | null>(null);

  useEffect(() => {
    // Fetch initial communications from Supabase
    const fetchCommunications = async () => {
      const { data } = await supabase
        .from('communications')
        .select('*')
        .order('timestamp', { ascending: false });
      setCommunications(data || []);
    };
    fetchCommunications();

    // Set up real-time subscription for new communications
    const subscription = supabase
      .channel('public:communications')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'communications' }, (payload) => {
        setCommunications((prev) => [payload.new as Communication, ...prev]);
      })
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div className="inbox-layout">
      <Sidebar communications={communications} setCommunications={setCommunications} />
      <CommunicationList communications={communications} onSelect={setSelectedComm} />
      {selectedComm && <CommunicationPreview communication={selectedComm} />}
    </div>
  );
}