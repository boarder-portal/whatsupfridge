// import './ProductCategories.scss';
import { h, FunctionalComponent, JSX } from 'preact';
import { memo } from 'preact/compat';
import block from 'bem-cn';

import { IProduct } from 'common/types/room';

import Heading from 'client/components/common/Heading/Heading';
import Flex from 'client/components/common/Flex/Flex';

interface IProductCategoriesProps {
  products: IProduct[];
  onValueChange(name: string, value: number): void;
}

const b = block('ProductCategories');

const ProductCategories: FunctionalComponent<IProductCategoriesProps> = (
  props,
) => {
  const { products, onValueChange } = props;

  return (
    <Flex className={b()} direction="column" between={3}>
      <Heading level={1}>🥗 Продукты</Heading>

      <Flex direction="column" between={2}>
        {products.map((product, index) => (
          <Flex justifyContent="spaceBetween" key={index}>
            <span>{product.name}</span>

            <input
              style={{ width: '100px' }}
              type="range"
              value={product.value}
              min={0}
              max={1}
              step={0.05}
              onChange={(e: JSX.TargetedEvent<HTMLInputElement>) => {
                onValueChange(product.name, Number(e.currentTarget.value));
              }}
            />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default memo(ProductCategories);
