import { useState } from 'react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import TuneIcon from '@mui/icons-material/Tune';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import SectionContainer from '../ui/section-container.jsx';

/** 사이드바 너비 (px) */
const SIDEBAR_WIDTH = 260;

/** 사이드바에 표시할 네비게이션 링크 목록 (페이지 내 섹션으로 이동) */
const NAV_LINKS = [
  { id: 'button', label: 'Button', icon: SmartButtonIcon },
  { id: 'input', label: 'Input', icon: TextFieldsIcon },
  { id: 'card', label: 'Card', icon: ViewModuleIcon },
  { id: 'slider', label: 'Slider', icon: TuneIcon },
  { id: 'animation', label: 'Animation', icon: AutoAwesomeIcon },
];

/** 사이드바가 열릴 수 있는 위치 목록 */
const ANCHOR_OPTIONS = [
  { value: 'left', label: '왼쪽' },
  { value: 'right', label: '오른쪽' },
];

/**
 * SidebarSection 컴포넌트
 *
 * MUI Drawer 로 만든 사이드바 섹션이다.
 * 버튼으로 열고 닫을 수 있으며, 왼쪽/오른쪽 중 열리는 위치를 고를 수 있다.
 * 사이드바 안의 링크를 누르면 페이지의 해당 섹션으로 이동한다.
 *
 * Props: 없음
 *
 * Example usage:
 * <SidebarSection />
 */
function SidebarSection() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState('left');

  /** 사이드바 열림 상태를 전환한다. */
  const handleSidebarToggle = () => {
    setIsSidebarOpen((prevOpen) => !prevOpen);
  };

  /** 사이드바를 닫는다. */
  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  /** 사이드바가 열리는 위치를 변경한다. (선택 해제는 무시) */
  const handleAnchorChange = (event, newAnchor) => {
    if (newAnchor === null) {
      return;
    }
    setAnchorPosition(newAnchor);
  };

  return (
    <SectionContainer
      id="sidebar"
      title="Sidebar"
      description="버튼으로 사이드바를 열고 닫습니다. 열리는 위치를 왼쪽/오른쪽 중에서 고를 수 있습니다."
    >
      <Stack
        direction={ { xs: 'column', sm: 'row' } }
        spacing={ 2 }
        alignItems={ { xs: 'stretch', sm: 'center' } }
      >
        <Button
          variant="contained"
          startIcon={ <MenuOpenIcon /> }
          onClick={ handleSidebarToggle }
        >
          사이드바 { isSidebarOpen ? '닫기' : '열기' }
        </Button>

        <ToggleButtonGroup
          exclusive
          size="small"
          color="primary"
          value={ anchorPosition }
          onChange={ handleAnchorChange }
          aria-label="사이드바 위치 선택"
        >
          { ANCHOR_OPTIONS.map((option) => (
            <ToggleButton key={ option.value } value={ option.value }>
              { option.label }
            </ToggleButton>
          )) }
        </ToggleButtonGroup>
      </Stack>

      <Drawer
        anchor={ anchorPosition }
        open={ isSidebarOpen }
        onClose={ handleSidebarClose }
        slotProps={ { paper: { sx: { width: SIDEBAR_WIDTH } } } }
      >
        <Box
          sx={ {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.5,
          } }
        >
          <Typography sx={ { fontSize: '1rem', fontWeight: 600 } }>
            바로가기
          </Typography>

          <IconButton
            size="small"
            aria-label="사이드바 닫기"
            onClick={ handleSidebarClose }
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider />

        <List>
          { NAV_LINKS.map((link) => {
            const LinkIcon = link.icon;

            return (
              <ListItem key={ link.id } disablePadding>
                <ListItemButton
                  component="a"
                  href={ `#${link.id}` }
                  onClick={ handleSidebarClose }
                >
                  <ListItemIcon>
                    <LinkIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={ link.label } />
                </ListItemButton>
              </ListItem>
            );
          }) }
        </List>

        <Divider />

        <Box sx={ { px: 2, py: 1.5 } }>
          <Typography
            sx={ {
              color: 'text.secondary',
              fontSize: '0.75rem',
              lineHeight: 1.6,
            } }
          >
            현재 위치: { anchorPosition === 'left' ? '왼쪽' : '오른쪽' }
          </Typography>
        </Box>
      </Drawer>
    </SectionContainer>
  );
}

export default SidebarSection;
