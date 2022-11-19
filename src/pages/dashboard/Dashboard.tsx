import { Toolbar } from '../../shared/components/toolbar/Toolbar';
import { LayoutBasePage } from '../../shared/layouts';

export const Dashboard = () => {

  return (
    <LayoutBasePage 
      title='Página Inicial'
      toolbar={(<Toolbar showInput />)}>
      Testando
    </LayoutBasePage>
  );
};