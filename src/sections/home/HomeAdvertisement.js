import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Box, Container, Typography } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 456,
  margin: 'auto',
  overflow: 'hidden',
  paddingBottom: theme.spacing(10),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.primary.dark} 100%)`,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    maxWidth: '100%',
    paddingBottom: 0,
    alignItems: 'center',
  },
}));

// ----------------------------------------------------------------------

export default function HomeAdvertisement() {
  return (
    <Container component={MotionViewport}>
      <ContentStyle>
        <Box
          component={m.div}
          variants={varFade().inUp}
          sx={{
            mb: { xs: 3, md: 0 },
          }}
        >
          <m.div animate={{ y: [-20, 0, -20] }} transition={{ duration: 4, repeat: Infinity }}>
            <Image
              visibleByDefault
              alt="rocket"
              src="https://minimal-assets-api.vercel.app/assets/images/home/rocket.png"
              disabledEffect
              sx={{ maxWidth: 460 }}
            />
          </m.div>
        </Box>

        <Box
          sx={{
            pl: { md: 10 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Box component={m.div} variants={varFade().inDown} sx={{ color: 'common.white', mb: 5 }}>
            <Typography variant="h2">
              Начни уже сегодня,
              <br /> хватит откладывать
            </Typography>
          </Box>
        </Box>
      </ContentStyle>
    </Container>
  );
}
