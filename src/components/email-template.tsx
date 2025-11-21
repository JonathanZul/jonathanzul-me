import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  name,
  email,
  message,
}) => (
  <div style={{ fontFamily: 'sans-serif', lineHeight: '1.5' }}>
    <h1>New Message from Portfolio</h1>
    <p><strong>From:</strong> {name} ({email})</p>
    <hr />
    <p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
  </div>
);