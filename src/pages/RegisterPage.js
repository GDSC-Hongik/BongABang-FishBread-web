import "./RegisterPage.css";
import UserInput from "../component/UserInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function RegisterPage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    password_check: "",
    store_name: "",
    store_address: "",
    owner_phone_number: "",
    store_phone: "",
  }); // 이메일, 비밀번호
  const [loginErr, setLoginErr] = useState("");
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((userInfo) => ({
      ...userInfo,
      [name]: value,
    }));

    console.log(userInfo);
  };

  const isInvaild =
    userInfo.email.includes("@") &&
    userInfo.email.includes(".") &&
    userInfo.password.length >= 1;

  const clickRegister = function () {
    if (userInfo.name) {
      if (userInfo.email) {
        if (userInfo.password) {
          if (userInfo.password == userInfo.password_check) {
            setLoginErr("");
            registerRequest();
          } else {
            setLoginErr("비밀번호가 일치하지 않습니다.");
          }
        } else {
          setLoginErr("비밀번호를 입력해주세요.");
        }
      } else {
        setLoginErr("이메일을 확인해주세요.");
      }
    } else {
      setLoginErr("이름을 확인해주세요.");
    }
  };
  const registerRequest = async () => {
    try {
      const response = await fetch("http://example.com/regist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        // 로그인 성공
        navigate("/");
      } else {
        // 로그인 실패
        console.error("회원가입 실패");
        setLoginErr("회원가입에 실패하였습니다.");
      }
    } catch (error) {
      console.error("회원가입 요청 중 오류 발생:", error);
    }
  };

  return (
    <div className="register-container">
      <div className="flex-container">
        <div className="register-text">회원가입</div>
      </div>

      <div className="register-input-container">
        <div onChange={handleInputChange}>
          <div className="flex-container">
            <div>
              <div className="register-input-name">
                이름 <span className="register-must-input">*</span>
              </div>
              <UserInput
                type="text"
                placeholder="이름"
                value={userInfo.name}
                name="name"
              />
            </div>
          </div>
          <div className="flex-container">
            <div>
              <div className="register-input-name">
                이메일 주소 <span className="register-must-input">*</span>
              </div>
              <UserInput
                type="text"
                placeholder="이메일 주소"
                value={userInfo.email}
                name="email"
              />
            </div>
          </div>
          <div className="flex-container">
            <div>
              <div className="register-input-name">
                비밀번호 <span className="register-must-input">*</span>
              </div>
              <UserInput
                type="password"
                placeholder="비밀번호"
                value={userInfo.password}
                name="password"
              />
            </div>
          </div>
          <div className="flex-container">
            <div>
              <div className="register-input-name">
                비밀번호 확인 <span className="register-must-input">*</span>{" "}
                {/* <span>{loginErr}</span> */}
              </div>
              <UserInput
                type="password"
                placeholder="비밀번호 확인"
                value={userInfo.password_check}
                name="password_check"
              />
            </div>
          </div>
          <div className="flex-container">
            <div>
              <div className="register-input-name">
                매장 이름 <span className="register-must-input"></span>
              </div>
              <UserInput
                type="text"
                placeholder="매장 이름"
                value={userInfo.store_name}
                name="store_name"
              />
            </div>
          </div>
          <div className="flex-container">
            <div>
              <div className="register-input-name">
                매장 주소 <span className="register-must-input"></span>
              </div>
              <UserInput
                type="text"
                placeholder="매장 주소"
                value={userInfo.store_address}
                name="store_address"
              />
            </div>
          </div>
          <div className="flex-container">
            <div>
              <div className="register-input-name">
                휴대폰 번호 <span className="register-must-input"></span>
              </div>
              <UserInput
                type="text"
                placeholder="휴대폰 번호"
                value={userInfo.owner_phone_number}
                name="owner_phone_number"
              />
            </div>
          </div>
          <div className="flex-container">
            <div>
              <div className="register-input-name">
                매장 전화번호 <span className="register-must-input"></span>
              </div>
              <UserInput
                type="text"
                placeholder="매장 전화번호"
                value={userInfo.store_phone}
                name="store_phone"
              />
            </div>
          </div>
          <div className="flex-container">
            <div>
              <div className="register-err-msg">{loginErr}</div>
              <button
                onClick={clickRegister}
                className="register-btn"
                //disabled={!isInvaild}
              >
                회원가입
              </button>
            </div>
          </div>
          <div className="flex-container">
            <Link to="/" className="register-signup">
              뒤로가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
