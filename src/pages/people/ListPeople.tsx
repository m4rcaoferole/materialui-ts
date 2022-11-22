import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { LayoutBasePage } from '../../shared/layouts';
import { Toolbar } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';

export const ListPeople: React.FC = () => {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const { debounce } = useDebounce(3000);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {

    debounce(() => {
      PessoasService.getAll(1, busca)
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            console.log(result);
          }
        });
    });
  }, [busca]);

  return (
    <LayoutBasePage
      title="Listagem de pessoas"
      toolbar={
        <Toolbar
          showInput
          textNewButton='Nova'
          textSearch={busca}
          changeTextInput={text => 
            setSearchParams({ busca: text}, { replace: true})}
        />
      }
    >
      
    </LayoutBasePage>
  );
};