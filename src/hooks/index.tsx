import React from 'react';

import { AuthProvider } from './auth';
// import { TranslateProvider } from './translation';

const AppProvider = (props: any) => <AuthProvider>{props.children}</AuthProvider>;

export default AppProvider;
