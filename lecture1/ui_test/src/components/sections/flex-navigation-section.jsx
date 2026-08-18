import Box from '@mui/material/Box';
import SectionContainer from '../ui/section-container.jsx';

/** 네비게이션에 표시할 메뉴 목록 */
const MENU_ITEMS = ['홈', '소개', '상품', '연락처', '설정'];

/** 네비게이션 바 배경색 */
const NAV_BACKGROUND = '#2d3748';

/** 메뉴 항목 기본 글자색 (연한 회색) */
const MENU_COLOR = '#a0aec0';

/**
 * FlexNavigationSection 컴포넌트
 *
 * flexbox 로만 구성한 네비게이션 바 섹션이다.
 * 바깥 박스는 justify-content: space-between 으로 로고와 메뉴를 양 끝에 배치하고,
 * 메뉴 박스는 gap 15px 로 5개 항목을 가로 정렬한다.
 *
 * 구조:
 * [ 네비게이션 박스 (display: flex, space-between) ]
 *   ├── 로고 박스        (왼쪽)
 *   └── 메뉴들 박스      (오른쪽, display: flex, gap 15px)
 *
 * Props: 없음
 *
 * Example usage:
 * <FlexNavigationSection />
 */
function FlexNavigationSection() {
  return (
    <SectionContainer
      id="flex-navigation"
      title="Flex Navigation"
      description="flexbox 의 space-between 으로 로고와 메뉴를 양 끝에 배치한 네비게이션 바입니다."
    >
      { /* 큰 네비게이션 박스 */ }
      <Box
        component="nav"
        sx={ {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '60px',
          px: { xs: 2, md: 3 },
          bgcolor: NAV_BACKGROUND,
          borderRadius: 2,
          overflowX: 'auto',
        } }
      >
        { /* 1. 로고 박스 */ }
        <Box
          sx={ {
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            color: '#ffffff',
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '0.02em',
          } }
        >
          MyWebsite
        </Box>

        { /* 2. 메뉴들 박스 */ }
        <Box
          sx={ {
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            flexShrink: 0,
            ml: 3,
          } }
        >
          { MENU_ITEMS.map((menuName) => (
            <Box
              key={ menuName }
              component="button"
              type="button"
              sx={ {
                p: 0,
                border: 'none',
                bgcolor: 'transparent',
                color: MENU_COLOR,
                fontSize: '16px',
                fontFamily: 'inherit',
                lineHeight: 1.4,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                '&:hover': { color: '#ffffff' },
                '&:focus-visible': { color: '#ffffff', outline: '2px solid #ffffff', outlineOffset: '4px' },
              } }
            >
              { menuName }
            </Box>
          )) }
        </Box>
      </Box>
    </SectionContainer>
  );
}

export default FlexNavigationSection;
