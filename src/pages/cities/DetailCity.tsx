import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import * as yup from 'yup';

import { CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { ToolbarDetail } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { VTextField, VForm, useVForm, IVFormsErrors } from '../../shared/forms';

interface IFormData {
  nome: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  nome: yup.string().required().min(3),
});

export const DetailCity = () => {
  const { id = '' } = useParams<'id'>();
  const navigate = useNavigate();
  const { 
    formRef,
    save,
    saveAndClose,
    isSaveAndClose
  } =useVForm();
  

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      CidadesService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/cidades');
          } else {
            setNome(result.nome);
            formRef.current?.setData(result);
          }
        });
    } else {
      formRef.current?.setData({
        nome: '',
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    formValidationSchema.
      validate(dados, { abortEarly: false})
      .then((dadosValidados) => {
        setIsLoading(true);

        if (id === 'nova') {
          CidadesService
            .create(dadosValidados)
            .then((result) => {
              setIsLoading(false);
                
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/cidades');
                } else {
                  navigate(`/cidades/detalhe/${result}`);
                }
              }
            });
        } else {
          CidadesService
            .updateById(Number(id), { id: Number(id), ...dadosValidados })
            .then((result) => {
              setIsLoading(false);
                
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/cidades');
                } 
              }
            });
        }

      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormsErrors = {};

        errors.inner.forEach(error => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });

    
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      CidadesService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro apagado com sucesso!');
            navigate('/cidades');
          }
        }); 
    }
  };

  return (
    <LayoutBasePage
      title={id === 'nova' ? 'Nova cidade' : nome}
      toolbar={
        <ToolbarDetail
          textNewButton='Nova'
          showButtonSaveClose
          showButtonNew={id !== 'nova'}
          showButtonDelete={id !== 'nova'}

          clickSaveButton={save}
          clickSaveAndCloseButton={saveAndClose}
          clickBackButton={() => navigate('/cidades')}
          clickDeleteButton={() => handleDelete(Number(id))}
          clickNewButton={() => navigate('/cidades/detalhe/nova')}
        />
      }
    >

      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display="flex" flexDirection='column' component={Paper} variant="outlined">

          <Grid container direction="column" padding={1} spacing={2}>

            { isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid item>
              <Typography variant='h6'>Cidade</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Nome' 
                  name='nome'
                  disabled={isLoading}
                  onChange={e => setNome(e.target.value)}
                />
              </Grid>
            </Grid>

          </Grid>
        </Box>        
      </VForm>

    </LayoutBasePage>
  );
};