import { useRef, useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import SectionContainer from '../ui/section-container.jsx';

/** 스크롤 컨테이너 높이 (px) */
const CONTAINER_HEIGHT = 300;

/** Top 버튼이 나타나기 시작하는 스크롤 위치 (px) */
const SHOW_BUTTON_OFFSET = 120;

/** 스크롤 확인용 더미 콘텐츠 목록 */
const SCROLL_ITEMS = Array.from({ length: 20 }, (unused, index) => ({
  id: `scroll-item-${index + 1}`,
  title: `${index + 1}번 항목`,
  text: '스크롤 동작을 확인하기 위한 예시 문장입니다. 아래로 내려가면 우측 하단에 Top 버튼이 나타납니다.',
}));

/**
 * ScrollSection 컴포넌트
 *
 * 고정 높이(300px)의 스크롤 영역을 만들고, 그 안에 20개의 콘텐츠를 배치한 섹션이다.
 * 일정 위치 이상 스크롤하면 우측 하단에 Top 버튼이 나타나며,
 * 버튼을 누르면 부드럽게 맨 위로 이동한다.
 *
 * Props: 없음
 *
 * Example usage:
 * <ScrollSection />
 */
function ScrollSection() {
  const scrollContainerRef = useRef(null);
  const [isTopButtonVisible, setIsTopButtonVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  /** 스크롤할 때마다 버튼 노출 여부와 진행률을 갱신한다. */
  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const scrollableHeight = scrollHeight - clientHeight;

    setIsTopButtonVisible(scrollTop > SHOW_BUTTON_OFFSET);
    setScrollProgress(
      scrollableHeight > 0 ? Math.round((scrollTop / scrollableHeight) * 100) : 0,
    );
  };

  /** 스크롤 영역을 맨 위로 부드럽게 이동시킨다. */
  const handleScrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SectionContainer
      id="scroll"
      title="Scroll"
      description={ `높이 ${CONTAINER_HEIGHT}px 영역 안에서만 스크롤됩니다. 아래로 내리면 Top 버튼이 나타납니다.` }
    >
      <Box sx={ { position: 'relative' } }>
        <Paper
          ref={ scrollContainerRef }
          onScroll={ handleScroll }
          variant="outlined"
          sx={ {
            height: CONTAINER_HEIGHT,
            overflowY: 'auto',
            px: 2,
            py: 1,
          } }
        >
          { SCROLL_ITEMS.map((item, index) => (
            <Box key={ item.id }>
              <Box sx={ { py: 1.5 } }>
                <Typography
                  sx={ {
                    fontSize: { xs: '0.9375rem', md: '1rem' },
                    fontWeight: 600,
                    lineHeight: 1.4,
                  } }
                >
                  { item.title }
                </Typography>
                <Typography
                  sx={ {
                    mt: 0.5,
                    color: 'text.secondary',
                    fontSize: { xs: '0.8125rem', md: '0.875rem' },
                    lineHeight: 1.6,
                  } }
                >
                  { item.text }
                </Typography>
              </Box>

              { index < SCROLL_ITEMS.length - 1 && <Divider /> }
            </Box>
          )) }
        </Paper>

        <Zoom in={ isTopButtonVisible }>
          <Fab
            size="small"
            color="primary"
            aria-label="맨 위로 이동"
            onClick={ handleScrollToTop }
            sx={ {
              position: 'absolute',
              right: 16,
              bottom: 16,
            } }
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Zoom>
      </Box>

      <Typography
        sx={ {
          mt: 1.5,
          color: 'text.secondary',
          fontSize: { xs: '0.8125rem', md: '0.875rem' },
          lineHeight: 1.6,
        } }
      >
        스크롤 진행률: { scrollProgress }%
      </Typography>
    </SectionContainer>
  );
}

export default ScrollSection;
