import MainSupport from "../mainSupport/MainSupport";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TitleMenu from "../titleMenu/TitleMenu";
import Title from "../title/Title";

export default function MainTitle({textTitle}) {
  return (
    <>
      <div className="main-title">
        <Container>
          <Row>
            <Col >
              <TitleMenu />
            </Col>
            <Col sm={9} lg={8} className="px-0">
              <MainSupport />
            </Col>
          </Row>
          <Row>
            <Title textTitle={textTitle}/>
          </Row>
        </Container>
      </div>
    </>
  );
}
