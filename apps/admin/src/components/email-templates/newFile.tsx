import React from 'react';
import { RegistrationTemplate } from './registration';

//localhost:3000/api/registration/send HTTP/1.1

http: export const RegistrationTemplate = ({
  firstName,
}: RegistrationTemplate) => {
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
    </div>
  );
};
