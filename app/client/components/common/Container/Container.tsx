import './Container.scss';
import { h, FunctionalComponent, ComponentChild } from 'preact';
import { memo } from 'preact/compat';
import block from 'bem-cn';

const b = block('Container');

interface IContainerProps {
  className?: string;
  children: ComponentChild;
}

const Container: FunctionalComponent<IContainerProps> = (props) => {
  const { className, children } = props;

  return (
    <div className={b.mix(className)}>
      {children}
    </div>
  );
};

export default memo(Container);
