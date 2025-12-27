import { Cloudinary } from "@cloudinary/url-gen";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { apiService } from "../services/apiService";


export default function useInfoUser() {
    // Lấy avartar mặc định nếu người dùng chưa có avartar
  const CLOUDNAME = import.meta.env.VITE_CLOUDNAME;
  const PUBLICID = import.meta.env.VITE_PUBLICID;
  const UPLOADPRESET = import.meta.env.VITE_UPLOADPRESET;

  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDNAME,
    },
  });
  const myImage = cld.image(PUBLICID);
  const urlCloudinary = `https://res.cloudinary.com/${CLOUDNAME}/image/upload/v1760180381/`;
  const avartarUrl = urlCloudinary + myImage.publicID;
  // End Lấy avartar mặc định nếu người dùng chưa có avartar
  const [cookies, _] = useCookies();
  const [infoUser, setInfoUser] = useState({
    avartar: avartarUrl,
    email: "",
    fullName: "",
    phone: "",
  });
  //   lấy ra thông tin người dùng
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await apiService.getInfoUser(cookies.tokenUser);
        console.log(response);
        if (response.data.code === 200) {
          setInfoUser((prev) => ({
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
  }, [cookies.tokenUser]);
  //   lấy ra thông tin người dùng
  return {
    setInfoUser,infoUser,CLOUDNAME,UPLOADPRESET
  };
}