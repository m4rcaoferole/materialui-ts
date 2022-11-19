import { Box, Button, Divider, Icon, Paper, Skeleton, useTheme } from '@mui/material';

interface IToolbarDetailProps {
  textNewButton?: string;

  showButtonNew?: boolean;
  showButtonBack?: boolean;
  showButtonDelete?: boolean;
  showButtonSave?: boolean;
  showButtonSaveClose?: boolean;

  loadingButtonNew?: boolean;
  loadingButtonBack?: boolean;
  loadingButtonDelete?: boolean;
  loadingButtonSave?: boolean;
  loadingButtonSaveClose?: boolean;

  clickNewButton?: () => void;
  clickBackButton?: () => void;
  clickDeleteButton?: () => void;
  clickSaveButton?: () => void;
  clickSaveAndCloseButton?: () => void;
}

export const ToolbarDetail: React.FC<IToolbarDetailProps> = ({
  textNewButton = 'Novo',
  showButtonNew = true,
  showButtonBack = true,
  showButtonDelete = true,
  showButtonSave = true,
  showButtonSaveClose = false,

  loadingButtonNew = false,
  loadingButtonBack = false,
  loadingButtonDelete = false,
  loadingButtonSave = false,
  loadingButtonSaveClose = false,

  clickNewButton,
  clickBackButton,
  clickDeleteButton,
  clickSaveButton,
  clickSaveAndCloseButton,
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
      {(showButtonSave && !loadingButtonSave) && (
        <Button
          color="primary"
          disableElevation
          variant="contained"
          onClick={clickSaveButton}
          endIcon={<Icon>save</Icon>}
        >
          Salvar
        </Button>
      )}
      { loadingButtonSave && (<Skeleton width={110} height={60} />)}

      {(showButtonSaveClose && !loadingButtonSaveClose) && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={clickSaveAndCloseButton}
          endIcon={<Icon>save</Icon>}
        >
          Salvar e Voltar
        </Button>
      )}
      { loadingButtonSaveClose && (<Skeleton width={180} height={60} />)}

      {(showButtonDelete && !loadingButtonDelete) && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={clickDeleteButton}
          endIcon={<Icon>delete</Icon>}
        >
          Apagar
        </Button>
      )}
      { loadingButtonDelete && (<Skeleton width={110} height={60} />)}

      {(showButtonNew && !loadingButtonNew) && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={clickNewButton}
          endIcon={<Icon>add</Icon>}
        >
          {textNewButton}
        </Button>
      )}
      { loadingButtonNew && (<Skeleton width={110} height={60} />)}

      <Divider variant="middle" orientation="vertical" />

      {(showButtonBack && !loadingButtonBack) && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={clickBackButton}
          endIcon={<Icon>arrow_back</Icon>}
        >
          Voltar
        </Button>
      )}
      { loadingButtonBack && (<Skeleton width={110} height={60} />)}

    </Box>
  );
};
