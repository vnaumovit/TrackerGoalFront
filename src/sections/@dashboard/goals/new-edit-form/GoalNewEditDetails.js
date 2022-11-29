import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Card, Grid, Stack, TextField, Typography } from '@mui/material';
import {
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFUploadMultiFile
} from '../../../../components/hook-form';
import { useFormContext, Controller } from 'react-hook-form';
import DatePicker from '@mui/lab/DatePicker';
// form

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

GoalNewEditDetails.propTypes = {
  isEdit: PropTypes.bool,
  currentGoal: PropTypes.object
};

// eslint-disable-next-line react/prop-types
export default function GoalNewEditDetails({goalGroups}) {
  const { control, setValue, watch } = useFormContext();
  const statuses = [
    'Создана',
    'Начата',
    'Приостановлена',
    'Успех',
    'Провал'
  ]

  const values = watch();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setValue(
        'images',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [setValue]
  );

  const handleRemoveAll = () => {
    setValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images?.filter((_file) => _file !== file);
    setValue('images', filteredItems);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={6} display={'flex'} justifyContent={'center'}>
        <Grid item xs={12} md={10}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <div>
                <LabelStyle>Сформулируйте вашу цель</LabelStyle>
                <RHFTextField name="title" placeholder="Например, открыть кафе"/>
              </div>

              <div>
                <LabelStyle>Критерий завершения цели</LabelStyle>
                <RHFTextField name="finishTitle" placeholder="Например, кафе запущено и функционирует"/>
              </div>

              <div>
                <LabelStyle>Описание</LabelStyle>
                <RHFEditor simple name="description"/>
              </div>

              <div>
                <LabelStyle>Фото к цели</LabelStyle>
                <RHFUploadMultiFile
                  name="images"
                  showPreview
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                />
              </div>
            </Stack>
          </Card>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <RHFSelect name="status" label="Статус цели">
                {statuses.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </RHFSelect>
              <Stack spacing={3} mt={2}>
                <RHFSelect name="goalGroup" label="Группа цели">
                   {goalGroups.map((goalGroup) => (
                    <option key={goalGroup.id} value={goalGroup.id}>
                      {goalGroup.name}
                    </option>
                  ))}
                </RHFSelect>
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label="Дата завершения цели"
                      inputFormat="dd/MM/yyyy"
                      renderInput={(params) => (
                        <TextField fullWidth {...params} error={!!error}
                                   helperText={error?.message}/>
                      )}
                    />
                  )}
                />
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
