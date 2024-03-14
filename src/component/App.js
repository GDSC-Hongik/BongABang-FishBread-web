// App.js
import React, { useEffect, useState } from "react";
import BackButton from "./BackButton";
import "./App.css";
import Call from "./Call";
import Pay from "./Pay";
import Payment from "./Payment";
import { useShoppingCart } from "../hooks/shoppingCart";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

function App() {
  const [modal, setModal] = useState(false);
  const [payMethod, setPayMethod] = useState(null);
  const [shoppingCart, setShoppingCart] = useShoppingCart();

  const showModal = (method) => {
    setPayMethod(method);
    setModal(true);
  };

  useEffect(() => {
    console.log(shoppingCart);
  }, []);

  const navigate = useNavigate();
  const goToNextPage = () => {
    navigate("/pay/payOK"); // 다음 페이지로 이동
  };

  return (
    <div className="App" onClick={() => showModal("카드결제")}>
      <div className="nav">
        <BackButton
          shoppingCart={shoppingCart}
          setShoppingCart={setShoppingCart}
        />
        <img
          src={`${process.env.PUBLIC_URL}/Imgs/logo.png`}
          alt="카페 로고"
          className="logo"
        />
      </div>
      <h1 className="payment">결제하기</h1>
      <div className="paymentRow">
        <div>
          <Payment
            method={"카드 결제"}
            imgSrc={`${process.env.PUBLIC_URL}/Imgs/card.svg`}
            showModal={() => showModal("카드결제")}
          />
        </div>
        <div>
          <Payment
            method={"기프티콘"}
            imgSrc={`${process.env.PUBLIC_URL}/Imgs/Vector.svg`}
            showModal={() => showModal("기프티콘")}
          />
        </div>
      </div>
      <div className="paymentRow">
        <div>
          <Payment
            method={"선불 카드"}
            imgSrc={`${process.env.PUBLIC_URL}/Imgs/선불카드 2.svg`}
            showModal={() => showModal("선불카드")}
          />
        </div>
        <div>
          <Payment
            method={"카카오페이"}
            imgSrc={`${process.env.PUBLIC_URL}/Imgs/카카오페이 1.svg`}
            showModal={() => showModal("카카오페이")}
          />
        </div>
      </div>
      <div className="smallButton">
        <Call showModal={() => showModal("직원호출")} />
      </div>
      <Modal
        isOpen={modal}
        className="pay-card"
        onRequestClose={() => goToNextPage()}
      >
        <Pay setModal={setModal} method={payMethod} />
      </Modal>
    </div>
  );
}

export default App;
