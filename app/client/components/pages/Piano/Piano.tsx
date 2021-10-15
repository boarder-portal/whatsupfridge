import './Piano.scss';
import { FunctionalComponent, h } from 'preact';
import { memo } from 'preact/compat';
import block from 'bem-cn';
import { useCallback, useState } from 'preact/hooks';
import { Flex } from 'boarder-components';

import { EHand } from 'client/components/pages/Piano/types';

import Board from 'client/components/pages/Piano/components/Board/Board';
import Button from 'client/components/common/Button/Button';
import Tabs from 'client/components/pages/Piano/components/Tabs/Tabs';

const b = block('Piano');

export interface IPressedKeys {
  [EHand.LEFT]: string[];
  [EHand.RIGHT]: string[];
}

const Piano: FunctionalComponent = () => {
  const [pressedKeys, setPressedKeys] = useState<IPressedKeys>({
    [EHand.LEFT]: [],
    [EHand.RIGHT]: [],
  });
  const [steps, setSteps] = useState<IPressedKeys[]>((): IPressedKeys[] => {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    const rawSavedSong = localStorage.getItem('savedSong');

    if (!rawSavedSong) {
      return [];
    }

    return JSON.parse(rawSavedSong);
  });
  const [selectedStepIndex, setSelectedStepIndex] = useState(-1);

  const handleBoardKeyClick = useCallback(
    (hand: EHand, keyId: string) => {
      const pressedKeyIndex = pressedKeys[hand].findIndex((p) => p === keyId);

      if (pressedKeyIndex === -1) {
        setPressedKeys({
          ...pressedKeys,
          [hand]: [...pressedKeys[hand], keyId],
        });
      } else {
        setPressedKeys({
          ...pressedKeys,
          [hand]: [
            ...pressedKeys[hand].slice(0, pressedKeyIndex),
            ...pressedKeys[hand].slice(pressedKeyIndex + 1),
          ],
        });
      }
    },
    [pressedKeys],
  );

  const handleAddOrChangeStepClick = useCallback(() => {
    if (selectedStepIndex === -1) {
      setSteps([...steps, pressedKeys]);
    } else {
      setSteps([
        ...steps.slice(0, selectedStepIndex),
        pressedKeys,
        ...steps.slice(selectedStepIndex + 1),
      ]);
    }

    setPressedKeys({ [EHand.LEFT]: [], [EHand.RIGHT]: [] });
    setSelectedStepIndex(-1);
  }, [pressedKeys, selectedStepIndex, steps]);

  const handleSelectStep = useCallback(
    (stepIndex: number) => {
      setSelectedStepIndex(stepIndex);

      setPressedKeys(steps[stepIndex]);
    },
    [steps],
  );

  const saveSong = useCallback(() => {
    localStorage.setItem('savedSong', JSON.stringify(steps));
  }, [steps]);

  return (
    <Flex className={b()} direction="column" between={3}>
      <Board pressedKeys={pressedKeys} onKeyClick={handleBoardKeyClick} />

      <Button
        className={b('addStepButton')}
        onClick={handleAddOrChangeStepClick}
      >
        {selectedStepIndex === -1 ? 'Добавить' : 'Изменить'}
      </Button>

      <Button className={b('saveSongButton')} onClick={saveSong}>
        Сохранить
      </Button>

      <Tabs
        steps={steps}
        selectedStepIndex={selectedStepIndex}
        onStepSelect={handleSelectStep}
      />
    </Flex>
  );
};

export default memo(Piano);
