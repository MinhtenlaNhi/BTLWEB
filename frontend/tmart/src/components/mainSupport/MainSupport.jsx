import { AiFillProduct } from "react-icons/ai";
import { MdOutlinePayment } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { Link } from "react-router-dom";
import "./MainSupport.css"
export default function MainSupport(){
    return (
        <>
            <div className="title pb-xl-3 pl-xl-0 pt-xl-2 d-sm-none d-md-flex">
                <div className="product">
                  <AiFillProduct className="icon" />
                  <Link to="/products">Sách</Link>
                </div>
                <div className="payment">
                  <MdOutlinePayment className="icon" />
                  <Link to="/method-payment">Hình thức thanh toán</Link>
                </div>
                <div className="news">
                  <MdOutlineEmail className="icon" />
                  <Link to="*">Tin tức Tmart</Link>
                </div>
                {/* <div className="hotline">
                  <MdOutlinePhoneInTalk className="icon" />
                  <Link to="*">Hotline</Link>
                </div> */}
              </div>
        </>
    )
}