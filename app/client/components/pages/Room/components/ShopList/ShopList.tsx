import './ShopList.scss';
import { h, FunctionalComponent } from 'preact';
import { memo } from 'preact/compat';
import block from 'bem-cn';
import { useCallback, useMemo, useState } from 'preact/hooks';
import { Flex } from 'boarder-components';

import { IProduct } from 'common/types/room';

import httpClient from 'client/utilities/HttpClient/HttpClient';

import Heading from 'client/components/common/Heading/Heading';
import Button from 'client/components/common/Button/Button';

interface IShopListProps {
  roomId: string;
  products: IProduct[];
  requestRoom(): void;
}

const b = block('ShopList');

const ShopList: FunctionalComponent<IShopListProps> = (props) => {
  const { roomId, products, requestRoom } = props;

  const [checkedProductNames, setCheckedProductNames] = useState(
    new Set<string>(),
  );

  const productsToBuy = useMemo(() => {
    return products.filter((product) => product.value <= 0.66);
  }, [products]);

  const handleBuy = useCallback(async () => {
    await httpClient.changeProducts({
      roomId,
      products: products.map((product) => {
        if (checkedProductNames.has(product.name)) {
          return {
            ...product,
            value: 1,
          };
        }

        return product;
      }),
    });

    await requestRoom();
  }, [checkedProductNames, products, requestRoom, roomId]);

  return (
    <Flex className={b()} direction="column" between={3}>
      <Heading level={1}>Список продуктов</Heading>

      <Flex direction="column" between={2}>
        {productsToBuy.map((product) => (
          <Flex
            className={b('item', {
              checked: checkedProductNames.has(product.name),
            })}
            key={product.name}
          >
            <div>{product.name}</div>

            <input
              style={{ width: '100px', marginLeft: 'auto' }}
              type="range"
              value={product.value}
              min={0}
              max={1}
              step={0.05}
              disabled
            />

            <input
              type="checkbox"
              checked={checkedProductNames.has(product.name)}
              onChange={() => {
                const newCheckedProducts = new Set(checkedProductNames);

                if (newCheckedProducts.has(product.name)) {
                  newCheckedProducts.delete(product.name);
                } else {
                  newCheckedProducts.add(product.name);
                }

                setCheckedProductNames(new Set(newCheckedProducts));
              }}
            />
          </Flex>
        ))}
      </Flex>

      <Button onClick={handleBuy} disabled={checkedProductNames.size === 0}>
        Куплено
      </Button>
    </Flex>
  );
};

export default memo(ShopList);
