import { useState } from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SectionContainer from '../ui/section-container.jsx';

/** 드롭 영역 목록 */
const DROP_ZONES = [
  { key: 'todo', title: '할 일', emptyText: '이곳으로 카드를 끌어다 놓으세요.' },
  { key: 'done', title: '완료', emptyText: '완료한 카드를 이곳에 놓으세요.' },
];

/** 드래그할 수 있는 아이템 초기 상태 */
const INITIAL_ITEMS = [
  { id: 'item-1', label: '기획서 작성', zone: 'todo' },
  { id: 'item-2', label: '디자인 시안 검토', zone: 'todo' },
  { id: 'item-3', label: '컴포넌트 개발', zone: 'todo' },
  { id: 'item-4', label: '코드 리뷰 요청', zone: 'todo' },
  { id: 'item-5', label: '배포 준비', zone: 'done' },
];

/**
 * DragDropSection 컴포넌트
 *
 * HTML5 Drag and Drop API 로 만든 드래그 앤 드롭 섹션이다.
 * 카드를 끌어서 '할 일' 과 '완료' 영역 사이를 자유롭게 옮길 수 있으며,
 * 드래그 중인 카드와 드롭 대상 영역에 시각적 피드백을 준다.
 *
 * Props: 없음
 *
 * Example usage:
 * <DragDropSection />
 */
function DragDropSection() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [draggedItemId, setDraggedItemId] = useState('');
  const [dragOverZone, setDragOverZone] = useState('');

  /** 드래그를 시작할 때 아이템 id 를 전달한다. */
  const handleDragStart = (itemId) => (event) => {
    event.dataTransfer.setData('text/plain', itemId);
    event.dataTransfer.effectAllowed = 'move';
    setDraggedItemId(itemId);
  };

  /** 드래그가 끝나면 시각적 상태를 초기화한다. */
  const handleDragEnd = () => {
    setDraggedItemId('');
    setDragOverZone('');
  };

  /** 드롭을 허용하기 위해 기본 동작을 막는다. */
  const handleDragOver = (zoneKey) => (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setDragOverZone(zoneKey);
  };

  /** 영역 밖으로 완전히 벗어났을 때만 강조를 해제한다. */
  const handleDragLeave = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) {
      return;
    }
    setDragOverZone('');
  };

  /** 드롭한 아이템을 해당 영역으로 옮긴다. */
  const handleDrop = (zoneKey) => (event) => {
    event.preventDefault();

    const droppedItemId = event.dataTransfer.getData('text/plain');

    setItems((prevItems) => prevItems.map((item) => (
      item.id === droppedItemId ? { ...item, zone: zoneKey } : item
    )));

    setDraggedItemId('');
    setDragOverZone('');
  };

  return (
    <SectionContainer
      id="drag-drop"
      title="Drag & Drop"
      description="카드를 끌어서 다른 영역으로 옮겨 보세요. 드래그 중인 카드와 놓을 영역이 강조됩니다."
    >
      <Grid container spacing={ { xs: 2.5, md: 3 } }>
        { DROP_ZONES.map((zone) => {
          const zoneItems = items.filter((item) => item.zone === zone.key);
          const isDragOver = dragOverZone === zone.key;

          return (
            <Grid key={ zone.key } size={ { xs: 12, md: 6 } }>
              <Box
                onDragOver={ handleDragOver(zone.key) }
                onDragLeave={ handleDragLeave }
                onDrop={ handleDrop(zone.key) }
                sx={ {
                  height: '100%',
                  minHeight: 240,
                  p: 2,
                  border: '2px dashed',
                  borderColor: isDragOver ? 'primary.main' : 'divider',
                  borderRadius: 2,
                  bgcolor: isDragOver ? 'action.selected' : 'action.hover',
                  transition: 'background-color 0.2s ease, border-color 0.2s ease',
                } }
              >
                <Typography
                  sx={ {
                    mb: 1.5,
                    fontSize: { xs: '0.9375rem', md: '1rem' },
                    fontWeight: 600,
                  } }
                >
                  { zone.title } ({ zoneItems.length })
                </Typography>

                <Stack spacing={ 1 }>
                  { zoneItems.length ? (
                    zoneItems.map((item) => (
                      <Paper
                        key={ item.id }
                        draggable
                        onDragStart={ handleDragStart(item.id) }
                        onDragEnd={ handleDragEnd }
                        elevation={ draggedItemId === item.id ? 0 : 2 }
                        sx={ {
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          p: 1.5,
                          cursor: 'grab',
                          opacity: draggedItemId === item.id ? 0.4 : 1,
                          transition: 'opacity 0.2s ease, box-shadow 0.2s ease',
                          '&:active': { cursor: 'grabbing' },
                        } }
                      >
                        <DragIndicatorIcon
                          fontSize="small"
                          sx={ { color: 'text.disabled' } }
                        />
                        <Box sx={ { fontSize: { xs: '0.875rem', md: '0.9375rem' } } }>
                          { item.label }
                        </Box>
                      </Paper>
                    ))
                  ) : (
                    <Box
                      sx={ {
                        py: 3,
                        color: 'text.disabled',
                        fontSize: '0.875rem',
                        textAlign: 'center',
                      } }
                    >
                      { zone.emptyText }
                    </Box>
                  ) }
                </Stack>
              </Box>
            </Grid>
          );
        }) }
      </Grid>
    </SectionContainer>
  );
}

export default DragDropSection;
