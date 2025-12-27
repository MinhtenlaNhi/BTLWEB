import { FaFacebookMessenger } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import "./Contact.css";
export default function Contact() {
  return (
    <>
      <div className="all-contact">
        <div className="mess">
          <FaFacebookMessenger className="icon"/>
        </div>
        <div className="phone">
          <FaPhoneAlt className="icon"/>
        </div>
      </div>
    </>
  );
}
