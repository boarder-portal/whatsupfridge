import { h, FunctionalComponent, ComponentChild } from 'preact';
import { memo } from 'preact/compat';
import block from 'bem-cn';

interface IButtonProps {
  className?: string;
  children: ComponentChild;
  onClick(): void;
}

const b = block('Button');

const Button: FunctionalComponent<IButtonProps> = (props) => {
  const { className, children, onClick } = props;

  return (
    <button className={b.mix(className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default memo(Button);
