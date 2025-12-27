import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import "./ResetPassword.css"
import { useLocation } from "react-router"
import { apiService } from "../../services/apiService"
import { useState } from "react"
import { useEffect } from "react"
import { Alert } from "antd"
import { useCookies } from "react-cookie"

export default function ResetPassword(){
    const [sookies,setCookie,removeCookie] = useCookies();
    const [showAlert, setShowAlert] = useState();
    const [password,setPassword] = useState();
    const [confirmPassword,setConfirmPassword] = useState(false);
    const [alert, setAlert] = useState({
      message: "",
      type: ""
    });
    useEffect(() => {
        const timer = setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        return () => clearTimeout(timer);
      }, [showAlert]);
    const handleSubmitForm = async(e) => {
      e.preventDefault();
      try{
        const response = await apiService.postResetPassword(sookies.tokenUser,password);
        if(response.data.code === 200){
          setShowAlert(true);
          setAlert({
            message: response.data.message,
            type: "success"
          });
          removeCookie("tokenUser")
        }
        else{
          setShowAlert(true);
          setAlert({
            message: response.data.message,
            type: "error"
          })
        }
      }
      catch(error){
        console.log(error);
      }
    }

    const handleConfirmPassword = (e) => {
      if(e.target.value !== password){
        setConfirmPassword(true);
      }
      else{
        setConfirmPassword(false);

      }

    }
    return <>
        {showAlert && (
        <Alert
          message={alert.message}
          type={alert.type}
          showIcon
          closable
          className="box-alert"
        />
      )}
        <div className="reset-password">
        <Container>
          <Row>
            <Col sm={12}>
              <h1 className="text-center">Đặt lại mật khẩu</h1>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <form onSubmit={handleSubmitForm}>
                <div className="form-group">
                  <label>Mật khẩu mới</label>

                  <input
                    type="password"
                    className="form-control"
                    onChange={e => setPassword(e.target.value)}

                  />
                  {password === "" && <p className="text-danger">Mật khẩu không được để trống</p>}
                </div>
                <div className="form-group">
                  <label>Xác nhận mật khẩu mới</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={handleConfirmPassword}
                  />
                  {confirmPassword && <p className="text-danger">Mật khẩu xác nhận không trùng khớp</p>}

                </div>
                <button
                  className="btn btn-success form-control"
                  type="submit"
                  disabled = {password === "" || confirmPassword ? true : false}
                >
                  Đặt lại
                </button>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
}