import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import SectionContainer from '../ui/section-container.jsx';

/** 애니메이션 재생 시간 (ms) */
const TRANSITION_DURATION = 500;

/** 데모 박스가 놓이는 무대 영역의 공통 스타일 */
const STAGE_SX = {
  position: 'relative',
  height: 140,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  bgcolor: 'action.hover',
  borderRadius: 1,
};

/** 애니메이션 대상이 되는 박스의 공통 스타일 */
const BOX_SX = {
  width: 80,
  height: 80,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  bgcolor: 'primary.main',
  color: 'primary.contrastText',
  borderRadius: 2,
  fontSize: '0.875rem',
  fontWeight: 600,
};

/**
 * AnimationSection 컴포넌트
 *
 * MUI 의 Fade / Grow / Slide 트랜지션과 CSS 키프레임 애니메이션을 보여 주는 섹션이다.
 * 각 카드의 버튼을 누르면 해당 애니메이션이 재생되며,
 * 네 번째 카드는 MUI 트랜지션(Grow)과 CSS 애니메이션(pulse)을 함께 사용한다.
 *
 * Props: 없음
 *
 * Example usage:
 * <AnimationSection />
 */
function AnimationSection() {
  const slideStageRef = useRef(null);
  const [isFadeVisible, setIsFadeVisible] = useState(true);
  const [isGrowVisible, setIsGrowVisible] = useState(true);
  const [isSlideVisible, setIsSlideVisible] = useState(true);
  const [isComboVisible, setIsComboVisible] = useState(true);

  /** Fade 애니메이션을 재생한다. */
  const handleFadeToggle = () => {
    setIsFadeVisible((prevVisible) => !prevVisible);
  };

  /** Grow 애니메이션을 재생한다. */
  const handleGrowToggle = () => {
    setIsGrowVisible((prevVisible) => !prevVisible);
  };

  /** Slide 애니메이션을 재생한다. */
  const handleSlideToggle = () => {
    setIsSlideVisible((prevVisible) => !prevVisible);
  };

  /** Grow + CSS 애니메이션 조합을 재생한다. */
  const handleComboToggle = () => {
    setIsComboVisible((prevVisible) => !prevVisible);
  };

  return (
    <SectionContainer
      id="animation"
      title="Animation"
      description="MUI 트랜지션 3종과 CSS 키프레임 애니메이션입니다. 버튼을 누르면 애니메이션이 재생됩니다."
    >
      <Grid container spacing={ { xs: 2.5, md: 3 } }>
        <Grid size={ { xs: 12, sm: 6, md: 3 } }>
          <Typography sx={ { mb: 1, fontSize: '0.875rem', fontWeight: 600 } }>
            Fade
          </Typography>

          <Box sx={ STAGE_SX }>
            <Fade in={ isFadeVisible } timeout={ TRANSITION_DURATION }>
              <Paper elevation={ 3 } sx={ BOX_SX }>Fade</Paper>
            </Fade>
          </Box>

          <Button fullWidth size="small" variant="outlined" onClick={ handleFadeToggle } sx={ { mt: 1 } }>
            { isFadeVisible ? '사라지기' : '나타나기' }
          </Button>
        </Grid>

        <Grid size={ { xs: 12, sm: 6, md: 3 } }>
          <Typography sx={ { mb: 1, fontSize: '0.875rem', fontWeight: 600 } }>
            Grow
          </Typography>

          <Box sx={ STAGE_SX }>
            <Grow in={ isGrowVisible } timeout={ TRANSITION_DURATION }>
              <Paper elevation={ 3 } sx={ BOX_SX }>Grow</Paper>
            </Grow>
          </Box>

          <Button fullWidth size="small" variant="outlined" onClick={ handleGrowToggle } sx={ { mt: 1 } }>
            { isGrowVisible ? '작아지기' : '커지기' }
          </Button>
        </Grid>

        <Grid size={ { xs: 12, sm: 6, md: 3 } }>
          <Typography sx={ { mb: 1, fontSize: '0.875rem', fontWeight: 600 } }>
            Slide
          </Typography>

          <Box ref={ slideStageRef } sx={ STAGE_SX }>
            <Slide
              direction="up"
              in={ isSlideVisible }
              timeout={ TRANSITION_DURATION }
              container={ slideStageRef.current }
            >
              <Paper elevation={ 3 } sx={ BOX_SX }>Slide</Paper>
            </Slide>
          </Box>

          <Button fullWidth size="small" variant="outlined" onClick={ handleSlideToggle } sx={ { mt: 1 } }>
            { isSlideVisible ? '내려가기' : '올라오기' }
          </Button>
        </Grid>

        <Grid size={ { xs: 12, sm: 6, md: 3 } }>
          <Typography sx={ { mb: 1, fontSize: '0.875rem', fontWeight: 600 } }>
            Grow + CSS
          </Typography>

          <Box sx={ STAGE_SX }>
            <Grow in={ isComboVisible } timeout={ TRANSITION_DURATION }>
              <Paper
                elevation={ 3 }
                sx={ {
                  ...BOX_SX,
                  '@keyframes pulse': {
                    '0%, 100%': {
                      transform: 'scale(1)',
                      boxShadow: '0 0 0 0 rgba(25, 118, 210, 0.5)',
                    },
                    '50%': {
                      transform: 'scale(1.08)',
                      boxShadow: '0 0 0 12px rgba(25, 118, 210, 0)',
                    },
                  },
                  animation: 'pulse 1.6s ease-in-out infinite',
                } }
              >
                Pulse
              </Paper>
            </Grow>
          </Box>

          <Button fullWidth size="small" variant="outlined" onClick={ handleComboToggle } sx={ { mt: 1 } }>
            { isComboVisible ? '숨기기' : '보이기' }
          </Button>
        </Grid>
      </Grid>
    </SectionContainer>
  );
}

export default AnimationSection;
