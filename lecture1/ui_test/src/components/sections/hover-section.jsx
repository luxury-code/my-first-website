import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SectionContainer from '../ui/section-container.jsx';

/** 모든 호버 카드에 공통으로 적용되는 기본 스타일 */
const BASE_CARD_SX = {
  width: '100%',
  height: 120,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 0.5,
  p: 2,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  bgcolor: 'background.paper',
  transition: 'all 0.3s ease',
};

/** 카드별 호버 효과 목록 */
const HOVER_EFFECTS = [
  {
    id: 'color',
    title: '색상 변화',
    description: '배경과 글자색이 바뀝니다',
    hoverSx: {
      bgcolor: 'primary.main',
      color: 'primary.contrastText',
      borderColor: 'primary.main',
    },
  },
  {
    id: 'scale',
    title: '크기 확대',
    description: '카드가 6% 커집니다',
    hoverSx: {
      transform: 'scale(1.06)',
      borderColor: 'primary.light',
    },
  },
  {
    id: 'shadow',
    title: '그림자',
    description: '그림자가 깊어집니다',
    hoverSx: {
      boxShadow: 8,
    },
  },
  {
    id: 'lift',
    title: '떠오르기',
    description: '위로 8px 올라갑니다',
    hoverSx: {
      transform: 'translateY(-8px)',
      boxShadow: 6,
      borderColor: 'primary.main',
    },
  },
  {
    id: 'rotate',
    title: '기울기',
    description: '살짝 회전합니다',
    hoverSx: {
      transform: 'rotate(-3deg) scale(1.03)',
      bgcolor: 'action.hover',
    },
  },
  {
    id: 'glow',
    title: '테두리 강조',
    description: '테두리가 번지듯 퍼집니다',
    hoverSx: {
      color: 'secondary.main',
      borderColor: 'secondary.main',
      boxShadow: '0 0 0 6px rgba(220, 0, 78, 0.12)',
    },
  },
];

/**
 * HoverSection 컴포넌트
 *
 * ButtonBase 로 만든 카드 6개에 서로 다른 마우스 호버 효과를 적용한 섹션이다.
 * 색상 변화 / 크기 확대 / 그림자 / 떠오르기 / 기울기 / 테두리 강조를 확인할 수 있다.
 *
 * Props: 없음
 *
 * Example usage:
 * <HoverSection />
 */
function HoverSection() {
  return (
    <SectionContainer
      id="hover"
      title="Hover"
      description="카드 위에 마우스를 올려 보세요. 카드마다 다른 호버 효과가 적용되어 있습니다."
    >
      <Grid container spacing={ { xs: 2.5, md: 3 } }>
        { HOVER_EFFECTS.map((effect) => (
          <Grid key={ effect.id } size={ { xs: 12, sm: 6, md: 4 } }>
            <ButtonBase
              focusRipple
              sx={ {
                ...BASE_CARD_SX,
                '&:hover': effect.hoverSx,
                '&:focus-visible': effect.hoverSx,
              } }
            >
              <Box
                component="span"
                sx={ {
                  display: 'block',
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  fontWeight: 600,
                  lineHeight: 1.4,
                } }
              >
                { effect.title }
              </Box>

              <Box
                component="span"
                sx={ {
                  display: 'block',
                  opacity: 0.7,
                  fontSize: '0.8125rem',
                  lineHeight: 1.6,
                } }
              >
                { effect.description }
              </Box>
            </ButtonBase>
          </Grid>
        )) }
      </Grid>
    </SectionContainer>
  );
}

export default HoverSection;
