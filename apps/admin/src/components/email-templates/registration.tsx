import React from 'react';

interface RegistrationTemplate {
  firstName: string;
}

export const RegistrationTemplate: React.FC<Readonly<RegistrationTemplate>> = ({
  firstName,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);
