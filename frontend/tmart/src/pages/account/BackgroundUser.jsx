import { FaPencilAlt } from "react-icons/fa";
import { Cloudinary } from "@cloudinary/url-gen";
import { useEffect, useRef, useState } from "react";
import { apiService } from "../../services/apiService";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Alert } from "antd";
import useInfoUser from "../../hooks/useInfoUser";
export default function BackgroundUser() {
    const navigate = useNavigate();
  const [cookies, _] = useCookies();
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    type: ""
  });
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const {infoUser,setInfoUser,CLOUDNAME,UPLOADPRESET} = useInfoUser();

const cloudinaryRef = useRef();
  const widgetRef = useRef();
  // Lấy ra url avartar của user trên cloudinary
  useEffect(() => {
    if (!cookies.tokenUser) {
      navigate("/auth");
    } else {
      cloudinaryRef.current = window.cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: CLOUDNAME,
          uploadPreset: UPLOADPRESET,
        },
        (_, result) => {
          if (result.event === "success") {
            setInfoUser((prev) => ({
                ...prev,
                avartar: result.info.secure_url
            }))
          }
        }
      );
      //   lấy ra thông tin người dùng
      const fetchApi = async () => {
        try {
          const response = await apiService.getInfoUser(cookies.tokenUser);
          console.log(response);
          if (response.data.code === 200) {
            setInfoUser(prev => ({
              avartar: response.data.user.avartar || prev.avartar,
              email: response.data.user.email,
              fullName: response.data.user.fullName,
              phone: response.data.user.phone || prev.phone,
            }));
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchApi();
      //   lấy ra thông tin người dùng
    }
  }, [CLOUDNAME,UPLOADPRESET,cookies.tokenUser,navigate,setInfoUser]);
  // End Lấy ra url avartar của user trên cloudinary

  const handleUpdateInfoUser = async (e) => {
    const tokenUser = cookies.tokenUser;
    e.preventDefault();
    if (infoUser && tokenUser) {
      try {
        const response = await apiService.updateInfoUser(tokenUser, infoUser);
        console.log(response.data);
        if (response.data.code === 200) {
            setShowAlert(true);
            setAlert({
                message: response.data.message,
                type: "success"
            })
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleChangeInfoUser = (e) => {
    setInfoUser(prev => ({
        ...prev,
        [e.target.name]: e.target.value
    }));
};
console.log(infoUser)
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
        <h5>Hồ sơ cá nhân</h5>
        <div className="infoUser">
          <div className="inner-avartar d-flex">
            <img src={infoUser.avartar} />

            <FaPencilAlt
              className="icon-update"
              onClick={() => widgetRef.current.open()}
            />
          </div>
          <form onSubmit={handleUpdateInfoUser}>
            <label className="mb-2">Họ tên*</label>
            <input
              onChange={handleChangeInfoUser}
              type="text"
              name="fullName"
              placeholder="Nhập họ tên"
              value={infoUser.fullName}
            />

            <label className="mb-2">Số diện thoại*</label>
            <input
              onChange={handleChangeInfoUser}
              type="text"
              name="phone"
              placeholder="Nhập số điện thoại"
              value={infoUser.phone}
            />
            <label className="mb-2">Email*</label>
            <input
              onChange={handleChangeInfoUser}
              type="text"
              name="email"
              placeholder="Nhập email"
              value={infoUser.email}
            />
            <button type="submit">Lưu thay đổi</button>
          </form>
        </div>
      </div>
    </>
  );
}
