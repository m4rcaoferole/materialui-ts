import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';

import { Environment } from '../../environment';

interface IToolbarProps {
  textSearch?: string;
  showInput?: boolean;
  changeTextInput?: (newText: string) => void;
  textNewButton?: string;
  showNewButton?: boolean;
  newClickButton?: () => void;
}

export const Toolbar: React.FC<IToolbarProps> = ({
  textSearch = '',
  showInput = false,
  changeTextInput,
  textNewButton = 'Novo',
  showNewButton = true,
  newClickButton
}) => {
  const theme = useTheme();

  return (
    <Box 
      component={Paper}
      display="flex"
      alignItems="center"
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      height={theme.spacing(5)}
    >
      { showInput && (<TextField
        size='small'
        value={textSearch}
        placeholder={Environment.INPUT_DE_BUSCA}
        onChange={(e) => changeTextInput?.(e.target.value)}
      />)}

      <Box flex={1} display="flex" justifyContent="end">
        { showNewButton && (<Button
          color="primary"
          disableElevation
          variant='contained'
          endIcon={<Icon>add</Icon>}
          onClick={newClickButton}
        >{textNewButton}</Button>)}
      </Box>      
    </Box>
  );
};