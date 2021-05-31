import './Container.scss';
import { h, FunctionalComponent, ComponentChild } from 'preact';
import { memo } from 'preact/compat';
import block from 'bem-cn';

const b = block('Container');

interface IContainerProps {
  children: ComponentChild;
}

const Container: FunctionalComponent<IContainerProps> = (props) => {
  const { children } = props;

  return (
    <div className={b()}>
      {children}
    </div>
  );
};

export default memo(Container);
