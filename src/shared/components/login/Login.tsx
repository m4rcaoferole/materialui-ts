import { Box } from '@mui/material';
import { useAuthContext } from '../../contexts';

interface ILoginProps {
  children: React.ReactNode
}
export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) return (<>{children}</>);


  return (
    <Box>
      Login
    </Box>
  );
};