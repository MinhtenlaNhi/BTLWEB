import { Outlet } from "react-router";
import Content from "../content/Content";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Contact from "../contact/Contact";
import { useEffect, useState } from "react";
import { apiService } from "../../services/apiService";


export default function Layout(){
    const [data, setData] = useState([]);
    
  useEffect(() => {
    const fetchApi = async () => {
      const res = await apiService.getSetting();
      console.log("Cài đặt:", res.data.setting);
      setData(res.data.setting);
    }
    fetchApi();
  },[])
    return <>
        <Header data={data}/>
        <Content />
        <Footer data={data}/>
        <Contact />
    </>
}