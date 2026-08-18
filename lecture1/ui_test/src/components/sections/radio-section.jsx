import { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import SectionContainer from '../ui/section-container.jsx';

/** 라디오 버튼으로 선택할 수 있는 요금제 목록 */
const RADIO_OPTIONS = [
  { value: 'free', label: '무료', description: '개인 학습용 기본 기능' },
  { value: 'basic', label: '베이직', description: '소규모 팀을 위한 협업 기능' },
  { value: 'pro', label: '프로', description: '무제한 프로젝트와 우선 지원' },
  { value: 'enterprise', label: '엔터프라이즈', description: '전용 인프라와 보안 관리' },
];

/**
 * RadioSection 컴포넌트
 *
 * MUI Radio 와 RadioGroup 으로 만든 단일 선택 섹션이다.
 * 4개 요금제 중 하나만 선택할 수 있고, 선택한 옵션은 오른쪽에 표시된다.
 * 각 항목의 레이블은 FormControlLabel 로 설정한다.
 *
 * Props: 없음
 *
 * Example usage:
 * <RadioSection />
 */
function RadioSection() {
  const [selectedValue, setSelectedValue] = useState('');

  /** 선택한 라디오 버튼의 값을 갱신한다. */
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  /** 선택된 옵션 객체 (선택 전에는 undefined) */
  const selectedOption = RADIO_OPTIONS.find(
    (option) => option.value === selectedValue,
  );

  return (
    <SectionContainer
      id="radio"
      title="Radio"
      description="여러 항목 중 하나만 선택할 수 있습니다. 새 항목을 고르면 이전 선택은 자동으로 해제됩니다."
    >
      <Grid container spacing={ { xs: 2.5, md: 3 } }>
        <Grid size={ { xs: 12, md: 6 } }>
          <FormControl>
            <FormLabel id="plan-radio-label" sx={ { fontWeight: 600 } }>
              요금제 선택
            </FormLabel>

            <RadioGroup
              aria-labelledby="plan-radio-label"
              name="plan"
              value={ selectedValue }
              onChange={ handleRadioChange }
              sx={ { mt: 1 } }
            >
              { RADIO_OPTIONS.map((option) => (
                <FormControlLabel
                  key={ option.value }
                  value={ option.value }
                  label={ option.label }
                  control={ <Radio /> }
                />
              )) }
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid size={ { xs: 12, md: 6 } }>
          <Box
            sx={ {
              height: '100%',
              minHeight: 96,
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
              선택된 옵션
            </Box>

            { selectedOption ? (
              <Box>
                <Box
                  sx={ {
                    mt: 0.5,
                    color: 'primary.main',
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                    fontWeight: 600,
                    lineHeight: 1.4,
                  } }
                >
                  { selectedOption.label }
                </Box>
                <Box
                  sx={ {
                    mt: 0.5,
                    color: 'text.primary',
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    lineHeight: 1.6,
                  } }
                >
                  { selectedOption.description }
                </Box>
                <Box
                  sx={ {
                    mt: 0.5,
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                  } }
                >
                  value=&quot;{ selectedOption.value }&quot;
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
                아직 선택된 옵션이 없습니다.
              </Box>
            ) }
          </Box>
        </Grid>
      </Grid>
    </SectionContainer>
  );
}

export default RadioSection;
