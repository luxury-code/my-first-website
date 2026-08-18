import { useState } from 'react';
import ArchiveIcon from '@mui/icons-material/Archive';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SectionContainer from '../ui/section-container.jsx';

/** 메뉴에 표시할 항목 목록 */
const MENU_ITEMS = [
  { id: 'edit', label: '수정', icon: EditIcon },
  { id: 'copy', label: '복사', icon: ContentCopyIcon },
  { id: 'share', label: '공유', icon: ShareIcon },
  { id: 'download', label: '다운로드', icon: DownloadIcon },
  { id: 'archive', label: '보관', icon: ArchiveIcon },
  { id: 'delete', label: '삭제', icon: DeleteIcon, isDanger: true, hasDividerBefore: true },
];

/**
 * MenuSection 컴포넌트
 *
 * MUI Menu 로 만든 드롭다운 메뉴 섹션이다.
 * 버튼을 누르면 아이콘이 포함된 6개 메뉴가 열리고,
 * 항목을 선택하면 어떤 메뉴를 골랐는지 오른쪽에 표시된다.
 *
 * Props: 없음
 *
 * Example usage:
 * <MenuSection />
 */
function MenuSection() {
  const [anchorElement, setAnchorElement] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState('');

  /** 메뉴가 열려 있는지 여부 */
  const isMenuOpen = Boolean(anchorElement);

  /** 클릭한 버튼을 기준으로 메뉴를 연다. */
  const handleMenuOpen = (event) => {
    setAnchorElement(event.currentTarget);
  };

  /** 메뉴를 닫는다. (배경 클릭 / ESC 공통) */
  const handleMenuClose = () => {
    setAnchorElement(null);
  };

  /** 메뉴 항목을 선택하면 결과를 저장하고 메뉴를 닫는다. */
  const handleMenuItemClick = (itemId) => () => {
    setSelectedItemId(itemId);
    setAnchorElement(null);
  };

  /** 선택된 메뉴 항목 객체 (선택 전에는 undefined) */
  const selectedItem = MENU_ITEMS.find((item) => item.id === selectedItemId);
  const SelectedIcon = selectedItem?.icon;

  return (
    <SectionContainer
      id="menu"
      title="Menu"
      description="버튼을 누르면 아이콘이 있는 메뉴가 열립니다. 항목을 고르면 선택 결과가 표시됩니다."
    >
      <Grid container spacing={ { xs: 2.5, md: 3 } } alignItems="center">
        <Grid size={ { xs: 12, md: 6 } }>
          <Button
            variant="contained"
            endIcon={ <MoreVertIcon /> }
            onClick={ handleMenuOpen }
            aria-haspopup="true"
            aria-expanded={ isMenuOpen }
            aria-controls={ isMenuOpen ? 'section-menu' : undefined }
          >
            메뉴 열기
          </Button>

          <Menu
            id="section-menu"
            anchorEl={ anchorElement }
            open={ isMenuOpen }
            onClose={ handleMenuClose }
            anchorOrigin={ { vertical: 'bottom', horizontal: 'left' } }
            transformOrigin={ { vertical: 'top', horizontal: 'left' } }
            slotProps={ { paper: { sx: { minWidth: 200 } } } }
          >
            { MENU_ITEMS.map((item) => {
              const ItemIcon = item.icon;

              return [
                item.hasDividerBefore ? <Divider key={ `${item.id}-divider` } /> : null,
                <MenuItem
                  key={ item.id }
                  selected={ item.id === selectedItemId }
                  onClick={ handleMenuItemClick(item.id) }
                  sx={ item.isDanger ? { color: 'error.main' } : undefined }
                >
                  <ListItemIcon sx={ item.isDanger ? { color: 'error.main' } : undefined }>
                    <ItemIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>{ item.label }</ListItemText>
                </MenuItem>,
              ];
            }) }
          </Menu>
        </Grid>

        <Grid size={ { xs: 12, md: 6 } }>
          <Box
            sx={ {
              p: 2,
              bgcolor: 'action.hover',
              borderRadius: 1,
            } }
          >
            <Box
              sx={ {
                color: 'text.secondary',
                fontSize: '0.75rem',
                fontWeight: 500,
              } }
            >
              선택된 메뉴
            </Box>

            { selectedItem ? (
              <Box sx={ { mt: 0.5, display: 'flex', alignItems: 'center', gap: 1 } }>
                <SelectedIcon
                  sx={ { color: selectedItem.isDanger ? 'error.main' : 'primary.main' } }
                />
                <Box
                  sx={ {
                    color: selectedItem.isDanger ? 'error.main' : 'primary.main',
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                    fontWeight: 600,
                    lineHeight: 1.4,
                  } }
                >
                  { selectedItem.label }
                </Box>
              </Box>
            ) : (
              <Box
                sx={ {
                  mt: 0.5,
                  color: 'text.disabled',
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  lineHeight: 1.6,
                } }
              >
                아직 선택된 메뉴가 없습니다.
              </Box>
            ) }
          </Box>
        </Grid>
      </Grid>
    </SectionContainer>
  );
}

export default MenuSection;
