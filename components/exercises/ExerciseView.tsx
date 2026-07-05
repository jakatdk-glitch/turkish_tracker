import Flashcard from '@/components/Flashcard';
import ChoiceExercise from '@/components/exercises/ChoiceExercise';
import MatchExercise from '@/components/exercises/MatchExercise';
import BlankExercise from '@/components/exercises/BlankExercise';
import AssembleExercise from '@/components/exercises/AssembleExercise';
import type { Exercise } from '@/logic/course';

export default function ExerciseView({
  exercise,
  onResult,
  hideExplain = false,
}: {
  exercise: Exercise;
  onResult: (correct: boolean) => void;
  // В тесте пояснения по ходу скрываем — они собираются в разбор ошибок в конце.
  hideExplain?: boolean;
}) {
  switch (exercise.type) {
    case 'choice':
      return (
        <ChoiceExercise
          prompt={exercise.prompt}
          promptIsTurkish={exercise.promptIsTurkish}
          options={exercise.options}
          correct={exercise.correct}
          explain={hideExplain ? undefined : exercise.explain}
          onResult={onResult}
        />
      );
    case 'match':
      return <MatchExercise pairs={exercise.pairs} onResult={onResult} />;
    case 'flashcard':
      return (
        <Flashcard
          prompt={exercise.tr}
          answer={exercise.ru}
          turkishText={exercise.tr}
          onGrade={(grade) => onResult(grade === 'good' || grade === 'easy')}
        />
      );
    case 'blank':
      return (
        <BlankExercise
          sentence={exercise.sentence}
          ru={exercise.ru}
          options={exercise.options}
          correct={exercise.correct}
          explain={hideExplain ? undefined : exercise.explain}
          onResult={onResult}
        />
      );
    case 'assemble':
      return (
        <AssembleExercise
          ru={exercise.ru}
          words={exercise.words}
          correct={exercise.correct}
          explain={hideExplain ? undefined : exercise.explain}
          onResult={onResult}
        />
      );
    case 'listen':
      // Тип listen появится позже
      return null;
  }
}
