import './Flex.scss';
import { h, FunctionalComponent, JSX } from 'preact';
import { memo } from 'preact/compat';
import block from 'bem-cn';

interface IFlexProps {
  className?: string;
  direction?: 'row' | 'column';
  justifyContent?: 'center' | 'flexStart' | 'flexEnd' | 'spaceBetween';
  alignItems?: 'center' | 'flexStart' | 'flexEnd' | 'stretch';
  between?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  onClick?: JSX.MouseEventHandler<HTMLDivElement>;
  onContextMenu?: JSX.MouseEventHandler<HTMLDivElement>;
}

const b = block('Flex');

const Flex: FunctionalComponent<IFlexProps> = (props) => {
  const {
    className,
    children,
    direction,
    justifyContent,
    alignItems,
    between,
    onClick,
    onContextMenu,
  } = props;

  return (
    <div
      className={b({ direction, justifyContent, alignItems, between }).mix(
        className,
      )}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {children}
    </div>
  );
};

export default memo(Flex);
