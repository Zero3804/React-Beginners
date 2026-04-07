import React from "react";
interface Props {
  cartItem: string[];
  onClear: () => void;
}
const Cart = ({ cartItem, onClear }: Props) => {
  return (
    <>
      <div>Cart</div>
      <ul>
        {cartItem.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={onClear}>Clear Cart</button>
    </>
  );
};

export default Cart;
