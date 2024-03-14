import { useNavigate } from "react-router-dom";
import "./BackButton.css";

function BackButton({ shoppingCart, setShoppingCart }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    const methodIndex = shoppingCart.findIndex((item) => item.method);

    if (methodIndex !== -1) {
      const updatedCart = [...shoppingCart];
      updatedCart.splice(methodIndex, 1);

      setShoppingCart(updatedCart);
    }

    navigate(-1);
  };

  return (
    <div className="BackButton">
      <button className="BackButton" onClick={handleGoBack}>
        ◀ 뒤로가기
      </button>
    </div>
  );
}

export default BackButton;
