import { useEffect, useState } from "react";
import "./Test.css"; // CSS 파일을 import 합니다.

function Test() {
  const [menus, setMenus] = useState([]); // 메뉴 데이터를 위한 상태

  useEffect(() => {
    fetch("/megaMenu.json") // public 폴더에 있는 menus.json 파일을 fetch 합니다.
      .then((response) => response.json())
      .then((data) => setMenus(data)) // 데이터를 상태에 저장합니다.
      .catch((error) => console.error("Error fetching menus:", error));
  }, []);

  return (
    <div className="menu-list">
      {menus.slice(0, 5).map((menu) => (
        <div key={menu.pk} className="menu-item">
          <img
            src={`${process.env.PUBLIC_URL}/Imgs/아메리카노.png`}
            alt={menu.fields.name}
            className="menu-image"
          />
          <div className="menu-name">{menu.fields.name}</div>
          <div className="menu-price">{menu.fields.price_hot}</div>
        </div>
      ))}
    </div>
  );
}

export default Test;

// import blogo from "../Imgs/Boonga.png";
// <img src={blogo} className="Boong" />
{
  /*
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Modal from "react-modal";
import "./CategoryPage.css";
function CategoryPage() {
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [payIsOpen, setPayIsOpen] = useState(false);
  // const [menuIsOpen, setMenuIsOpen] = useState(false);

  const navigate = useNavigate();

  const itemsPerPage = 9;
  const totalPages = Math.ceil(menus.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = menus.slice(indexOfFirstItem, indexOfLastItem);

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const costSum = 123000;
  const getMenus = async () => {
    const json = await (await fetch("/megaMenu2.json")).json();
    // console.log(json);
    setMenus(json);
    setLoading(false);
  };

  useEffect(() => {
    getMenus();
  }, []);

  const ScreenStyle = {
    width: "386px",
    height: "840px",
    margin: "0 auto",
    border: "1px solid black", // 경계를 확인하기 위한 임시 스타일
  };

  const basket = {
    width: "230px",
    height: "185px",
    margin: "0 auto",
    border: "1px solid black", // 경계를 확인하기 위한 임시 스타일
  };

  const goHome = function () {
    navigate("/");
  };

  //버튼들 만들기
  return (
    <div style={ScreenStyle} className="container-row">
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <>
          <div className="container-colum">
            <div className="team-color">
              <img
                src={`${process.env.PUBLIC_URL}/Imgs/logo.png`}
                className="team-logo"
              />
              <button className="category-button">추천</button>
              <button className="category-button">커피</button>
              <button className="category-button">
                스무디 <br />
                프라페
              </button>
              <button className="category-button">
                에이드 <br />
                주스
              </button>
              <button className="category-button">차(Tea)</button>
              <button className="category-button">음료</button>
              <button className="category-button">디저트</button>
              <button className="category-button">기타</button>
            </div>
            <div className="container-menu-row">
              <div className="header">
                <div className="brand-logo">
                  <img
                    src={`${process.env.PUBLIC_URL}/Imgs/BrandLogo.png`}
                    className="brand-logo"
                  />
                </div>
                <div className="home-icon">
                  <img
                    src={`${process.env.PUBLIC_URL}/Imgs/home.png`}
                    className="home-icon"
                    onClick={goHome}
                  />
                </div>
              </div>

              <div className="menu-grid-container">
                {" "}
                
                {currentItems.map((menu) => (
                  <div key={menu.id} className="menu-item">
                    <img
                      src={`${process.env.PUBLIC_URL}/Imgs/아메리카노.png`}
                      alt={menu.name}
                      className="menu-image1"
                    />
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
                  <img
                    src={`${process.env.PUBLIC_URL}/Imgs/dot1.png`}
                    className="page-dot1"
                  />
                  <img
                    src={`${process.env.PUBLIC_URL}/Imgs/dot2.png`}
                    className="page-dot2"
                  />
                  <img
                    src={`${process.env.PUBLIC_URL}/Imgs/dot2.png`}
                    className="page-dot2"
                  />
                </div>
                <div className="page-buttons">
                  {currentPage > 1 && (
                    <img
                      src={`${process.env.PUBLIC_URL}/Imgs/left.png`}
                      className="page-button"
                      onClick={goToPrevPage}
                    />
                  )}
                  {currentPage < totalPages && (
                    <img
                      src={`${process.env.PUBLIC_URL}/Imgs/right.png`}
                      className="page-button"
                      onClick={goToNextPage}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="container-baguni-col">
            <div style={basket} className="basket container-baguni-rowrow">
              <div className="baguni-text1">
                -주문한 상품 <hr />
              </div>
              <div>백에서 받아오기</div>
              <div className="baguni-text-container">
                <div className="baguni-text3"> 총 금액:</div>
                <div className="baguni-text4">{`${costSum}원`}</div>
              </div>
            </div>
            <div className="container-baguni-row">
              <div>
                <img
                  src={`${process.env.PUBLIC_URL}/Imgs/Boonga.png`}
                  className="boonga"
                />
              </div>
              <div>
                <button className="pay-button">결제하기</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CategoryPage;

*/
}
