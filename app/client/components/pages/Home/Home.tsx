import './Home.scss';
import { h } from 'preact';
import { memo } from 'preact/compat';
import block from 'bem-cn';
import { useCallback } from 'preact/hooks';

import httpClient from 'client/utilities/HttpClient/HttpClient';

import Container from 'client/components/common/Container/Container';
import Button from 'client/components/common/Button/Button';

const b = block('Home');

const Home: React.FC = () => {
  const handleCreateRoomClick = useCallback(async () => {
    const newRoom = await httpClient.createRoom();

    console.log('newRoom', newRoom);
  }, []);

  return (
    <Container>
      <div>🛒 Что по холодильнику?</div>

      <Button
        className={b('createButton')}
        onClick={handleCreateRoomClick}
      >
        Создать комнату
      </Button>
    </Container>
  );
};

export default memo(Home);
