// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import GoalNewEditForm from '../../../sections/@dashboard/goals/new-edit-form/index';

// ----------------------------------------------------------------------

EcommerceProductCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EcommerceProductCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Создание новой цели">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Создание новой цели"
          links={[
            { name: 'Панель', href: PATH_DASHBOARD.root },
            {
              name: 'Цели',
              href: PATH_DASHBOARD.goals.root,
            },
            { name: 'Новая цель' },
          ]}
        />
        <GoalNewEditForm />
      </Container>
    </Page>
  );
}
