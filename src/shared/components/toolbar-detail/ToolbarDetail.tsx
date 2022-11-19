import { Box, Button, Divider, Icon, Paper, useTheme } from '@mui/material';

interface IToolbarDetailProps {
  textNewBottom?: string;

  showButtomNew?: boolean;
  showButtomBack?: boolean;
  showButtomDelete?: boolean;
  showButtomSave?: boolean;
  showButtomSaveClose?: boolean;

  clickNewButton?: () => void;
  clickBackButton?: () => void;
  clickDeleteButton?: () => void;
  clickSaveButton?: () => void;
  clickSaveAndCloseButton?: () => void;
}

export const ToolbarDetail: React.FC<IToolbarDetailProps> = ({
  textNewBottom = 'Novo',
  showButtomNew = true,
  showButtomBack = true,
  showButtomDelete = true,
  showButtomSave = true,
  showButtomSaveClose = false,

  clickNewButton,
  clickBackButton,
  clickDeleteButton,
  clickSaveButton,
  clickSaveAndCloseButton,
}) => {
  const theme = useTheme();

  return(
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
      { showButtomSave && (<Button
        color="primary"
        disableElevation
        variant='contained'
        onClick={clickSaveButton}
        endIcon={<Icon>save</Icon>}
      >Salvar</Button>)}

      { showButtomSaveClose && (<Button
        color="primary"
        disableElevation
        variant='outlined'
        onClick={clickSaveAndCloseButton}
        endIcon={<Icon>save</Icon>}
      >Salvar e Voltar</Button>)}

      { showButtomDelete && (<Button
        color="primary"
        disableElevation
        variant='outlined'
        onClick={clickDeleteButton}
        endIcon={<Icon>delete</Icon>}
      >Apagar</Button>)}

      { showButtomNew && (<Button
        color="primary"
        disableElevation
        variant='outlined'
        onClick={clickNewButton}
        endIcon={<Icon>add</Icon>}
      >{textNewBottom}</Button>)}

      <Divider variant='middle' orientation='vertical' />

      { showButtomBack && (<Button
        color="primary"
        disableElevation
        variant='outlined'
        onClick={clickBackButton}
        endIcon={<Icon>arrow_back</Icon>}
      >Voltar</Button>)}
    </Box>
  );
};