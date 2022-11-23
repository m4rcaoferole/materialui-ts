import { useNavigate, useParams } from 'react-router-dom';
import { ToolbarDetail } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';


export const DetailPeople = () => {
  const { id = '' } = useParams<'id'>();
  const navigate = useNavigate();

  const handleSave = () => {
    console.log('save');
  };

  const handleDelete = () => {
    console.log('delete');  
  };

  return (
    <LayoutBasePage
      title="Detalhe de pessoa"
      toolbar={
        <ToolbarDetail
          textNewButton='Nova'
          showButtonSaveClose
          showButtonNew={id !== 'nova'}
          showButtonDelete={id !== 'nova'}

          clickSaveButton={handleSave}
          clickSaveAndCloseButton={handleSave}
          clickDeleteButton={handleDelete}
          clickBackButton={() => navigate('/pessoas')}
          clickNewButton={() => navigate('/pessoas/detalhe/nova')}
        />
      }
    >
      <p> Detalhe de Pessoa {id}</p>
    </LayoutBasePage>
  );
};