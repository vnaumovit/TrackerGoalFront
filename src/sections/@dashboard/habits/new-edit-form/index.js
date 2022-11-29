import PropTypes from 'prop-types';
import * as Yup from 'yup';
import React, { useEffect, useMemo, useState } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Card, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// difference
import { FormProvider } from '../../../../components/hook-form';
import { addGoal } from '../../../../redux/slices/goal';
import { yupResolver } from '@hookform/resolvers/yup';
import AlertError from './AlertError';
import HabitNewEditDetails from './HabitNewEditDetails';


// ----------------------------------------------------------------------

HabitNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentHabit: PropTypes.object
};

export default function HabitNewEditForm({ isEdit, currentHabit }) {
  const [open, setOpen] = useState(false);
  const { push } = useRouter();

  const NewGoalSchema = Yup.object().shape({
    title: Yup.string().required('Текст обязателен'),
    finishTitle: Yup.string().required('Текст обязателен'),
    description: Yup.string().required('Текст обязателен')
  });

  const defaultValues = useMemo(
    () => ({
      id: currentHabit?.id || null,
      name: currentHabit?.name || '',
      frequency: [],
    }),
    [currentHabit]
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

  async function saveGoal(data, goalGroups, isEdit) {
    data.goalGroup === null ? data.goalGroup = goalGroups[0] : goalGroups.find(g => data.goalGroup === g.id)
    data.stages = data.stages.filter(s => s.name !== '' && s.description !== '')
    await addGoal(data, isEdit)
  }

  const handleSave = async (data) => {
    try {
      reset();
      await saveGoal(data, isEdit);
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
      await saveGoal(data, isEdit);
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
          <HabitNewEditDetails/>
        </Card>
      </FormProvider>
    </div>
  );
};
