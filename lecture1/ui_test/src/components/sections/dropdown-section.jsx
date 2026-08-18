import { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SectionContainer from '../ui/section-container.jsx';

/** 드롭다운에서 선택할 수 있는 옵션 목록 */
const DROPDOWN_OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'solid', label: 'SolidJS' },
];

/**
 * DropdownSection 컴포넌트
 *
 * MUI Select 와 MenuItem 으로 만든 드롭다운 섹션이다.
 * 6개 옵션 중 하나를 선택하면 선택한 값이 오른쪽에 실시간으로 표시된다.
 *
 * Props: 없음
 *
 * Example usage:
 * <DropdownSection />
 */
function DropdownSection() {
  const [selectedValue, setSelectedValue] = useState('');

  /** 드롭다운 선택값을 갱신한다. */
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  /** 선택된 옵션 객체 (선택 전에는 undefined) */
  const selectedOption = DROPDOWN_OPTIONS.find(
    (option) => option.value === selectedValue,
  );

  return (
    <SectionContainer
      id="dropdown"
      title="Dropdown"
      description="6개 옵션 중 하나를 고르는 드롭다운입니다. 선택한 값이 오른쪽에 실시간으로 표시됩니다."
    >
      <Grid container spacing={ { xs: 2.5, md: 3 } }>
        <Grid size={ { xs: 12, md: 6 } }>
          <FormControl fullWidth>
            <InputLabel id="framework-select-label">프레임워크</InputLabel>
            <Select
              labelId="framework-select-label"
              id="framework-select"
              label="프레임워크"
              value={ selectedValue }
              onChange={ handleSelectChange }
            >
              { DROPDOWN_OPTIONS.map((option) => (
                <MenuItem key={ option.value } value={ option.value }>
                  { option.label }
                </MenuItem>
              )) }
            </Select>
            <FormHelperText>
              사용해 본 프레임워크를 하나 선택해 주세요.
            </FormHelperText>
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
              선택된 값
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
                아직 선택된 값이 없습니다.
              </Box>
            ) }
          </Box>
        </Grid>
      </Grid>
    </SectionContainer>
  );
}

export default DropdownSection;
