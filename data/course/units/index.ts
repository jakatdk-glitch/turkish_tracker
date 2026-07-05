import type { UnitContent } from '@/logic/course';
import { buildReverseChoices } from '@/logic/reverseExercises';

import u01 from './u01';
import u02 from './u02';
import u03 from './u03';
import u04 from './u04';
import u05 from './u05';
import u06 from './u06';
import u07 from './u07';
import u08 from './u08';
import u09 from './u09';
import u10 from './u10';
import u11 from './u11';
import u12 from './u12';
import u13 from './u13';
import u14 from './u14';
import u15 from './u15';
import u16 from './u16';
import u17 from './u17';
import u18 from './u18';
import u19 from './u19';
import u20 from './u20';
import u21 from './u21';
import u22 from './u22';
import u23 from './u23';
import u24 from './u24';
import u25 from './u25';
import u26 from './u26';
import u27 from './u27';
import u28 from './u28';
import u29 from './u29';
import u30 from './u30';
import u31 from './u31';

// Контент юнитов. Юниты без контента показывают заглушку «в разработке».
const UNITS: Record<string, UnitContent> = {
  u01,
  u02,
  u03,
  u04,
  u05,
  u06,
  u07,
  u08,
  u09,
  u10,
  u11,
  u12,
  u13,
  u14,
  u15,
  u16,
  u17,
  u18,
  u19,
  u20,
  u21,
  u22,
  u23,
  u24,
  u25,
  u26,
  u27,
  u28,
  u29,
  u30,
  u31,
};

export function getUnitContent(unitId: string): UnitContent | null {
  const unit = UNITS[unitId];
  if (!unit) return null;
  // Дополняем практику продуктивными упражнениями РУ→ТУР из словаря юнита.
  // Их же подхватывает тест, если у юнита нет собственного набора заданий.
  const reverse = buildReverseChoices(unit.vocab);
  if (reverse.length === 0) return unit;
  return { ...unit, exercises: [...unit.exercises, ...reverse] };
}
