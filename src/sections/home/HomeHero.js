import { m } from 'framer-motion';
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Iconify from '../../components/Iconify';
import { MotionContainer, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
  }
}));

const ContentStyle = styled((props) => <Stack
  spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  backgroundImage: 'url(images/hero.jpg)',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left'
  }
}));
// ----------------------------------------------------------------------

export default function HomeHero() {
  return (
    <MotionContainer>
      <RootStyle>
        <Container>
          <ContentStyle>
            <m.div variants={varFade().inRight}>
              <Typography variant="h1" sx={{ color: 'common.white' }}>
                Начни<br/>
                новую цель <br/> с
                <Typography component="span" variant="h1"
                            sx={{ color: 'primary.main' }}>
                  &nbsp;Tracker Goal
                </Typography>
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography sx={{ color: 'common.white' }}>
                Достигай целей, делись результатами, становись лучше.
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <NextLink href={PATH_DASHBOARD.root} passHref>
                <Button
                  size="large"
                  variant="contained"
                  startIcon={<Iconify icon={'eva:flash-fill'} width={20}
                                      height={20}/>}
                >
                  Изменить жизнь
                </Button>
              </NextLink>
            </m.div>

          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }}/>
    </MotionContainer>
  );
}
