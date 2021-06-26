import './Fridge.scss';
import { h, FunctionalComponent } from 'preact';
import { memo } from 'preact/compat';
import block from 'bem-cn';
import { useCallback, useMemo, useState } from 'preact/hooks';
import isEqual from 'fast-deep-equal';

import { IRoom } from 'common/types/room';

import httpClient from 'client/utilities/HttpClient/HttpClient';

import ProductCategories from 'client/components/pages/Room/components/Fridge/components/ProductCategories/ProductCategories';
import Flex from 'client/components/common/Flex/Flex';
import Input from 'client/components/common/Input/Input';
import Button from 'client/components/common/Button/Button';

interface IFridgeProps {
  localRoom: IRoom;
  dbRoom: IRoom;
  setLocalRoom(room: IRoom): void;
  requestRoom(): void;
}

const b = block('Fridge');

const Fridge: FunctionalComponent<IFridgeProps> = (props) => {
  const { localRoom, dbRoom, setLocalRoom, requestRoom } = props;

  const [newProductName, setNewProductName] = useState('');

  const isLocalRoomEqualToDBRoom = useMemo(() => {
    return isEqual(localRoom, {
      ...dbRoom,
      products: [...dbRoom.products].sort((a, b) => a.value - b.value),
    });
  }, [localRoom, dbRoom]);

  const handleAddProduct = useCallback(async () => {
    if (!newProductName) {
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
  }, [localRoom, newProductName, setLocalRoom]);

  const handleProductValueChange = useCallback(
    (name: string, value: number) => {
      const productIndex = localRoom.products.findIndex((p) => p.name === name);

      if (productIndex === -1) {
        return;
      }

      setLocalRoom({
        ...localRoom,
        products: [
          ...localRoom.products.slice(0, productIndex),
          {
            name,
            value,
          },
          ...localRoom.products.slice(productIndex + 1),
        ],
      });
    },
    [localRoom, setLocalRoom],
  );

  const handleReset = useCallback(() => {
    setLocalRoom({
      ...dbRoom,
      products: [...dbRoom.products].sort((a, b) => a.value - b.value),
    });
  }, [dbRoom, setLocalRoom]);

  const handleSave = useCallback(async () => {
    await httpClient.changeProducts({
      roomId: localRoom.id,
      products: localRoom.products,
    });

    await requestRoom();
  }, [localRoom, requestRoom]);

  return (
    <Flex className={b()} direction="column">
      <ProductCategories
        products={localRoom.products}
        onValueChange={handleProductValueChange}
      />

      <Flex between={2}>
        <Input value={newProductName} onInput={setNewProductName} />

        <Button onClick={handleAddProduct}>Добавить</Button>
      </Flex>

      <Button
        type="danger"
        disabled={isLocalRoomEqualToDBRoom}
        onClick={handleReset}
      >
        Сбросить
      </Button>

      <Button disabled={isLocalRoomEqualToDBRoom} onClick={handleSave}>
        Сохранить
      </Button>
    </Flex>
  );
};

export default memo(Fridge);
