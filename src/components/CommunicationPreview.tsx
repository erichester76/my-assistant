// src/components/CommunicationPreview.tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Communication } from '@/types/communication';

// Define props type for CommunicationPreview
type CommunicationPreviewProps = {
  communication: Communication;
};

export default function CommunicationPreview({ communication }: CommunicationPreviewProps) {
  const [tags, setTags] = useState<string[]>(communication.tags || []);

  // Add a new tag to the communication
  const addTag = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      const newTag = e.currentTarget.value;
      const updatedTags = [...tags, newTag];
      await supabase.from('communications').update({ tags: updatedTags }).eq('id', communication.id);
      setTags(updatedTags);
      e.currentTarget.value = '';
    }
  };

  // Delete the selected communication
  const deleteComm = async () => {
    await supabase.from('communications').delete().eq('id', communication.id);
  };

  return (
    <div className="preview" style={{ flex: 1, padding: '20px' }}>
      <h2>{communication.type}</h2>
      <p><strong>From:</strong> {communication.sender}</p>
      <p>{communication.content}</p>
      <div>
        <h3>Tags</h3>
        {tags.map((tag) => (
          <span key={tag} style={{ marginRight: '5px' }}>{tag}</span>
        ))}
        <input type="text" placeholder="Add tag" onKeyPress={addTag} />
      </div>
      <button onClick={deleteComm}>Delete</button>
    </div>
  );
}