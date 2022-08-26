import React from 'react';

import { AuthProvider } from './auth';

interface IProps {
  name: string;
}

const AppProvider: React.FC<IProps> = () => <AuthProvider></AuthProvider>;

export default AppProvider;
