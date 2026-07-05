import { format, subDays } from 'date-fns';
import Svg, { Rect } from 'react-native-svg';

import { View, usePalette } from '@/components/Themed';

const WEEKS = 16;
const CELL = 12;
const GAP = 3;

export default function HeatmapCalendar({ activeDates }: { activeDates: Set<string> }) {
  const palette = usePalette();
  const totalDays = WEEKS * 7;
  const today = new Date();

  const days: { date: string; col: number; row: number }[] = [];
  for (let i = totalDays - 1; i >= 0; i--) {
    const dayIndex = totalDays - 1 - i;
    days.push({
      date: format(subDays(today, i), 'yyyy-MM-dd'),
      col: Math.floor(dayIndex / 7),
      row: dayIndex % 7,
    });
  }

  const width = WEEKS * (CELL + GAP);
  const height = 7 * (CELL + GAP);

  return (
    <View>
      <Svg width={width} height={height}>
        {days.map((day) => (
          <Rect
            key={day.date}
            x={day.col * (CELL + GAP)}
            y={day.row * (CELL + GAP)}
            width={CELL}
            height={CELL}
            rx={3}
            fill={activeDates.has(day.date) ? palette.primary : palette.track}
          />
        ))}
      </Svg>
    </View>
  );
}
