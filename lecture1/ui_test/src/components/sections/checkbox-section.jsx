import { useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import SectionContainer from '../ui/section-container.jsx';

/** 체크박스로 선택할 수 있는 항목 목록 */
const CHECKBOX_OPTIONS = [
  { value: 'frontend', label: '프론트엔드' },
  { value: 'backend', label: '백엔드' },
  { value: 'mobile', label: '모바일' },
  { value: 'data', label: '데이터' },
  { value: 'design', label: '디자인' },
];

/**
 * CheckboxSection 컴포넌트
 *
 * MUI Checkbox 로 만든 다중 선택 섹션이다.
 * 5개 항목을 자유롭게 선택할 수 있고, 전체 선택/해제 체크박스를 제공한다.
 * 선택한 항목의 개수와 목록은 오른쪽에 실시간으로 표시된다.
 *
 * Props: 없음
 *
 * Example usage:
 * <CheckboxSection />
 */
function CheckboxSection() {
  const [selectedValues, setSelectedValues] = useState([]);

  /** 전체 선택 여부 */
  const isAllSelected = selectedValues.length === CHECKBOX_OPTIONS.length;

  /** 일부만 선택된 중간 상태 여부 */
  const isIndeterminate = selectedValues.length > 0 && !isAllSelected;

  /** 개별 항목의 선택 상태를 전환한다. */
  const handleItemChange = (value) => (event) => {
    const { checked } = event.target;

    setSelectedValues((prevValues) => (
      checked
        ? [...prevValues, value]
        : prevValues.filter((prevValue) => prevValue !== value)
    ));
  };

  /** 전체 항목을 모두 선택하거나 모두 해제한다. */
  const handleSelectAllChange = (event) => {
    const { checked } = event.target;

    setSelectedValues(checked ? CHECKBOX_OPTIONS.map((option) => option.value) : []);
  };

  /** 선택된 항목 객체 목록 (원래 순서를 유지) */
  const selectedOptions = CHECKBOX_OPTIONS.filter(
    (option) => selectedValues.includes(option.value),
  );

  return (
    <SectionContainer
      id="checkbox"
      title="Checkbox"
      description="여러 항목을 동시에 선택할 수 있습니다. 전체 선택/해제와 선택 개수 표시를 지원합니다."
    >
      <Grid container spacing={ { xs: 2.5, md: 3 } }>
        <Grid size={ { xs: 12, md: 6 } }>
          <FormControlLabel
            label="전체 선택"
            control={
              <Checkbox
                checked={ isAllSelected }
                indeterminate={ isIndeterminate }
                onChange={ handleSelectAllChange }
              />
            }
            sx={ { '& .MuiFormControlLabel-label': { fontWeight: 600 } } }
          />

          <Divider sx={ { my: 1 } } />

          <FormGroup>
            { CHECKBOX_OPTIONS.map((option) => (
              <FormControlLabel
                key={ option.value }
                label={ option.label }
                control={
                  <Checkbox
                    checked={ selectedValues.includes(option.value) }
                    onChange={ handleItemChange(option.value) }
                  />
                }
              />
            )) }
          </FormGroup>
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
              선택된 항목
            </Box>

            <Box
              sx={ {
                mt: 0.5,
                color: selectedValues.length ? 'primary.main' : 'text.disabled',
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 600,
                lineHeight: 1.4,
              } }
            >
              { selectedValues.length } / { CHECKBOX_OPTIONS.length }개
            </Box>

            <Stack
              direction="row"
              spacing={ 1 }
              useFlexGap
              sx={ { mt: 1.5, flexWrap: 'wrap' } }
            >
              { selectedOptions.length ? (
                selectedOptions.map((option) => (
                  <Chip key={ option.value } label={ option.label } color="primary" size="small" />
                ))
              ) : (
                <Box
                  sx={ {
                    color: 'text.disabled',
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    lineHeight: 1.6,
                  } }
                >
                  아직 선택된 항목이 없습니다.
                </Box>
              ) }
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </SectionContainer>
  );
}

export default CheckboxSection;
