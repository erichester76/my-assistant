// src/types/communication.ts
export type Communication = {
    id: string;
    type: string; // e.g., 'email', 'slack', 'text', 'voicemail'
    source: string; // e.g., 'gmail', 'office365', 'slack', 'twilio'
    sender: string;
    recipient: string;
    timestamp: string; // ISO string or Date
    content: string;
    tags: string[];
    source_id: string; // Unique ID from the source
  };