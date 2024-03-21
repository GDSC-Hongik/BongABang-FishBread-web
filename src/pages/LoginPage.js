import "./LoginPage.css";
import UserInput from "../component/UserInput";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  }); // 이메일, 비밀번호
  const [loginErr, setLoginErr] = useState(".");
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((userInfo) => ({
      ...userInfo,
      [name]: value,
    }));
    console.log(userInfo);
  };

  const loginRequest = function () {
    console.log(12);
    //handleLogin()
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://example.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        // 로그인 성공
        navigate("/login");
      } else {
        // 로그인 실패
        console.error("로그인 실패");
        setLoginErr("로그인에 실패하였습니다.");
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생:", error);
    }
  };

  const isInvaild =
    userInfo.email.includes("@") &&
    userInfo.email.includes(".") &&
    userInfo.password.length >= 1;

  return (
    <div className="login-container">
      <div className="flex-container">
        <div className="login-text">
          BoongABang <br /> 로그인
        </div>
      </div>
      <div className="flex-container">
        <img
          src={`${process.env.PUBLIC_URL}/imgs/signature.png`}
          className="login-img"
        />
      </div>
      <div>
        <div className="login-error-inform">{loginErr}</div>
        <div onChange={handleInputChange}>
          <div className="flex-container">
            <UserInput
              type="text"
              placeholder="이메일"
              value={userInfo.email}
              name="email"
            />
          </div>
          <div className="flex-container">
            <UserInput
              type="password"
              placeholder="비밀번호"
              value={userInfo.password}
              name="password"
            />
          </div>
          <div className="flex-container">
            <button
              onClick={loginRequest}
              className="login-btn"
              disabled={!isInvaild}
            >
              로그인
            </button>
          </div>
          <div className="flex-container">
            <Link to="/register" className="login-signup">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
