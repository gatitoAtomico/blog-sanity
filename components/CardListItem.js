import { Card } from "react-bootstrap";
import Link from "next/link";

const CardListItem = ({
  title,
  description,
  image,
  date,
  category,
  author,
  link,
  content,
}) => {
  const wordCount = content.reduce((acc, block) => {
    let currentLenght = 0;

    if (block.children && block.children.length > 0) {
      block.children.forEach((item) => {
        currentLenght += item.text.split(" ").filter(function (n) {
          return n != "";
        }).length;
      });
    }

    return currentLenght + acc;
  }, 0);
  return (
    <Card className={`fj-card fj-card-list`}>
      <div className="card-body-wrapper">
        <div className="flex-container">
          <img src={image} height="100px" width="80px" alt="avatar" />
          <div>
            <Card.Title className="font-weight-bold mb-1">
              <div className="d-flex justify-content-between">
                <Link href={`/author/${author.slug}`}>
                  <a> {author.name}</a>
                </Link>{" "}
                <div className="read-time">
                  Estimated read time: {Math.round(wordCount / 50)} minutes
                </div>
              </div>
            </Card.Title>
            <Card.Text className="card-date">
              {`${date} - `}
              <Link href={`/category/${category.slug}`}>
                <a>{category.name.toUpperCase()}</a>
              </Link>
            </Card.Text>

            <Card.Title className="card-main-title">{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
          </div>
        </div>
        {/* 
        <Card.Body className="d-flex flex-row">
          <img src={image} height="80px" width="80px" alt="avatar" />
          <div>
            <Card.Title className="font-weight-bold mb-1">
              {author.name}
            </Card.Title>
            <Card.Text className="card-date">{`${date} - Category`}</Card.Text>
            <Card.Title className="card-main-title">{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
          </div>
        </Card.Body> */}
        {/* <Card.Body>
          <Card.Title className="card-main-title">{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body> */}
      </div>
      <Link {...link}>
        <a className="card-button">Read More</a>
      </Link>
    </Card>
  );
};

export default CardListItem;
