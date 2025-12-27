import { useState } from "react";
import { apiService } from "../../services/apiService";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { Alert } from "antd";

export default function SettingUser() {
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);
  const [cookies, _] = useCookies();
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();
    const tokenUser = cookies.tokenUser;
    const response = await apiService.postChangePassword(
      tokenUser,
      password.currentPassword,
      password.newPassword
    );
    if(response.data.code === 200){
      setAlert({
        message: response.data.message,
        type: "success"
      });
      setShowAlert(true);
    } else {
      setAlert({
        message: response.data.message,
        type: "error"
      });
      setShowAlert(true);
      
    }
    // Gọi API đổi mật khẩu ở đây
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
        />
      )}
      <div className="card p-4 mb-4">
        <h5 className="mb-3">Cài đặt tài khoản</h5>

        <h6 className="mb-2">Đổi mật khẩu</h6>
        <div className="row g-3">
          <form onSubmit={handleChangePassword}>
            <div className="form-group ">
              <label className="mb-2">Mật khẩu hiện tại</label>
              <input
                type="password"
                className="form-control"
                placeholder="Mật khẩu hiện tại"
                onChange={handleChange}
                name="currentPassword"
              />
            </div>
            <div className="form-group ">
              <label className="mb-2">Mật khẩu mới</label>
              <input
                type="password"
                className="form-control"
                placeholder="Mật khẩu mới"
                onChange={handleChange}
                name="newPassword"
              />
            </div>
            <div className="form-group ">
              <button type="submit">Đổi mật khẩu</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
