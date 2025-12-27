import { PiGreaterThanThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import "./title.css";


export default function Title({textTitle}) {
  return (
    <>
      <div className="category">
        <Link to="/">Trang chủ</Link>
        <span>/</span>
        <span>
          {textTitle}
        </span>
      </div>
    </>
  );
}
