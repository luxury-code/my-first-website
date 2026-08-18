import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Snackbar from '@mui/material/Snackbar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import SectionContainer from '../ui/section-container.jsx';

/** 네비게이션 메뉴 목록 */
const MENU_ITEMS = ['홈', '소개', '서비스', '연락처'];

/** 모바일 서랍 메뉴 너비 (px) */
const DRAWER_WIDTH = 240;

/** 알림창 자동 닫힘 시간 (ms) */
const AUTO_HIDE_DURATION = 3000;

/**
 * NavigationSection 컴포넌트
 *
 * MUI AppBar 와 Toolbar 로 구성한 네비게이션 바 섹션이다.
 * 데스크톱에서는 메뉴가 가로로 나열되고, 모바일(md 미만)에서는
 * 햄버거 버튼을 눌러 서랍(Drawer) 메뉴로 열린다.
 * 메뉴를 클릭하면 선택한 메뉴명을 알림창으로 표시한다.
 *
 * Props: 없음
 *
 * Example usage:
 * <NavigationSection />
 */
function NavigationSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  /** 서랍 메뉴 열림 상태를 전환한다. */
  const handleDrawerToggle = () => {
    setIsDrawerOpen((prevOpen) => !prevOpen);
  };

  /** 메뉴 클릭 시 알림창을 띄우고 서랍 메뉴를 닫는다. */
  const handleMenuClick = (menuName) => {
    setAlertMessage(`${menuName} 메뉴를 선택했습니다.`);
    setIsAlertOpen(true);
    setIsDrawerOpen(false);
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
      id="navigation"
      title="Navigation"
      description="AppBar 와 Toolbar 로 만든 네비게이션 바입니다. 화면 폭을 좁히면 햄버거 메뉴로 바뀝니다."
    >
      <AppBar position="static" sx={ { borderRadius: 1 } }>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={ {
              flexGrow: 1,
              fontSize: { xs: '1rem', md: '1.25rem' },
              fontWeight: 600,
            } }
          >
            UI Test
          </Typography>

          { isMobile ? (
            <IconButton
              color="inherit"
              edge="end"
              aria-label="메뉴 열기"
              onClick={ handleDrawerToggle }
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={ { display: 'flex', gap: 1 } }>
              { MENU_ITEMS.map((menuName) => (
                <Button
                  key={ menuName }
                  color="inherit"
                  onClick={ () => handleMenuClick(menuName) }
                >
                  { menuName }
                </Button>
              )) }
            </Box>
          ) }
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={ isDrawerOpen }
        onClose={ handleDrawerToggle }
        slotProps={ { paper: { sx: { width: DRAWER_WIDTH } } } }
      >
        <Box sx={ { py: 2 } }>
          <Typography
            variant="h6"
            component="div"
            sx={ { px: 2, pb: 2, fontWeight: 600 } }
          >
            메뉴
          </Typography>

          <Divider />

          <List>
            { MENU_ITEMS.map((menuName) => (
              <ListItem key={ menuName } disablePadding>
                <ListItemButton onClick={ () => handleMenuClick(menuName) }>
                  <ListItemText primary={ menuName } />
                </ListItemButton>
              </ListItem>
            )) }
          </List>
        </Box>
      </Drawer>

      <Snackbar
        open={ isAlertOpen }
        autoHideDuration={ AUTO_HIDE_DURATION }
        onClose={ handleAlertClose }
        anchorOrigin={ { vertical: 'bottom', horizontal: 'center' } }
      >
        <Alert
          onClose={ handleAlertClose }
          severity="info"
          variant="filled"
          sx={ { width: '100%' } }
        >
          { alertMessage }
        </Alert>
      </Snackbar>
    </SectionContainer>
  );
}

export default NavigationSection;
