import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import SectionContainer from '../ui/section-container.jsx';

/** 슬라이더 최솟값 */
const SLIDER_MIN = 0;

/** 슬라이더 최댓값 */
const SLIDER_MAX = 100;

/** 슬라이더 이동 단위 */
const SLIDER_STEP = 5;

/** 슬라이더 초기값 */
const SLIDER_DEFAULT = 50;

/** 슬라이더 구간 표시 목록 */
const SLIDER_MARKS = [
  { value: 0, label: '0' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 75, label: '75' },
  { value: 100, label: '100' },
];

/**
 * SliderSection 컴포넌트
 *
 * MUI Slider 로 만든 값 조절 섹션이다.
 * 0 부터 100 까지 5 단위로 움직이며, 25 간격의 구간 표시(marks)를 제공한다.
 * 현재 값은 오른쪽에 실시간으로 표시된다.
 *
 * Props: 없음
 *
 * Example usage:
 * <SliderSection />
 */
function SliderSection() {
  const [sliderValue, setSliderValue] = useState(SLIDER_DEFAULT);

  /** 슬라이더를 움직일 때 현재 값을 갱신한다. */
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  return (
    <SectionContainer
      id="slider"
      title="Slider"
      description="0 부터 100 까지 5 단위로 조절할 수 있습니다. 손잡이를 움직이면 값이 실시간으로 바뀝니다."
    >
      <Grid container spacing={ { xs: 2.5, md: 3 } } alignItems="center">
        <Grid size={ { xs: 12, md: 8 } }>
          <Box sx={ { px: { xs: 1, md: 2 } } }>
            <Slider
              value={ sliderValue }
              onChange={ handleSliderChange }
              min={ SLIDER_MIN }
              max={ SLIDER_MAX }
              step={ SLIDER_STEP }
              marks={ SLIDER_MARKS }
              valueLabelDisplay="auto"
              aria-label="값 조절 슬라이더"
            />
          </Box>
        </Grid>

        <Grid size={ { xs: 12, md: 4 } }>
          <Box
            sx={ {
              p: 2,
              bgcolor: 'action.hover',
              borderRadius: 1,
              textAlign: 'center',
            } }
          >
            <Box
              sx={ {
                color: 'text.secondary',
                fontSize: '0.75rem',
                fontWeight: 500,
              } }
            >
              현재 값
            </Box>

            <Box
              sx={ {
                mt: 0.5,
                color: 'primary.main',
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 600,
                lineHeight: 1.2,
              } }
            >
              { sliderValue }
            </Box>

            <Box
              sx={ {
                mt: 0.5,
                color: 'text.secondary',
                fontSize: '0.875rem',
                lineHeight: 1.6,
              } }
            >
              { SLIDER_MIN } ~ { SLIDER_MAX } 범위 / { SLIDER_STEP } 단위
            </Box>
          </Box>
        </Grid>
      </Grid>
    </SectionContainer>
  );
}

export default SliderSection;
