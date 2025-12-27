import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { apiService } from "../../services/apiService";
import { Alert } from "antd";
import { useCookies } from "react-cookie";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";

export default function Login() {
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiService.postLogin(
        formData.email,
        formData.password,
        cookies.cartId
      );
      if (response.data.code === 200) {
        setAlert({
          message: response.data.message,
        });
        setCookies("tokenUser", response.data.tokenUser);
        sessionStorage.setItem("justLogin", "true");
        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        setAlert({
          message: response.data.message,
        });
        setShowAlert(true);
      }
    } catch (error) {
      setAlert({
        message: "Lỗi kết nối đến máy chủ",
        type: "error",
      });
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showAlert && (
        <Alert
          message={alert.message}
          type="error"
          showIcon
          closable
          className="box-alert"
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <FaEnvelope className="input-icon" />
              Email
            </label>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <FaLock className="input-icon" />
              Mật khẩu
            </label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Link to="/forgot-password" className="forgot-password">
              Quên mật khẩu?
            </Link>
          </div>
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Đang xử lý...
              </>
            ) : (
              <>
                <FaSignInAlt className="btn-icon" />
                Đăng nhập
              </>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
