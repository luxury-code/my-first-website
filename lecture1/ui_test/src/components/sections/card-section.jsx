import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import SectionContainer from '../ui/section-container.jsx';
import heroImage from '../../assets/hero.png';
import reactLogo from '../../assets/react.svg';
import viteLogo from '../../assets/vite.svg';

/** 카드에 표시할 항목 목록 */
const CARD_ITEMS = [
  {
    id: 'react',
    title: 'React',
    summary: '컴포넌트 단위로 화면을 구성하는 UI 라이브러리입니다. 상태가 바뀌면 필요한 부분만 다시 그립니다.',
    image: reactLogo,
  },
  {
    id: 'vite',
    title: 'Vite',
    summary: '개발 서버가 빠르게 뜨는 빌드 도구입니다. 저장하는 즉시 화면에 반영됩니다.',
    image: viteLogo,
  },
  {
    id: 'mui',
    title: 'MUI',
    summary: '머티리얼 디자인을 구현한 컴포넌트 모음입니다. 이 페이지의 모든 UI 요소가 MUI 로 만들어졌습니다.',
    image: heroImage,
  },
];

/** 알림창 자동 닫힘 시간 (ms) */
const AUTO_HIDE_DURATION = 3000;

/**
 * CardSection 컴포넌트
 *
 * MUI Card 를 Grid 로 배치한 섹션이다.
 * 각 카드는 CardMedia(이미지) / CardContent(제목·설명) / CardActions(버튼) 로 구성되며,
 * 마우스를 올리면 그림자가 깊어지면서 살짝 떠오른다.
 *
 * Props: 없음
 *
 * Example usage:
 * <CardSection />
 */
function CardSection() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  /** 카드의 버튼을 눌렀을 때 어떤 카드인지 알린다. */
  const handleCardActionClick = (title) => {
    setAlertMessage(`${title} 카드의 자세히 보기를 눌렀습니다.`);
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
      id="card"
      title="Card"
      description="이미지·내용·버튼으로 구성한 카드 3개입니다. 마우스를 올리면 그림자가 깊어집니다."
    >
      <Grid container spacing={ { xs: 2.5, md: 3 } }>
        { CARD_ITEMS.map((item) => (
          <Grid key={ item.id } size={ { xs: 12, sm: 6, md: 4 } }>
            <Card
              sx={ {
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                '&:hover': {
                  boxShadow: 8,
                  transform: 'translateY(-4px)',
                },
              } }
            >
              <CardMedia
                component="img"
                image={ item.image }
                alt={ `${item.title} 이미지` }
                sx={ {
                  height: 140,
                  objectFit: 'contain',
                  p: 2,
                  bgcolor: 'action.hover',
                } }
              />

              <CardContent sx={ { flexGrow: 1 } }>
                <Typography
                  variant="h3"
                  sx={ {
                    fontSize: { xs: '1.125rem', md: '1.25rem' },
                    fontWeight: 600,
                    lineHeight: 1.4,
                  } }
                >
                  { item.title }
                </Typography>

                <Typography
                  sx={ {
                    mt: 1,
                    color: 'text.secondary',
                    fontSize: { xs: '0.875rem', md: '0.9375rem' },
                    lineHeight: 1.6,
                  } }
                >
                  { item.summary }
                </Typography>
              </CardContent>

              <CardActions sx={ { px: 2, pb: 2 } }>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={ () => handleCardActionClick(item.title) }
                >
                  자세히 보기
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )) }
      </Grid>

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

export default CardSection;
