import { Container, Col, Row, Button } from "react-bootstrap";
import { useRef, useState, useEffect, useContext } from "react";
import BlogNavbar from "./BlogNavbar";
import Head from "next/head";
import SearchBar from "./SearchBar";
import { AppContext } from "util/AppManager";
import { useRouter } from "next/router";
import formatDate from "lib/formatDate";
import Link from "next/link";
import BlogContent from "components/BlogContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PageLayout({
  blogsList,
  children,
  layoutHeader,
  sideImage,
  megamenuItems,
  logo,
  footer,
  hasPaginationButtons = true,
}) {
  const router = useRouter();
  const appContext = useContext(AppContext);
  const startIndex = useRef(0);
  const endIndex = useRef(3);
  const pageSlice = useRef(3);
  const searchQuery = useRef();
  const paginationNumber = useRef(3);

  const previous = () => {
    if (startIndex.current > 0) {
      startIndex.current = startIndex.current - pageSlice.current;
      endIndex.current = endIndex.current - pageSlice.current;
    }
    appContext.paginate(blogsList, startIndex.current, endIndex.current);
  };

  const next = () => {
    if (blogsList.length > endIndex.current) {
      startIndex.current = startIndex.current + pageSlice.current;
      endIndex.current = endIndex.current + pageSlice.current;
    }
    appContext.paginate(blogsList, startIndex.current, endIndex.current);
  };

  const onChangeSearch = (e) => {
    searchQuery.current = e.target.value;

    //reset to inital
    if (e.target.value.length === 0) {
      //case that the user resets the search bar populate all blogs
      appContext.populateBlogList(blogsList);
    }
  };

  const onClickSearch = () => {
    appContext.setSearchQuery(searchQuery.current);
    router.push(`/search/blog-search`);

    // console.log("intitialblogs", appContext.initialBlogs);
    // if (searchQuery.current && searchQuery.current.length > 0) {
    //   appContext.searchBlogs(
    //     allBlogs.current,
    //     searchQuery.current.toLowerCase(),
    //     pageSlice.current
    //   );
    // }
  };

  // appContext.setAllBlogs(blogsList.slice(startIndex, endIndex));

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap"
          rel="stylesheet"
        />
      </Head>
      <BlogNavbar logo={logo} megamenu={megamenuItems} />
      {layoutHeader && <div className="archive-head">{layoutHeader}</div>}
      <Container>
        <div className="page-layout-flex">
          <div className="flex-left">
            {children}

            {blogsList &&
              hasPaginationButtons &&
              //show pagination buttons only if there are more blocks displayed than the pagination number
              (blogsList.length > paginationNumber.current ? (
                <div className="page-pagination">
                  <div className="mb-5">
                    <Button variant="secondary" size="lg" onClick={previous}>
                      Previous
                    </Button>
                    <Button variant="secondary" size="lg" onClick={next}>
                      Next
                    </Button>
                  </div>
                </div>
              ) : (
                ""
              ))}
          </div>
          <div className="flex-right page-wrapper">
            <div className="side-img">
              <img
                src={sideImage}
                width="100%"
                height={300}
                alt="tio-side-image"
              />
            </div>
            <h3>Search</h3>
            <hr width="100%" />
            <SearchBar onChange={onChangeSearch} onClick={onClickSearch} />
            <h3>Latest Forex Articles</h3>
            <hr width="100%" />
            {blogsList?.slice(0, 3).map((blog) => (
              <Link key={`${blog?.slug}-list`} href={`/blogs/${blog?.slug}`}>
                <div className="latest-blogs">
                  <div className="post-title">
                    <b>{blog.title}</b>
                  </div>
                  <div className="post-date">{formatDate(blog.date)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
      <footer className="page-footer">
        <Container>
          <div className="social-icons">
            <div className="icon">
              <FontAwesomeIcon
                icon={["fab", "facebook-square"]}
                color="#2d53fe"
                size="4x"
              />
            </div>
            <div className="icon">
              <FontAwesomeIcon
                icon={["fab", "twitter-square"]}
                color="#2d53fe"
                size="4x"
              />
            </div>
            <div className="icon">
              <FontAwesomeIcon
                icon={["fab", "instagram-square"]}
                color="#2d53fe"
                size="4x"
              />
            </div>
            <div className="icon">
              <FontAwesomeIcon
                icon={["fab", "linkedin"]}
                color="#2d53fe"
                size="4x"
              />
            </div>
          </div>
          {<BlogContent content={footer} />}
        </Container>
      </footer>
    </>
  );
}
