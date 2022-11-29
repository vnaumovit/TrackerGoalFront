import React from 'react';
import { RHFTextField } from '../../../../components/hook-form';
import {
  Box,
  Button,
  Card,
  Divider, FormLabel,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import Iconify from '../../../../components/Iconify';
import { useFieldArray, useFormContext } from 'react-hook-form';

export default function StageNewEditDetails() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stages'
  });

  const handleAdd = () => {
    append({
      name: '',
      description: ''
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={6} display={'flex'} justifyContent={'center'}>
        <Grid item xs={12} md={10}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h2" sx={{ mb: 3 }}>
              План действий
            </Typography>

            <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }}/>}
                   spacing={3}>
              {fields.map((stage, index) => (
                <Stack key={stage.id}  spacing={1.5} >
                  <Typography variant="h4">
                    {index + 1}
                  </Typography>
                  <FormLabel>Название этапа</FormLabel>
                  <RHFTextField
                    size="small"
                    name={`stages[${index}].name`}
                    InputLabelProps={{ shrink: true }}
                  />

                  <FormLabel>Описание этапа</FormLabel>
                  <RHFTextField
                    size="small"
                    name={`stages[${index}].description`}

                    InputLabelProps={{ shrink: true }}
                  />

                  <Button
                    size="small"
                    color="error"
                    style={{display: index === 0 ? 'none' : 'flow'}}
                    startIcon={<Iconify icon="eva:trash-2-outline"/>}
                    onClick={() => handleRemove(index)}
                  >
                    Удалить
                  </Button>
                </Stack>
              ))}
            </Stack>

            <Divider sx={{ my: 3, borderStyle: 'dashed' }}/>

            <Stack
              spacing={2}
              direction={{ xs: 'column-reverse', md: 'row' }}
              alignItems={{ xs: 'flex-start', md: 'center' }}
            >
              <Button size="small" startIcon={<Iconify icon="eva:plus-fill"/>}
                      onClick={handleAdd} sx={{ flexShrink: 0 }}>
                Добавить новый этап
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}