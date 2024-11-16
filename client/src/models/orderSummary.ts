
// order summary model
interface OrderState {
  customTip: string;
  orderTotal: number;
  tax: number;
  delivery: number;
  tipPercentage: number;
}

export default OrderState;
