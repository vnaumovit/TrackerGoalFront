import { useEffect } from 'react';
import { paramCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getGoal, getGoals } from '../../../../redux/slices/goal';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import GoalNewEditForm from '../../../../sections/@dashboard/goals/new-edit-form/index';

// ----------------------------------------------------------------------

EcommerceProductEdit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EcommerceProductEdit() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const { query } = useRouter();

  const { id } = query;

  const { goals } = useSelector((state) => state.goal);

  const currentGoal = goals.find((goal) => paramCase(goal.id) === id);

  useEffect(() => {
    dispatch(getGoal(id));
  }, [dispatch]);

  return (
    <Page title="Ecommerce: Edit product">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit product"
          links={[
            { name: 'Панель', href: PATH_DASHBOARD.root },
            {
              name: 'Цели',
              href: PATH_DASHBOARD.goals.list,
            },
            { name: currentGoal?.name },
          ]}
        />

        <GoalNewEditForm isEdit currentGoal={currentGoal} />
      </Container>
    </Page>
  );
}
