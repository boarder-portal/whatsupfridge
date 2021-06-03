import './Flex.scss';
import { h, FunctionalComponent } from 'preact';
import { memo } from 'preact/compat';
import block from 'bem-cn';

interface IFlexProps {
  direction?: 'row' | 'column';
  justifyContent?: 'center' | 'flexStart' | 'flexEnd';
  alignItems?: 'center' | 'flexStart' | 'flexEnd' | 'stretch';
  between?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

const b = block('Flex');

const Flex: FunctionalComponent<IFlexProps> = (props) => {
  const { children, direction, justifyContent, alignItems, between } = props;

  return (
    <div className={b({ direction, justifyContent, alignItems, between })}>
      {children}
    </div>
  );
};

export default memo(Flex);