import './Menu.scss';
import { h, FunctionalComponent } from 'preact';
import { memo } from 'preact/compat';
import block from 'bem-cn';
import { NavLink } from 'react-router-dom';
import { Flex } from 'boarder-components';

interface IMenuProps {
  roomId: string;
}

const b = block('Menu');

const Menu: FunctionalComponent<IMenuProps> = (props) => {
  const { roomId } = props;

  return (
    <Flex className={b()} between={2}>
      <NavLink
        to={`/room/${roomId}/`}
        activeClassName={b('activeLink').toString()}
        exact
      >
        Холодильник
      </NavLink>

      <NavLink
        to={`/room/${roomId}/shopList`}
        activeClassName={b('activeLink').toString()}
        exact
      >
        Список покупок
      </NavLink>
    </Flex>
  );
};

export default memo(Menu);
