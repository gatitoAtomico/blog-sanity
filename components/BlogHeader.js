import Link from "next/link";
import { Button } from "react-bootstrap";

const BlogHeader = ({
  title,
  subtitle,
  coverImage,
  author,
  date,
  category,
}) => {
  return (
    <div className="blog-detail-header">
      <Link
        style={{ backgroundColor: "#f1f1f1" }}
        href={`/category/${category?.slug}`}
      >
        <Button variant="primary" size="sm">
          {category.name}
        </Button>
      </Link>
      <h1 className="font-weight-bold blog-detail-header-title mb-0">
        {title}
      </h1>
      <p className="lead mb-0">
        By <Link href={`/author/${author?.slug}`}>{author?.name}</Link> - {date}
      </p>
      <h2 className="blog-detail-header-subtitle mb-3"> {subtitle}</h2>
      {/* Check if contains cover image */}
      <img className="img-fluid rounded" src={coverImage} alt="cover-image" />
    </div>
  );
};

export default BlogHeader;
