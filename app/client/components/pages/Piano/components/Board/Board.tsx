import './Board.scss';
import { FunctionalComponent, h } from 'preact';
import { memo } from 'preact/compat';
import block from 'bem-cn';

import { EHand } from 'client/components/pages/Piano/types';

import Flex from 'client/components/common/Flex/Flex';
import { OCTAVE_IDS } from 'client/components/pages/Piano/constants';
import { IPressedKeys } from 'client/components/pages/Piano/Piano';

interface IBoardProps {
  pressedKeys: IPressedKeys;
  onKeyClick(hand: EHand, keyId: string): void;
}

enum EKeyColor {
  WHITE = 'white',
  BLACK = 'black',
}

const KEYS = [
  {
    color: EKeyColor.WHITE,
    id: 'c',
  },
  {
    color: EKeyColor.BLACK,
    id: 'C',
  },
  {
    color: EKeyColor.WHITE,
    id: 'd',
  },
  {
    color: EKeyColor.BLACK,
    id: 'D',
  },
  {
    color: EKeyColor.WHITE,
    id: 'e',
  },
  {
    color: EKeyColor.WHITE,
    id: 'f',
  },
  {
    color: EKeyColor.BLACK,
    id: 'F',
  },
  {
    color: EKeyColor.WHITE,
    id: 'g',
  },
  {
    color: EKeyColor.BLACK,
    id: 'G',
  },
  {
    color: EKeyColor.WHITE,
    id: 'a',
  },
  {
    color: EKeyColor.BLACK,
    id: 'A',
  },
  {
    color: EKeyColor.WHITE,
    id: 'b',
  },
];

const b = block('Board');

const Board: FunctionalComponent<IBoardProps> = (props) => {
  const { pressedKeys, onKeyClick } = props;

  return (
    <Flex className={b()}>
      {OCTAVE_IDS.map((octaveId) => {
        return (
          <Flex key={octaveId}>
            {KEYS.map((key) => {
              return (
                <Flex
                  className={b('key', {
                    color: key.color,
                    pressedLeft: pressedKeys[EHand.LEFT].includes(
                      `${octaveId}${key.id}`,
                    ),
                    pressedRight: pressedKeys[EHand.RIGHT].includes(
                      `${octaveId}${key.id}`,
                    ),
                  })}
                  key={key.id}
                  alignItems="flexEnd"
                  justifyContent="center"
                  onClick={() => onKeyClick(EHand.LEFT, `${octaveId}${key.id}`)}
                  onContextMenu={(e) => {
                    e.preventDefault();

                    onKeyClick(EHand.RIGHT, `${octaveId}${key.id}`);
                  }}
                >
                  {key.color === EKeyColor.WHITE ? key.id : ''}
                </Flex>
              );
            })}
          </Flex>
        );
      })}
    </Flex>
  );
};

export default memo(Board);
