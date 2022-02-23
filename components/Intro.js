import { Row, Col, Media, Image } from "react-bootstrap";

const Intro = ({ author }) => {
  return (
    <Col md="12">
      {/* INTRO STARTS */}
      <Media className="mb-4 admin-intro">
        <Image
          roundedCircle
          src={author?.avatar}
          width={90}
          height={90}
          className="mr-3 "
          alt="avatar"
        />
      </Media>
      {/*  INTRO ENDS */}
    </Col>
  );
};

export default Intro;
