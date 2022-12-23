import PropTypes from 'prop-types';
import * as Yup from 'yup';
import React, { useEffect, useMemo, useState } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// difference
import GoalNewEditDetails from './GoalNewEditDetails';
import { FormProvider } from '../../../../components/hook-form';
import { addGoal, getGoalGroups } from '../../../../redux/slices/goal';
import { yupResolver } from '@hookform/resolvers/yup';
import AlertError from './AlertError';
import StageNewEditDetails from '../details/StageNewEditDetails';
import { useDispatch, useSelector } from 'react-redux';


// ----------------------------------------------------------------------

GoalNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentGoal: PropTypes.object
};

export default function GoalNewEditForm({ isEdit, currentGoal }) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const { push } = useRouter();
  const { goalGroups } = useSelector((state) => state.goal);

  useEffect(() => {
    dispatch(getGoalGroups());
  }, [dispatch]);

  const NewGoalSchema = Yup.object().shape({
    title: Yup.string().required('Текст обязателен'),
    finishTitle: Yup.string().required('Текст обязателен'),
    description: Yup.string().required('Текст обязателен')
  });

  const defaultValues = useMemo(
    () => ({
      id: currentGoal?.id || null,
      title: currentGoal?.title || '',
      finishTitle: currentGoal?.finishTitle || '',
      description: currentGoal?.description || '',
      images: currentGoal?.images || [],
      status: currentGoal?.status || 'Создана',
      endDate: currentGoal?.endDate || null,
      goalGroup: currentGoal?.goalGroup.id || null,
      stages: currentGoal?.stages || [{ name: '', description: '' }]
    }),
    [currentGoal, goalGroups]
  );

  const methods = useForm({
    resolver: yupResolver(NewGoalSchema),
    defaultValues
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  async function saveGoal(data) {
    if (data.goalGroup === null) {
      data.goalGroup = goalGroups[0]
    } else {
      data.goalGroup = goalGroups.find(g => data.goalGroup === g.id);
    }
    data.stages = data.stages.filter(s => s.name !== '' && s.description !== '')
    await addGoal(data, isEdit)
  }

  const handleSave = async (data) => {
    try {
      reset();
      await saveGoal(data);
      push(PATH_DASHBOARD.goals.list);
    } catch (error) {
      setOpen(true)
      console.log(error)
    }
  };

  const handleDraft = async (data) => {
    try {
      reset();
      data.status = 'Приостановлена'
      await saveGoal(data);
      push(PATH_DASHBOARD.goals.list);
    } catch (error) {
      setOpen(true)
      console.log(error)
    }
  };


  return (
    <div>
      <AlertError open={open} setOpen={setOpen}/>
      <FormProvider methods={methods}>
        <Card>
          <GoalNewEditDetails goalGroups={goalGroups}
                              currentGoal={currentGoal}/>
          <StageNewEditDetails/>
        </Card>
        <Stack justifyContent="flex-end" direction="row" spacing={2}
               sx={{ mt: 3 }}>
          <LoadingButton
            color="inherit"
            size="large"
            variant="contained"
            loading={isSubmitting}
            onClick={handleSubmit(handleDraft)}
          >
            Save as Draft
          </LoadingButton>
          <LoadingButton
            size="large"
            variant="contained"
            loading={isSubmitting}
            onClick={handleSubmit(handleSave)}
          >
            {isEdit ? 'Update' : 'Create'} & Send
          </LoadingButton>
        </Stack>
      </FormProvider>
    </div>
  );
};
