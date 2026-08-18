import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SectionContainer from '../ui/section-container.jsx';

/** 입력 필드 변형별 설정 목록 */
const TEXT_FIELDS = [
  {
    variant: 'standard',
    label: '이름',
    placeholder: '홍길동',
  },
  {
    variant: 'outlined',
    label: '이메일',
    placeholder: 'example@email.com',
  },
  {
    variant: 'filled',
    label: '전화번호',
    placeholder: '010-1234-5678',
  },
];

/** 입력값 초기 상태 (변형 이름을 키로 사용) */
const INITIAL_VALUES = {
  standard: '',
  outlined: '',
  filled: '',
};

/**
 * InputSection 컴포넌트
 *
 * MUI TextField 의 variant 3종(standard / outlined / filled)을 보여 주는 섹션이다.
 * 각 필드에 label 과 placeholder 를 설정했으며, 입력한 값은 아래에 실시간으로 표시된다.
 *
 * Props: 없음
 *
 * Example usage:
 * <InputSection />
 */
function InputSection() {
  const [inputValues, setInputValues] = useState(INITIAL_VALUES);

  /** 입력값 변경 시 해당 변형의 상태만 갱신한다. */
  const handleInputChange = (variant) => (event) => {
    const { value } = event.target;

    setInputValues((prevValues) => ({
      ...prevValues,
      [variant]: value,
    }));
  };

  return (
    <SectionContainer
      id="input"
      title="Input"
      description="variant 3가지 입력 필드입니다. 입력한 내용이 아래에 실시간으로 표시됩니다."
    >
      <Grid container spacing={ { xs: 2.5, md: 3 } }>
        { TEXT_FIELDS.map(({ variant, label, placeholder }) => (
          <Grid key={ variant } size={ { xs: 12, md: 4 } }>
            <TextField
              fullWidth
              variant={ variant }
              label={ label }
              placeholder={ placeholder }
              value={ inputValues[variant] }
              onChange={ handleInputChange(variant) }
            />

            <Box
              sx={ {
                mt: 1.5,
                p: 1.5,
                minHeight: 64,
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
                variant=&quot;{ variant }&quot; 입력값
              </Box>
              <Box
                sx={ {
                  mt: 0.5,
                  color: inputValues[variant] ? 'text.primary' : 'text.disabled',
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  lineHeight: 1.6,
                  wordBreak: 'break-all',
                } }
              >
                { inputValues[variant] || '입력된 값이 없습니다.' }
              </Box>
            </Box>
          </Grid>
        )) }
      </Grid>

      <Typography
        sx={ {
          mt: { xs: 2, md: 3 },
          color: 'text.secondary',
          fontSize: { xs: '0.8125rem', md: '0.875rem' },
          lineHeight: 1.6,
        } }
      >
        총 입력 글자 수: { Object.values(inputValues).join('').length }자
      </Typography>
    </SectionContainer>
  );
}

export default InputSection;
