import './Room.scss';
import { FunctionalComponent, h, JSX } from 'preact';
import { memo } from 'preact/compat';
import { useParams } from 'react-router-dom';
import block from 'bem-cn';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import isEqual from 'fast-deep-equal';

import { IRoom } from 'common/types/room';

import httpClient from 'client/utilities/HttpClient/HttpClient';

import Container from 'client/components/common/Container/Container';
import Input from 'client/components/common/Input/Input';
import Button from 'client/components/common/Button/Button';
import Heading from 'client/components/common/Heading/Heading';
import Flex from 'client/components/common/Flex/Flex';

const b = block('Room');

const Room: FunctionalComponent = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [localRoom, setLocalRoom] = useState<IRoom | null>(null);
  const [dbRoom, setDbRoom] = useState<IRoom | null>(null);
  const [newProductName, setNewProductName] = useState('');

  const isLocalRoomEqualToDBRoom = useMemo(() => {
    if (!localRoom || !dbRoom) {
      return true;
    }

    return isEqual(localRoom, {
      ...dbRoom,
      products: [...dbRoom.products].sort((a, b) => a.value - b.value),
    });
  }, [localRoom, dbRoom]);

  const updateRoom = useCallback(async () => {
    const { room: requestedDBRoom } = await httpClient.getRoom({ id: roomId });

    setDbRoom(requestedDBRoom);
    setLocalRoom({
      ...requestedDBRoom,
      products: [...requestedDBRoom.products].sort((a, b) => a.value - b.value),
    });
  }, [roomId]);

  const handleAddProduct = useCallback(async () => {
    if (!newProductName || !localRoom) {
      return;
    }

    setLocalRoom({
      ...localRoom,
      products: [
        ...localRoom.products,
        {
          name: newProductName,
          value: 0,
        },
      ],
    });

    setNewProductName('');
  }, [localRoom, newProductName]);

  useEffect(() => {
    (async () => {
      await updateRoom();
    })();
  }, [roomId, updateRoom]);

  if (!dbRoom || !localRoom) {
    return null;
  }

  return (
    <Container className={b()}>
      <Heading level={1}>🥗 Продукты</Heading>

      <Flex direction="column" between={2}>
        {localRoom.products.map((product, index) => (
          <div key={index}>
            <span>{product.name}</span>

            <input
              type="range"
              value={product.value}
              min="0"
              max="1"
              step="0.05"
              onChange={(e: JSX.TargetedEvent<HTMLInputElement>) => {
                setLocalRoom({
                  ...localRoom,
                  products: [
                    ...localRoom.products.slice(0, index),
                    {
                      name: product.name,
                      value: Number(e.currentTarget.value),
                    },
                    ...localRoom.products.slice(index + 1),
                  ],
                });
              }}
            />
          </div>
        ))}
      </Flex>

      <Flex between={2}>
        <Input value={newProductName} onInput={setNewProductName} />

        <Button onClick={handleAddProduct}>Добавить</Button>
      </Flex>

      <Button
        type="danger"
        disabled={isLocalRoomEqualToDBRoom}
        onClick={() => {
          setLocalRoom({
            ...dbRoom,
            products: [...dbRoom.products].sort((a, b) => a.value - b.value),
          });
        }}
      >
        Сбросить
      </Button>

      <Button
        disabled={isLocalRoomEqualToDBRoom}
        onClick={async () => {
          await httpClient.changeProducts({
            roomId,
            products: localRoom.products,
          });

          await updateRoom();
        }}
      >
        Сохранить
      </Button>
    </Container>
  );
};

export default memo(Room);
