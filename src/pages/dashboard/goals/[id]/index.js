import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../../layouts';
import useSettings from '../../../../hooks/useSettings';
import { getGoal } from '../../../../redux/slices/goal';
import Goal from '../../../../sections/@dashboard/goals/details/index'

GoalDetails.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GoalDetails() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const { query } = useRouter();

  const { id } = query;

  const { goal, error} = useSelector((state) => state.goal);

  useEffect(() => {
    dispatch(getGoal(id));
  }, [dispatch]);

  console.log(goal)

  return (
    <Page title="Информация о цели">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Информация о цели"
          links={[
            { name: 'Панель', href: PATH_DASHBOARD.root },
            {
              name: 'Цели',
              href: PATH_DASHBOARD.goals.root
            },
            {
              name: goal?.name
            }
          ]}
        />
        <Goal goal={goal} error={error}/>
      </Container>
    </Page>
  );
};
