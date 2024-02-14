<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./CategoryPage.css";
import "../component/CurrentTime";
import CurrentTime from "../component/CurrentTime";
import MenuOptionBoth from "../component/MenuOptionBoth";
import Message from "../component/Message";
import { useShoppingCart } from "../hooks/shoppingCart";
=======
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './CategoryPage.css';
import '../component/CurrentTime';
import CurrentTime from '../component/CurrentTime';
import MenuOptionBoth from '../component/MenuOptionBoth';
import Message from '../component/Message';
>>>>>>> 8eb464adfe92219c933e5d98b413f52beba84806

const messages = '안녕하세요 김년욱입니다';
const messages2 = '안녕하세요 김년욱입니다. 여기는 장바구니입니다.';
// const messages = [
//   "안녕하세요!",
//   "이 말풍선은 길어질까요?",
//   "짧아지나요?",
//   "리액트로 말풍선을 만들어 보는 중입니다.",
//   "다양한 말을 넣어서 테스트해 보세요!",
// ];

const menusDetail = [
  {
    id: 1,
    menu: '아메리카노',
    options: '아이스, 샷 추가x1',
    price: 4000,
    number: 1,
  },
  {
    id: 2,
    menu: '아포카토',
    options: '샷 추가x3',
    price: 5000,
    number: 2,
  },
];

function CategoryPage() {
  const navigate = useNavigate();
  const [shoppingCart, setShoppingCart] = useShoppingCart();
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [payIsOpen, setPayIsOpen] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const isZero = menusDetail.length === 0;
  const getMenus = async () => {
    const json = await (await fetch('/megaMenu.json')).json();
    setMenus(json);
    setLoading(false);
  };

  useEffect(() => {
    getMenus();
    Modal.setAppElement('#root');
  }, []);

  const filteredMenus = menus.filter((menu) => {
    // 'all' 카테고리가 선택된 경우 모든 메뉴를 반환
    if (selectedCategory === 'all')
      return [3, 4, 21, 63, 66, 71, 73, 78, 79].includes(menu.id);
    // 그렇지 않으면 선택된 카테고리에 해당하는 메뉴만 반환
    return menu.category === selectedCategory;
  });
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredMenus.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMenus.slice(indexOfFirstItem, indexOfLastItem);

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  let costSum = 0;

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const ScreenStyle = {
    width: '390px',
    height: '844px',
    margin: '0 auto',
    border: '1px solid black', // 경계를 확인하기 위한 임시 스타일
  };

  const customStyles = {
    content: {
      // top: "0", // 세로 방향에서 화면 꼭대기에 위치
      left: '5%', // 가로 방향에서 화면의 중앙에 위치
      // right: "auto",
      // bottom: "auto",
      // marginRight: "-50%",
      // transform: "translate(-50%, 0)", // 중앙 정렬을 위한 변환
      width: '80%', // 모달의 가로 크기는 화면의 50%
      height: '80%', // 모달의 세로 크기는 화면의 100%
    },
  };

  const basket = {
    width: '230px',
    height: '185px',
    margin: '0 auto',
    border: '1px solid black', // 경계를 확인하기 위한 임시 스타일
  };
  const goHome = function () {
    navigate('/');
  };

  const goPay = function () {
    navigate('/pay');
  };

  const modalPay = function () {
    setPayIsOpen(true);
  };

  const handleDetailOpen = (id) => {
    const selectedItem = menus.find((menu) => menu.id === id);
    setSelectedItem(selectedItem);
    setMenuIsOpen(true);
  };

  return (
    <div style={ScreenStyle} className="container-row">
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <>
          <div className="container-colum">
            <div className="team-color">
              <img
                src={`${process.env.PUBLIC_URL}/imgs/blogo.png`}
                className="team-logo"
              />
              <button
                className={`category-button ${
                  selectedCategory === 'all' ? 'active' : ''
                }`}
                onClick={() => handleCategoryClick('all')}
              >
                추천
              </button>
              <button
                className={`category-button ${
                  selectedCategory === '커피' ? 'active' : ''
                }`}
                onClick={() => handleCategoryClick('커피')}
              >
                커피
              </button>
              <button
                className={`category-button ${
                  selectedCategory === '음료 메뉴' ? 'active' : ''
                }`}
                onClick={() => handleCategoryClick('음료 메뉴')}
              >
                음료 메뉴
              </button>
              <button
                className={`category-button ${
                  selectedCategory === '디카페인' ? 'active' : ''
                }`}
                onClick={() => handleCategoryClick('디카페인')}
              >
                디카페인
              </button>
              <button
                className={`category-button ${
                  selectedCategory === 'TEA' ? 'active' : ''
                }`}
                onClick={() => handleCategoryClick('TEA')}
              >
                TEA
              </button>
              <button
                className={`category-button ${
                  selectedCategory === '스무디, 프라페' ? 'active' : ''
                }`}
                onClick={() => handleCategoryClick('스무디, 프라페')}
              >
                스무디,
                <br /> 프라페
              </button>
              <button
                className={`category-button ${
                  selectedCategory === '에이드, 주스' ? 'active' : ''
                }`}
                onClick={() => handleCategoryClick('에이드, 주스')}
              >
                에이드,
                <br /> 주스
              </button>
              <button
                className={`category-button ${
                  selectedCategory === '디저트' ? 'active' : ''
                }`}
                onClick={() => handleCategoryClick('디저트')}
              >
                디저트
              </button>
            </div>
            <div className="container-menu-row">
              <div className="header">
                <div className="brand-logo">
                  <img
                    src={`${process.env.PUBLIC_URL}/imgs/BrandLogo.png`}
                    className="brand-logo"
                  />
                </div>
                <div className="home-icon">
                  <img
                    src={`${process.env.PUBLIC_URL}/imgs/home.png`}
                    className="home-icon"
                    onClick={goHome}
                  />
                </div>
              </div>

              <Modal isOpen={menuIsOpen} className="detail-modal">
                <div>
                  안녕
                  <MenuOptionBoth
                    menu={selectedItem}
                    setOption={setMenuIsOpen}
                  />
                </div>
              </Modal>

              <div className="menu-grid-container">
                {' '}
                {/* 이 div를 추가 */}
                {currentItems.map((menu) => (
                  <div
                    onClick={() => handleDetailOpen(menu.id)}
                    key={menu.id}
                    className="menu-item1"
                  >
                    {/* <img
                      src={`${process.env.PUBLIC_URL}/imgs/아메리카노.png`}
                      alt={menu.name}
                      className="menu-image1"
                    /> */}
                    <img
                      src={`${process.env.PUBLIC_URL}/imgs/${menu.image}`}
                      alt={menu.name}
                      className="menu-image1"
                    />
                    <div></div>
                    <div className="menu-name1">{menu.name}</div>
                    <div className="menu-price1">
                      {Boolean(Number(menu.price_hot))
                        ? menu.price_hot
                        : Boolean(Number(menu.price_ice))
                        ? menu.price_ice
                        : menu.price_constant}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bottom">
                <div className="page-indicators">
                  {/* <img
                    src={`${process.env.PUBLIC_URL}/imgs/dot1.png`}
                    className="page-dot1"
                  />
                  <img
                    src={`${process.env.PUBLIC_URL}/imgs/dot2.png`}
                    className="page-dot2"
                  />
                  <img
                    src={`${process.env.PUBLIC_URL}/imgs/dot2.png`}
                    className="page-dot2"
                  /> */}
                  {currentPage}
                  {'/'}
                  {totalPages}
                </div>
                <div className="page-buttons">
                  {/* {currentPage > 1 && (
                    <img
                      src={`${process.env.PUBLIC_URL}/imgs/leftY.png`}
                      className="page-button"
                      onClick={goToPrevPage}
                    />
                  )} */}
                  {currentPage === 1 ? (
                    <img
                      src={`${process.env.PUBLIC_URL}/imgs/left.png`}
                      className="page-button"
                      onClick={null}
                    />
                  ) : (
                    <img
                      src={`${process.env.PUBLIC_URL}/imgs/leftY.png`}
                      className="page-button"
                      onClick={goToPrevPage}
                    />
                  )}
                  {currentPage === totalPages ? (
                    <img
                      src={`${process.env.PUBLIC_URL}/imgs/right.png`}
                      className="page-button"
                      onClick={null}
                    />
                  ) : (
                    <img
                      src={`${process.env.PUBLIC_URL}/imgs/rightY.png`}
                      className="page-button"
                      onClick={goToNextPage}
                    />
                  )}
                  {/* {currentPage < totalPages && (
                    <img
                      src={`${process.env.PUBLIC_URL}/imgs/rightY.png`}
                      className="page-button"
                      onClick={goToNextPage}
                    />
                  )} */}
                </div>
              </div>
            </div>
          </div>
          <div className="container-baguni-col">
            <div style={basket} className="basket container-baguni-rowrow">
              <div className="baguni-text1">-주문한 상품</div>
              <div className="baguni-text2">
                {shoppingCart.map((menu) => (
                  <div>
                    {menu.name}/{menu.temp}/{menu.cup}/{menu.count}/{menu.price}
                  </div>
                ))}
              </div>
              <div className="baguni-text-container">
                <div className="baguni-text3"> 총 금액:</div>
                <div className="baguni-text4">{`${costSum}원`}</div>
              </div>
            </div>
            <div className="container-baguni-row">
              <div className="">
                {/* <img
                  src={`${process.env.PUBLIC_URL}/imgs/bubble.png`}
                  className="bubble"
                />
                <p className="bubble-text">안녕하세요 </p> */}
                <Message message={messages} />
                <img
                  src={`${process.env.PUBLIC_URL}/imgs/signature.png`}
                  className="boonga"
                />
              </div>
              <div className="pay-button-loc">
                <button className="pay-button" onClick={modalPay}>
                  결제하기
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <Modal
        isOpen={payIsOpen}
        //onRequestClose={() => setPayIsOpen(false)}
        // style={customStyles}
        contentLabel="pay Modal"
        className="detail-modal"
      >
        <div
          className="detail-modal-container"
          style={{ position: 'relative', zIndex: 3 }}
        >
          <div className="detail-modal-header-container">
            <div className="detail-modal-date-container">
              <p className="detail-modal-text-brand">메가커피 통일점</p>
              <p className="detail-modal-text-date">
                <CurrentTime />
              </p>
            </div>
            <div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <Message message={messages2} className="bubble2" />
              </div>
              <img
                src={`${process.env.PUBLIC_URL}/imgs/signature.png`}
                className="boonga2"
              />
            </div>
          </div>
          <div>
            <div className="detail-modal-checktext-container">
              주문 세부내용을 확인해 주세요!
            </div>
          </div>
          <div className="detail-modal-list">
            {!isZero
              ? menusDetail.map((menuDetail) => (
                  <div key={menuDetail.id} className="detail-modal-item">
                    <p className="detail-modal-menu-text">{menuDetail.menu}</p>
                    <span className="detail-modal-options-text">
                      {menuDetail.options}
                    </span>
                    <span className="detail-modal-count-text">
                      {menuDetail.number} 개
                    </span>
                    <span className="detail-modal-price-text">
                      {menuDetail.number * menuDetail.price} 원
                    </span>
                  </div>
                ))
              : '현재 선택한 메뉴가 없습니다.'}
          </div>
          <div className="detail-modal-total-container">
            <span>총 수량:</span>
            <span>{'N'} 개</span>
          </div>
          <div className="detail-modal-total-container">
            <span>총 결재금액:</span>
            <span>{'4,000'} 원</span>
          </div>
          <div className="detail-modal-btns-container">
            <div>
              <button
                className="detail-modal-cancel-button"
                onClick={() => setPayIsOpen(false)}
              >
                취소
              </button>
            </div>
            <div>
              <button className="detail-modal-in-button" onClick={goPay}>
                먹고가기
              </button>
            </div>
            <div>
              <button className="detail-modal-out-button" onClick={goPay}>
                포장하기
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CategoryPage;
