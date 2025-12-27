import { useEffect, useRef, useState } from "react";
import { apiService } from "../../services/apiService";
import { Alert } from "antd";
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaCheck, FaTimes } from "react-icons/fa";

export default function Register() {
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Họ tên không được để trống";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Check password match
    if (name === "confirmPassword") {
      if (value === formData.password) {
        setPasswordMatch(true);
      } else {
        setPasswordMatch(false);
      }
    } else if (name === "password" && formData.confirmPassword) {
      if (value === formData.confirmPassword) {
        setPasswordMatch(true);
      } else {
        setPasswordMatch(false);
      }
    }

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.postRegister(
        formData.fullName,
        formData.email,
        formData.password
      );
      if (response.data.code === 200) {
        setAlert({
          message: response.data.message,
          type: "success",
        });
        setShowAlert(true);
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setPasswordMatch(null);
      } else {
        setAlert({
          message: response.data.message,
          type: "error",
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
          type={alert.type}
          showIcon
          closable
          className="box-alert"
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="register-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <FaUser className="input-icon" />
              Họ tên
            </label>
            <input
              type="text"
              placeholder="Nhập họ tên của bạn"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <span className="error-message">{errors.fullName}</span>
            )}
          </div>

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
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label>
              <FaLock className="input-icon" />
              Mật khẩu
            </label>
            <input
              type="password"
              placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label>
              <FaLock className="input-icon" />
              Xác nhận mật khẩu
            </label>
            <div className="password-confirm-wrapper">
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={passwordMatch === true ? "match" : passwordMatch === false ? "no-match" : ""}
              />
              {passwordMatch === true && (
                <FaCheck className="password-check-icon success" />
              )}
              {passwordMatch === false && (
                <FaTimes className="password-check-icon error" />
              )}
            </div>
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
            {passwordMatch === true && (
              <span className="success-message">Mật khẩu khớp</span>
            )}
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
                <FaUserPlus className="btn-icon" />
                Đăng ký
              </>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
