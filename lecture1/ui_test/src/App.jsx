import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ButtonSection from './components/sections/button-section.jsx';
import InputSection from './components/sections/input-section.jsx';
import NavigationSection from './components/sections/navigation-section.jsx';
import DropdownSection from './components/sections/dropdown-section.jsx';
import CheckboxSection from './components/sections/checkbox-section.jsx';
import RadioSection from './components/sections/radio-section.jsx';
import SliderSection from './components/sections/slider-section.jsx';
import ModalSection from './components/sections/modal-section.jsx';
import CardSection from './components/sections/card-section.jsx';
import DragDropSection from './components/sections/drag-drop-section.jsx';
import ScrollSection from './components/sections/scroll-section.jsx';
import AnimationSection from './components/sections/animation-section.jsx';
import MenuSection from './components/sections/menu-section.jsx';
import SidebarSection from './components/sections/sidebar-section.jsx';
import HoverSection from './components/sections/hover-section.jsx';
import SwipeSection from './components/sections/swipe-section.jsx';
import FlexNavigationSection from './components/sections/flex-navigation-section.jsx';

/**
 * App 컴포넌트
 *
 * UI 요소를 섹션 단위로 순차 추가하기 위한 기본 레이아웃이다.
 *
 * 섹션 추가 방법:
 * 1. src/components/sections/ 에 {요소명}-section.jsx 파일을 만든다.
 *    (내부는 src/components/ui/section-container.jsx 로 감싼다)
 * 2. 이 파일 상단에 import 를 추가한다.
 * 3. 아래 [섹션 추가 지점] 에 순서대로 배치한다.
 *
 * Example usage:
 * import ButtonSection from './components/sections/button-section.jsx';
 * ...
 * <ButtonSection />
 */
function App() {
  return (
    <Box
      sx={ {
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 2, md: 4 },
      } }
    >
      <Container maxWidth="md" sx={ { py: 4, px: { xs: 2, md: 3 } } }>
        <Stack spacing={ { xs: 3, md: 4 } }>
          <Box component="header">
            <Typography
              variant="h1"
              sx={ {
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 600,
                lineHeight: 1.2,
              } }
            >
              UI 요소 테스트
            </Typography>
            <Typography
              sx={ {
                mt: 1,
                color: 'text.secondary',
                fontSize: { xs: '1rem', md: '1.2rem' },
                lineHeight: 1.6,
              } }
            >
              MUI 컴포넌트를 섹션 단위로 하나씩 추가합니다.
            </Typography>
          </Box>

          <ButtonSection />
          <InputSection />
          <NavigationSection />
          <DropdownSection />
          <CheckboxSection />
          <RadioSection />
          <SliderSection />
          <ModalSection />
          <CardSection />
          <DragDropSection />
          <ScrollSection />
          <AnimationSection />
          <MenuSection />
          <SidebarSection />
          <HoverSection />
          <SwipeSection />
          <FlexNavigationSection />

          {/* [섹션 추가 지점] 이 아래에 섹션 컴포넌트를 순서대로 배치한다. */}

        </Stack>
      </Container>
    </Box>
  );
}

export default App;
