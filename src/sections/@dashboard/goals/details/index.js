import { Box, Card, Divider, Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Markdown from '../../../../components/Markdown';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function GoalDetails({ goal, error }) {

  const theme = useTheme();

  const [value, setValue] = useState('1');

  if (!goal) {
    return null;
  }

  const {
    title,
    finishTitle,
    description,
    status,
    goalGroup,
    endDate,
    stages,
    images
  } = goal;

  console.log(stages)
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} >
          <Card sx={{ p: 3,mb: 3,  background: '#f1f1f1',  color: '#000000', textShadow: '1px 0px 1px #111'}} >
            <Box sx={{ p: 2 }}>
              <h1 style={{ fontSize: 30 }}>{title}</h1>
            </Box>
            <Divider/>
            <Box sx={{ p: 2 }}>
              <h2>Описание цели</h2>
              <Markdown children={description}/>
            </Box>
            <Box sx={{ p: 2 }}>
              <Divider/>
              <div>
                <h2>Критерий завершения🚩</h2>
                <Typography sx={{ fontSize: 25 }}>{finishTitle}</Typography>
              </div>
            </Box>
          </Card>

          <Card sx={{ p: 3, background: '#000000',  color: '#ffffff', textShadow: '1px 0px 1px #111'}} >
            <Box sx={{ p: 2 }}>
              <h2>Этапы цели</h2>
              {stages.map((s, index) => (
                // eslint-disable-next-line react/jsx-key
                <Stack sx={{mb: 3}}>
                  <Typography>{index + 1 + '. ' + s.name}</Typography>
                  <Typography>{s.description}</Typography>
                </Stack>
              ))}
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} lg={4} >
          <Card sx={{ mb: 3, p: 3, background: '#000000', color: '#ffffff', textShadow: '0px 1px 1px #111'}}>
            <h2>Статус цели: </h2>
            <Typography sx={{fontSize: 20}}>{status}</Typography>
          </Card>
          <Card sx={{ p: 3, background: '#ff8989', color: '#ffffff', textShadow: '0px 1px 1px #111'}}>
            <h2>Дата завершения цели</h2>
            <Typography>{endDate ? endDate : 'Дата не выбрана'}</Typography>
          </Card>
        </Grid>
      </Grid>

      {
        error && <Typography variant="h6">404 Product not found</Typography>
      }
    </>)
    ;
}