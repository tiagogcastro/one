import { AuthProvider } from './auth';

const AppProvider = (props: any) => <AuthProvider>{props.children}</AuthProvider>;

export default AppProvider;
