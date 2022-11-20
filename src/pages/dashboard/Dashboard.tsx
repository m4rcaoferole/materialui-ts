import { ToolbarDetail } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';

export const Dashboard = () => {
  return (
    <LayoutBasePage title="Página Inicial" toolbar={<ToolbarDetail showButtonSaveClose showButtonNew />}>
      Testando
    </LayoutBasePage>
  );
};
