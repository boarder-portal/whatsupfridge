import './Room.scss';
import { FunctionalComponent, h } from 'preact';
import { memo } from 'preact/compat';
import { Route, Switch, useParams } from 'react-router-dom';
import block from 'bem-cn';
import { useCallback, useEffect, useState } from 'preact/hooks';

import { IRoom } from 'common/types/room';

import httpClient from 'client/utilities/HttpClient/HttpClient';

import Container from 'client/components/common/Container/Container';
import Fridge from 'client/components/pages/Room/components/Fridge/Fridge';
import Menu from 'client/components/pages/Room/components/Menu/Menu';
import ShopList from 'client/components/pages/Room/components/ShopList/ShopList';

const b = block('Room');

const Room: FunctionalComponent = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [localRoom, setLocalRoom] = useState<IRoom | null>(null);
  const [dbRoom, setDbRoom] = useState<IRoom | null>(null);

  const requestRoom = useCallback(async () => {
    const { room: requestedDBRoom } = await httpClient.getRoom({ id: roomId });

    setDbRoom(requestedDBRoom);
    setLocalRoom({
      ...requestedDBRoom,
      products: [...requestedDBRoom.products].sort((a, b) => a.value - b.value),
    });
  }, [roomId]);

  useEffect(() => {
    (async () => {
      await requestRoom();
    })();
  }, [roomId, requestRoom]);

  if (!dbRoom || !localRoom) {
    return null;
  }

  return (
    <Container className={b()}>
      <Menu roomId={roomId} />

      <Switch>
        <Route path="/room/:roomId/shopList">
          <ShopList
            roomId={roomId}
            products={localRoom.products}
            requestRoom={requestRoom}
          />
        </Route>

        <Route path="/room/:roomId">
          <Fridge
            localRoom={localRoom}
            dbRoom={dbRoom}
            setLocalRoom={setLocalRoom}
            requestRoom={requestRoom}
          />
        </Route>
      </Switch>
    </Container>
  );
};

export default memo(Room);
