import React, { useState } from "react";
import FoodItem from "@/models/foodItem";
import {
  addToCart,
  updateCartItemQuantity,
  removeItemFromCart,
} from "@/redux/reducers/cartSlice";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
interface AddToCartButtonProps {
  foodItem: FoodItem;
  foodItemQuantity: number;
}
const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  foodItem,
  foodItemQuantity,
}) => {

  const buttonStateInitial = foodItemQuantity === 0 ? "add" : "quantity";
  const [buttonState, setButtonState] = useState(buttonStateInitial);
  const [quantity, setQuantity] = useState(foodItemQuantity);
  const [shouldShowPopup, setShouldShowPopup] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCartButton = () => {
    if (buttonState === "add") {
      setQuantity((prevQuantity) => {
        return prevQuantity + 1;
      });
      dispatch(addToCart({ foodItem: foodItem, quantity: 1 }));
      setButtonState("quantity");
    }
  };
  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      dispatch(
        updateCartItemQuantity({
          foodItemId: foodItem._id,
          quantity: newQuantity,
        })
      );
      return newQuantity;
    });
  };
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        dispatch(
          updateCartItemQuantity({
            foodItemId: foodItem._id,
            quantity: newQuantity,
          })
        );
        return newQuantity;
      });
    } else {
      setShouldShowPopup(true);
    }
  };
  const handlePopupClose = () => setShouldShowPopup(false);
  const handleRemoveFromCart = () => {
    setQuantity(0);
    dispatch(removeItemFromCart(foodItem._id));
    setShouldShowPopup(false);
    setButtonState("add");
  };
  return (
    <>
      <button
        className={`flex p-2 text-center text-white bg-black rounded-2xl border-0 w-[10rem] font-semibold ${
          buttonState === "add" ? "justify-center" : "justify-between"
        }`}
        onClick={handleAddToCartButton}
      >
        {buttonState === "quantity" && (
          <button
            className="text-white bg-black  font-semibold border-0"
            onClick={handleDecreaseQuantity}
          >
            -
          </button>
        )}
        {buttonState === "add" ? "Add" : `${quantity}`}
        {buttonState === "quantity" && (
          <button
            className="text-white bg-black  font-semibold border-0"
            onClick={handleIncreaseQuantity}
          >
            +
          </button>
        )}
      </button>
      <Modal
        className="p-5 rounded-3 mt-2"
        show={shouldShowPopup}
        size="sm"
        onHide={handlePopupClose}
        backdrop={"static"}
      >
        <Modal.Header className="d-flex justify-content-between">
          <h4 className="fw-bold">Remove from cart?</h4>
          <span className="fs-3 cursor-pointer" onClick={handlePopupClose}>
            &times;
          </span>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center flex-row">
            <button
              className="btn btn-sm btn-danger p-2 m-2 w-25"
              onClick={handleRemoveFromCart}
            >
              Yes
            </button>
            <button
              className="btn btn-sm btn-success p-2 m-2 w-25"
              onClick={handlePopupClose}
            >
              No
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddToCartButton;
