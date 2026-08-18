import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import SectionContainer from '../ui/section-container.jsx';

/** 알림창 자동 닫힘 시간 (ms) */
const AUTO_HIDE_DURATION = 3000;

/**
 * ModalSection 컴포넌트
 *
 * MUI Dialog 로 만든 모달 섹션이다.
 * 버튼을 누르면 모달이 열리고, 제목 / 내용 / 확인·취소 버튼으로 구성된다.
 * 우측 상단 닫기 버튼, 배경 클릭, ESC 키로 모두 닫을 수 있다.
 *
 * Props: 없음
 *
 * Example usage:
 * <ModalSection />
 */
function ModalSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');

  /** 모달을 연다. */
  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  /** 모달을 닫는다. (배경 클릭 / ESC / 닫기 버튼 공통) */
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  /** 확인 버튼을 눌렀을 때 모달을 닫고 결과를 알린다. */
  const handleConfirm = () => {
    setIsDialogOpen(false);
    setAlertMessage('확인 버튼을 눌렀습니다.');
    setAlertSeverity('success');
    setIsAlertOpen(true);
  };

  /** 취소 버튼을 눌렀을 때 모달을 닫고 결과를 알린다. */
  const handleCancel = () => {
    setIsDialogOpen(false);
    setAlertMessage('취소 버튼을 눌렀습니다.');
    setAlertSeverity('warning');
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
      id="modal"
      title="Modal"
      description="버튼을 누르면 모달이 열립니다. 닫기 버튼, 배경 클릭, ESC 키로 닫을 수 있습니다."
    >
      <Button variant="contained" onClick={ handleDialogOpen }>
        모달 열기
      </Button>

      <Dialog
        open={ isDialogOpen }
        onClose={ handleDialogClose }
        aria-labelledby="modal-section-title"
        aria-describedby="modal-section-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          id="modal-section-title"
          sx={ {
            pr: 6,
            fontSize: { xs: '1.125rem', md: '1.25rem' },
            fontWeight: 600,
          } }
        >
          변경 사항을 저장할까요?
        </DialogTitle>

        <IconButton
          aria-label="닫기"
          onClick={ handleDialogClose }
          sx={ {
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'text.secondary',
          } }
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          <DialogContentText
            id="modal-section-description"
            sx={ { fontSize: { xs: '0.875rem', md: '1rem' }, lineHeight: 1.6 } }
          >
            지금까지 편집한 내용을 저장합니다.
            저장하지 않고 닫으면 변경 사항은 사라집니다.
            계속 진행하시겠습니까?
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={ { px: 3, py: 2 } }>
          <Button color="inherit" onClick={ handleCancel }>
            취소
          </Button>
          <Button variant="contained" onClick={ handleConfirm } autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>

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

export default ModalSection;
