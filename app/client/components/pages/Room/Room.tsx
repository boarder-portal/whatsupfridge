import { h, FunctionalComponent, JSX } from 'preact';
import { memo } from 'preact/compat';
import { useParams } from 'react-router-dom';
import block from 'bem-cn';
import { useCallback, useEffect, useState } from 'preact/hooks';

import { IRoom } from 'common/types/room';

import httpClient from 'client/utilities/HttpClient/HttpClient';

import Container from 'client/components/common/Container/Container';
import Input from 'client/components/common/Input/Input';
import Button from 'client/components/common/Button/Button';

const b = block('Room');

const Room: FunctionalComponent = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [room, setRoom] = useState<IRoom | null>(null);
  const [newProductName, setNewProductName] = useState('');

  const updateRoom = useCallback(async () => {
    const { room: requestedRoom } = await httpClient.getRoom({ id: roomId });

    setRoom(requestedRoom);
  }, [roomId]);

  const handleAddProduct = useCallback(async () => {
    if (!newProductName) {
      return;
    }

    await httpClient.addProduct({ roomId, name: newProductName });

    await updateRoom();

    setNewProductName('');
  }, [newProductName, roomId, updateRoom]);

  useEffect(() => {
    (async () => {
      await updateRoom();
    })();
  }, [roomId, updateRoom]);

  if (!room) {
    return null;
  }

  return (
    <Container className={b()}>
      🥗 Продукты

      <div>
        {room.products.map((product, index) => (
          <div key={index}>
            <span>{product.name}</span>

            <input
              type="range"
              value={product.value}
              min="0"
              max="1"
              step="0.05"
              onChange={(e: JSX.TargetedEvent<HTMLInputElement>) => {
                if (!room) {
                  return;
                }

                setRoom({
                  ...room,
                  products: [
                    ...room.products.slice(0, index),
                    {
                      name: product.name,
                      value: Number(e.currentTarget.value),
                    },
                    ...room.products.slice(index + 1),
                  ],
                });
              }}
            />
          </div>
        ))}
      </div>

      <div>
        <Input value={newProductName} onInput={setNewProductName} />

        <Button onClick={handleAddProduct}>Добавить</Button>
      </div>

      <Button
        onClick={async () => {
          if (!room) {
            return;
          }

          await httpClient.changeProducts({
            roomId,
            products: room.products,
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
