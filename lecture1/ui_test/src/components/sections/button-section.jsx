import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SectionContainer from '../ui/section-container.jsx';

/** 버튼 스타일 변형 목록 */
const BUTTON_VARIANTS = ['contained', 'outlined', 'text'];

/** 버튼 색상 목록 */
const BUTTON_COLORS = ['primary', 'secondary', 'error'];

/** 알림창 자동 닫힘 시간 (ms) */
const AUTO_HIDE_DURATION = 3000;

/**
 * ButtonSection 컴포넌트
 *
 * MUI Button 의 variant 3종 x color 3종 조합을 보여 주는 섹션이다.
 * 버튼을 클릭하면 어떤 버튼을 눌렀는지 알림창(Snackbar)으로 표시한다.
 *
 * Props: 없음
 *
 * Example usage:
 * <ButtonSection />
 */
function ButtonSection() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');

  /** 버튼 클릭 시 알림창을 띄운다. */
  const handleButtonClick = (variant, color) => {
    setAlertMessage(`variant="${variant}" / color="${color}" 버튼을 클릭했습니다.`);
    setAlertSeverity(color === 'error' ? 'error' : 'info');
    setIsAlertOpen(true);
  };

  /** 알림창을 닫는다. (clickaway 로는 닫지 않음) */
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsAlertOpen(false);
  };

  return (
    <SectionContainer
      id="button"
      title="Button"
      description="variant 3가지와 color 3가지를 조합한 9개 버튼입니다. 클릭하면 알림창이 나타납니다."
    >
      <Stack spacing={ { xs: 2.5, md: 3 } }>
        { BUTTON_VARIANTS.map((variant) => (
          <Box key={ variant }>
            <Typography
              sx={ {
                mb: 1,
                color: 'text.secondary',
                fontSize: { xs: '0.8125rem', md: '0.875rem' },
                fontWeight: 500,
              } }
            >
              variant=&quot;{ variant }&quot;
            </Typography>

            <Grid container spacing={ 2 }>
              { BUTTON_COLORS.map((color) => (
                <Grid key={ color } size={ { xs: 12, sm: 4 } }>
                  <Button
                    fullWidth
                    variant={ variant }
                    color={ color }
                    onClick={ () => handleButtonClick(variant, color) }
                  >
                    { color }
                  </Button>
                </Grid>
              )) }
            </Grid>
          </Box>
        )) }
      </Stack>

      <Snackbar
        open={ isAlertOpen }
        autoHideDuration={ AUTO_HIDE_DURATION }
        onClose={ handleAlertClose }
        anchorOrigin={ { vertical: 'bottom', horizontal: 'center' } }
      >
        <Alert
          onClose={ handleAlertClose }
          severity={ alertSeverity }
          variant="filled"
          sx={ { width: '100%' } }
        >
          { alertMessage }
        </Alert>
      </Snackbar>
    </SectionContainer>
  );
}

export default ButtonSection;
