// src/components/CommunicationList.tsx
'use client';
import { Communication } from '@/types/communication';

// Define props type for CommunicationList
type CommunicationListProps = {
  communications: Communication[];
  onSelect: (communication: Communication) => void;
};

export default function CommunicationList({ communications, onSelect }: CommunicationListProps) {
  return (
    <div className="comm-list" style={{ width: '300px', overflowY: 'auto' }}>
      {communications.map((comm) => (
        <div
          key={comm.id}
          onClick={() => onSelect(comm)}
          style={{ padding: '10px', borderBottom: '1px solid #eee' }}
        >
          <strong>{comm.sender}</strong>
          <p>{comm.content.slice(0, 50)}...</p>
          <small>{new Date(comm.timestamp).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}