import { useEffect } from 'react';
import { paramCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import HabitNewEditDetails
  from '../../../../sections/@dashboard/habits/new-edit-form/HabitNewEditDetails';
// sections

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

  const { habits } = useSelector((state) => state.habit);

  const currentHabit = habits.find((habit) => paramCase(habit.id) === id);

  useEffect(() => {
    // dispatch(getHabit(id));
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
            { name: currentHabit?.name },
          ]}
        />

        <HabitNewEditDetails isEdit currentGoal={currentHabit} />
      </Container>
    </Page>
  );
}
