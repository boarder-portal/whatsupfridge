import './Tabs.scss';
import { h, FunctionalComponent } from 'preact';
import { memo } from 'preact/compat';
import block from 'bem-cn';
import { Flex } from 'boarder-components';

import { IPressedKeys } from 'client/components/pages/Piano/Piano';
import { OCTAVE_IDS } from 'client/components/pages/Piano/constants';

interface ITabsProps {
  steps: IPressedKeys[];
  selectedStepIndex: number;
  onStepSelect(stepIndex: number): void;
}

const b = block('Tabs');

const Tabs: FunctionalComponent<ITabsProps> = (props) => {
  const { steps, selectedStepIndex, onStepSelect } = props;

  return (
    <Flex className={b()}>
      <Flex direction="column" between={8}>
        <Flex className={b('step')} direction="column">
          {OCTAVE_IDS.map((octaveId) => {
            return (
              <div key={octaveId} className={b('cell')}>
                {octaveId}
              </div>
            );
          })}
        </Flex>

        <Flex direction="column">
          {OCTAVE_IDS.map((octaveId) => {
            return (
              <div key={octaveId} className={b('cell')}>
                {octaveId}
              </div>
            );
          })}
        </Flex>
      </Flex>

      {steps.map((step, stepIndex) => {
        const { left, right } = step;

        return (
          <Flex
            className={b('step', { selected: selectedStepIndex === stepIndex })}
            key={stepIndex}
            direction="column"
            between={8}
            onClick={() => onStepSelect(stepIndex)}
          >
            <Flex direction="column">
              {OCTAVE_IDS.map((octaveId) => {
                const keys = right
                  .filter((key) => key[0] === octaveId)
                  .map((key) => key[1])
                  .join('');

                return (
                  <div key={octaveId} className={b('cell')}>
                    {keys}
                  </div>
                );
              })}
            </Flex>

            <Flex direction="column">
              {OCTAVE_IDS.map((octaveId) => {
                const keys = left
                  .filter((key) => key[0] === octaveId)
                  .map((key) => key[1])
                  .join('');

                return (
                  <div key={octaveId} className={b('cell')}>
                    {keys}
                  </div>
                );
              })}
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default memo(Tabs);
