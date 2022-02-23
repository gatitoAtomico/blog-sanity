import { useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import PageLayout from "components/PageLayout";
import CardListItem from "components/CardListItem";
import {
  getAllBlogs,
  getAllAssets,
  getMegamenuItems,
  getAllGlobals,
} from "lib/api";
import formatDate from "lib/formatDate";
import { AppContext } from "util/AppManager";

//destructure props from getStaticProps() to Home function
export default function Home({ blogsList, assets, megamenuItems, globals }) {
  const appContext = useContext(AppContext);

  useEffect(() => {
    appContext.populateBlogList(blogsList);
    appContext.setInitialBlogs(...[blogsList]);
  }, [blogsList]);

  return (
    <PageLayout
      blogsList={blogsList}
      sideImage={assets.sideImage}
      megamenuItems={megamenuItems}
      logo={assets.logo}
      footer={globals.footer}
    >
      <div className="blog-detail-page">
        {appContext.allBlogs && (
          <Row className="mb-5">
            {appContext.allBlogs.length > 0
              ? appContext.allBlogs.map((blog) => (
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
                ))
              : " ...No Results found "}
          </Row>
        )}
      </div>
    </PageLayout>
  );
}

//this function is called during the build (build time)
//its called on the server not the client
//provide props to you page
// it will create static page
export async function getStaticProps({ locale }) {
  const blogsList = await getAllBlogs(locale, false);
  const assets = await getAllAssets();
  const megamenuItems = await getMegamenuItems(locale);
  const globals = await getAllGlobals();

  return {
    props: {
      blogsList,
      assets,
      megamenuItems,
      globals,
    },
  };
}
