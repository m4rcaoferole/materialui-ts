import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from '@unform/web';

import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { ToolbarDetail } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { VTextField } from '../../shared/forms';


export const DetailPeople = () => {
  const { id = '' } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      PessoasService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/pessoas');
          } else {
            setNome(result.nomeCompleto);
            console.log(result);
          }
        });
    }
  }, [id]);

  const handleSave = () => {
    console.log('save');
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      PessoasService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro apagado com sucesso!');
            navigate('/pessoas');
          }
        }); 
    }
  };

  return (
    <LayoutBasePage
      title={id === 'nova' ? 'Nova pessoa' : nome}
      toolbar={
        <ToolbarDetail
          textNewButton='Nova'
          showButtonSaveClose
          showButtonNew={id !== 'nova'}
          showButtonDelete={id !== 'nova'}

          clickSaveButton={handleSave}
          clickSaveAndCloseButton={handleSave}
          clickDeleteButton={() => handleDelete(Number(id))}
          clickBackButton={() => navigate('/pessoas')}
          clickNewButton={() => navigate('/pessoas/detalhe/nova')}
        />
      }
    >

      <Form onSubmit={(dados) => (console.log(dados))}>

        <VTextField 
          name='nomeCompleto'
        />
        
        <button type='submit'>Submit</button>
      </Form>
      {/* { isLoading && (
        <LinearProgress variant="indeterminate" />
      )}

      <p> Detalhe de Pessoa {id}</p> */}
    </LayoutBasePage>
  );
};