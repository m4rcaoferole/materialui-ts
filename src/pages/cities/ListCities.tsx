import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Toolbar } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';

export const ListCities: React.FC = () => {
  const [ searchParams, setSearchParams ] = useSearchParams();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  return (
    <LayoutBasePage
      title="Listagem de cidades"
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