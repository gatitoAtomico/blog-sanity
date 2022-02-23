import { Row, Col } from "react-bootstrap"; //installed with npm install --save @sanity/block-content-to-react, use it to parse large content
import CardItem from "components/CardItem";
import formatDate from "lib/formatDate";

const BlogFooter = ({ author, relatedBlogs }) => {
  return (
    <>
      <div className="blog-detail-footer">
        <div className="in-lines">
          <img
            className="avatar"
            src={author?.avatar}
            width={90}
            height={90}
            alt="avatar"
          />
        </div>
        {author?.name}
        <div className="in-lines related-posts">Related Posts</div>
      </div>
      <Row>
        {relatedBlogs.map((blog) => (
          <Col key={`${blog.slug}-list`} md="6">
            <CardItem
              author={blog.author}
              title={blog.title}
              subtitle={blog.subtitle}
              date={formatDate(blog.date)}
              image={blog.coverImage}
              slug={blog.slug}
              link={{
                href: `/blogs/${blog.slug}`,
              }}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default BlogFooter;
