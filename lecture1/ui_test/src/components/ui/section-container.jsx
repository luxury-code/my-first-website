import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

/**
 * SectionContainer 컴포넌트
 *
 * UI 요소를 소개하는 섹션의 공통 레이아웃이다.
 * 제목 / 설명 / 본문 영역을 일관된 형태로 감싸 준다.
 *
 * Props:
 * @param {string} title - 섹션 제목 [Required]
 * @param {string} description - 섹션에 대한 부가 설명 [Optional, 기본값: '']
 * @param {string} id - 앵커 이동용 섹션 id [Optional, 기본값: undefined]
 * @param {node} children - 섹션 본문에 표시할 UI 요소 [Required]
 *
 * Example usage:
 * <SectionContainer title="Button" description="MUI 버튼 컴포넌트">
 *   <Button variant="contained">확인</Button>
 * </SectionContainer>
 */
function SectionContainer({ title, description = '', id, children }) {
  return (
    <Paper
      component="section"
      id={ id }
      elevation={ 0 }
      sx={ {
        width: '100%',
        p: { xs: 2, md: 3 },
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
      } }
    >
      <Typography
        variant="h2"
        sx={ {
          fontSize: { xs: '1.25rem', md: '1.5rem' },
          fontWeight: 600,
          lineHeight: 1.4,
        } }
      >
        { title }
      </Typography>

      { description && (
        <Typography
          sx={ {
            mt: 0.5,
            color: 'text.secondary',
            fontSize: { xs: '0.875rem', md: '1rem' },
            lineHeight: 1.6,
          } }
        >
          { description }
        </Typography>
      ) }

      <Box sx={ { mt: { xs: 2, md: 3 } } }>
        { children }
      </Box>
    </Paper>
  );
}

export default SectionContainer;
