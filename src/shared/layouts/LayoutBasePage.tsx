import { Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useDrawerContext } from '../contexts';

interface ILayoutBasePageProps {
  title: string;
  children: React.ReactNode;
}

export const LayoutBasePage: React.FC<ILayoutBasePageProps> = ({
  children,
  title
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const theme = useTheme();

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1} >
      <Box padding={1} display="flex" alignItems="center" gap={1} height={theme.spacing(12)}>
        { smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography variant="h5">
          {title}
        </Typography>
      </Box>

      <Box>
        Barra de ferramentas
      </Box>

      <Box>
        {children}
      </Box>
    </Box>
  );
};