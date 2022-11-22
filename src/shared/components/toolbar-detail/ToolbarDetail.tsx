import { Box, Button, Divider, Icon, Paper, Skeleton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';

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
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
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
          <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Salvar
          </Typography>
        </Button>
      )}
      { (loadingButtonSave && !smDown) && (<Skeleton width={110} height={60} />)}

      {(showButtonSaveClose && !loadingButtonSaveClose && !smDown && !mdDown) && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={clickSaveAndCloseButton}
          endIcon={<Icon>save</Icon>}
        >
          <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Salvar e Fechar
          </Typography>
        </Button>
      )}
      { (loadingButtonSaveClose && !smDown && !mdDown) && (<Skeleton width={180} height={60} />)}

      {(showButtonDelete && !loadingButtonDelete) && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={clickDeleteButton}
          endIcon={<Icon>delete</Icon>}
        >
          <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Apagar
          </Typography>
        </Button>
      )}
      { loadingButtonDelete && (<Skeleton width={110} height={60} />)}

      {(showButtonNew && !loadingButtonNew && !smDown) && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={clickNewButton}
          endIcon={<Icon>add</Icon>}
        >
          <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            {textNewButton}
          </Typography>
        </Button>
      )}
      { (loadingButtonNew && !smDown) && (<Skeleton width={110} height={60} />)}

      {
        ( showButtonBack &&
          ( showButtonNew || showButtonDelete || showButtonSave || showButtonSaveClose)
        ) && (
          <Divider variant="middle" orientation="vertical" />
        )
      }

      {(showButtonBack && !loadingButtonBack) && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={clickBackButton}
          endIcon={<Icon>arrow_back</Icon>}
        >
          <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Voltar
          </Typography>
        </Button>
      )}
      { loadingButtonBack && (<Skeleton width={110} height={60} />)}

    </Box>
  );
};
