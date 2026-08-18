import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SectionContainer from '../ui/section-container.jsx';
import heroImage from '../../assets/hero.png';
import reactLogo from '../../assets/react.svg';
import viteLogo from '../../assets/vite.svg';

/** 슬라이드에 표시할 이미지 목록 */
const SLIDES = [
  { id: 'react', title: 'React', image: reactLogo },
  { id: 'vite', title: 'Vite', image: viteLogo },
  { id: 'mui', title: 'MUI', image: heroImage },
];

/** 슬라이드 영역 높이 (px) */
const SLIDE_HEIGHT = 220;

/**
 * SwipeSection 컴포넌트
 *
 * react-swipeable 로 만든 이미지 슬라이드 섹션이다.
 * 터치 또는 마우스로 좌우로 스와이프하면 슬라이드가 넘어가며,
 * 이전/다음 버튼과 인디케이터로도 이동할 수 있다. 마지막에서 넘기면 처음으로 순환한다.
 *
 * Props: 없음
 *
 * Example usage:
 * <SwipeSection />
 */
function SwipeSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastGesture, setLastGesture] = useState('');

  /** 다음 슬라이드로 이동한다. (마지막 다음은 처음) */
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDES.length);
  };

  /** 이전 슬라이드로 이동한다. (처음 이전은 마지막) */
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + SLIDES.length) % SLIDES.length);
  };

  /** 인디케이터를 눌러 특정 슬라이드로 이동한다. */
  const handleIndicatorClick = (index) => () => {
    setCurrentIndex(index);
    setLastGesture('인디케이터 선택');
  };

  /** 이전 버튼 클릭 처리 */
  const handlePreviousClick = () => {
    goToPrevious();
    setLastGesture('이전 버튼');
  };

  /** 다음 버튼 클릭 처리 */
  const handleNextClick = () => {
    goToNext();
    setLastGesture('다음 버튼');
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      goToNext();
      setLastGesture('왼쪽으로 스와이프');
    },
    onSwipedRight: () => {
      goToPrevious();
      setLastGesture('오른쪽으로 스와이프');
    },
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  return (
    <SectionContainer
      id="swipe"
      title="Swipe"
      description="이미지를 좌우로 밀어 보세요. 마우스로 끌어도 넘어가며, 버튼으로도 이동할 수 있습니다."
    >
      <Box
        { ...swipeHandlers }
        sx={ {
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 2,
          bgcolor: 'action.hover',
          cursor: 'grab',
          touchAction: 'pan-y',
          userSelect: 'none',
          '&:active': { cursor: 'grabbing' },
        } }
      >
        <Box
          sx={ {
            display: 'flex',
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 0.4s ease',
          } }
        >
          { SLIDES.map((slide) => (
            <Box
              key={ slide.id }
              sx={ {
                flex: '0 0 100%',
                height: SLIDE_HEIGHT,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                p: 2,
              } }
            >
              <Box
                component="img"
                src={ slide.image }
                alt={ `${slide.title} 이미지` }
                draggable={ false }
                sx={ { maxHeight: 120, maxWidth: '100%', objectFit: 'contain' } }
              />
              <Typography sx={ { fontSize: '1rem', fontWeight: 600 } }>
                { slide.title }
              </Typography>
            </Box>
          )) }
        </Box>

        <IconButton
          aria-label="이전 슬라이드"
          onClick={ handlePreviousClick }
          sx={ {
            position: 'absolute',
            top: '50%',
            left: 8,
            transform: 'translateY(-50%)',
            bgcolor: 'background.paper',
            '&:hover': { bgcolor: 'background.paper' },
          } }
        >
          <ChevronLeftIcon />
        </IconButton>

        <IconButton
          aria-label="다음 슬라이드"
          onClick={ handleNextClick }
          sx={ {
            position: 'absolute',
            top: '50%',
            right: 8,
            transform: 'translateY(-50%)',
            bgcolor: 'background.paper',
            '&:hover': { bgcolor: 'background.paper' },
          } }
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>

      <Stack
        direction="row"
        spacing={ 1 }
        justifyContent="center"
        alignItems="center"
        sx={ { mt: 2 } }
      >
        { SLIDES.map((slide, index) => (
          <Box
            key={ slide.id }
            component="button"
            type="button"
            aria-label={ `${index + 1}번 슬라이드로 이동` }
            onClick={ handleIndicatorClick(index) }
            sx={ {
              width: index === currentIndex ? 24 : 10,
              height: 10,
              p: 0,
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer',
              bgcolor: index === currentIndex ? 'primary.main' : 'action.disabled',
              transition: 'width 0.3s ease, background-color 0.3s ease',
            } }
          />
        )) }
      </Stack>

      <Typography
        sx={ {
          mt: 1.5,
          color: 'text.secondary',
          fontSize: { xs: '0.8125rem', md: '0.875rem' },
          textAlign: 'center',
          lineHeight: 1.6,
        } }
      >
        { currentIndex + 1 } / { SLIDES.length } · { SLIDES[currentIndex].title }
        { lastGesture && ` (${lastGesture})` }
      </Typography>
    </SectionContainer>
  );
}

export default SwipeSection;
