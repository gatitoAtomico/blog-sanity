import { useState, useRef, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import PageLayout from "components/PageLayout";
import CardListItem from "components/CardListItem";
import formatDate from "lib/formatDate";
import { AppContext } from "util/AppManager";
import {
  getAllBlogs,
  getMegamenuItems,
  getAllGlobals,
  getAllAssets,
} from "lib/api";

const Search = ({ allBlogs, megamenuItems, globals, assets }) => {
  const appContext = useContext(AppContext);
  const searchResult = useRef();
  const hasResults = useRef(false);

  const [searchBlogs, setSearchBlogs] = useState([...allBlogs]);

  useEffect(() => {
    appContext.populateBlogList(allBlogs);
    if (appContext.searchQuery) {
      searchResult.current = allBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(appContext.searchQuery.toLowerCase())
      );

      if (searchResult.current.length > 0) {
        hasResults.current = true;
      } else {
        hasResults.current = false;
      }
      setSearchBlogs([...searchResult.current]);
    } else {
      setSearchBlogs([...allBlogs]);
    }
  }, [allBlogs, appContext.searchQuery]);

  const header = (
    <div className="category-page-header">
      <label className="category-label text-primary">
        {searchBlogs.length} Search Result(s)
      </label>
      <div className="category-name">{appContext.searchQuery}</div>
    </div>
  );

  return (
    <PageLayout
      blogsList={searchBlogs}
      layoutHeader={header}
      megamenuItems={megamenuItems}
      sideImage={assets.sideImage}
      logo={assets.logo}
      footer={globals.footer}
    >
      <div className="blog-detail-page">
        {!!appContext.searchQuery ? (
          appContext.searchQuery &&
          (hasResults.current ? (
            <Row className="mb-5">
              {searchResult.current.map((blog) => (
                <Col key={`${blog.slug}-list`} md="12">
                  <CardListItem
                    author={blog.author}
                    title={blog.title}
                    description={blog.description}
                    date={formatDate(blog.date)}
                    category={blog.category}
                    image={blog.coverImage}
                    content={blog.content}
                    slug={blog.slug}
                    link={{
                      href: `/blogs/${blog.slug}`,
                    }}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <div>
              <h1>Nothing Found!</h1>
              <p>
                Apologies, but no results were found for the requested archive.
                Try using the search with a relevant phrase to find the post you
                are looking for.
              </p>
            </div>
          ))
        ) : (
          //case that will run only if the input of the searchquery is epmpty
          <Row className="mb-5">
            {appContext.allBlogs &&
              appContext.allBlogs.map((blog) => (
                <Col key={`${blog.slug}-list`} md="12">
                  <CardListItem
                    author={blog.author}
                    title={blog.title}
                    description={blog.description}
                    date={formatDate(blog.date)}
                    category={blog.category}
                    image={blog.coverImage}
                    content={blog.content}
                    slug={blog.slug}
                    link={{
                      href: `/blogs/${blog.slug}`,
                    }}
                  />
                </Col>
              ))}
          </Row>
        )}
      </div>
    </PageLayout>
  );
};

export default Search;

export async function getServerSideProps({ locale }) {
  const allBlogs = await getAllBlogs(locale, false);
  const megamenuItems = await getMegamenuItems(locale);
  const assets = await getAllAssets();
  const globals = await getAllGlobals();
  return {
    props: { allBlogs, megamenuItems, globals, assets },
  };
}
