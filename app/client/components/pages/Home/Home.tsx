import './Home.scss';
import { h } from 'preact';
import { memo } from 'preact/compat';
import block from 'bem-cn';
import { useCallback } from 'preact/hooks';
import { useHistory } from 'react-router-dom';

import httpClient from 'client/utilities/HttpClient/HttpClient';

import Container from 'client/components/common/Container/Container';
import Button from 'client/components/common/Button/Button';

const b = block('Home');

const Home: React.FC = () => {
  const history = useHistory();

  const handleCreateRoomClick = useCallback(async () => {
    const { room: newRoom } = await httpClient.createRoom();

    history.push(`/room/${newRoom.id}`);
  }, [history]);

  return (
    <Container>
      <div>🛒 Что по холодильнику?</div>

      <Button
        className={b('createButton')}
        onClick={handleCreateRoomClick}
      >
        Создать холодильник
      </Button>
    </Container>
  );
};

export default memo(Home);
