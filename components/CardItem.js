import { Card } from "react-bootstrap";
import Link from "next/link";

const CardItem = ({ title, subtitle, image, date, link }) => {
  return (
    <Card className={`fj-card`}>
      <div className="card-body-wrapper">
        <Card.Header className="d-flex flex-row">
          <div>
            <Card.Text className="card-date">{date}</Card.Text>
          </div>
        </Card.Header>
        <div className="view overlay">
          <Card.Img src={image} alt="Card image cap" />
        </div>
        <Card.Body>
          <Card.Title className="card-main-title">{title}</Card.Title>
          <Card.Text>{subtitle}</Card.Text>
        </Card.Body>
      </div>
      <Link {...link}>
        <a className="card-button">Read More</a>
      </Link>
    </Card>
  );
};

export default CardItem;
