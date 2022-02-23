import { useEffect, useContext } from "react";
import { AppContext } from "util/AppManager";
import PageLayout from "components/PageLayout";
import {
  getBlogsByAuthor,
  getAllAuthors,
  getAuthorProperties,
  getMegamenuItems,
  getAllGlobals,
  getAllAssets,
} from "lib/api";
import { Row, Col } from "react-bootstrap"; //installed with npm install --save @sanity/block-content-to-react, use it to parse large content
import formatDate from "lib/formatDate";
import CardListItem from "components/CardListItem";

export default function BlogDetail({
  blogs,
  author,
  megamenuItems,
  globals,
  assets,
}) {
  const appContext = useContext(AppContext);

  useEffect(() => {
    console.log("search", appContext.searchResults);
    appContext.populateBlogList(blogs);
  }, [blogs]);

  const header = (
    <div className="category-page-header">
      <label className="category-label text-primary">Author</label>
      <div className="category-name">{author.name.toUpperCase()}</div>
    </div>
  );
  return (
    <PageLayout
      blogsList={blogs}
      layoutHeader={header}
      megamenuItems={megamenuItems}
      sideImage={assets.sideImage}
      logo={assets.logo}
      footer={globals.footer}
    >
      <div className="blog-detail-page">
        {/* <Intro /> Juan Mata */}
        {appContext.allBlogs &&
          (appContext.allBlogs.length > 0 ? (
            <Row className="mb-5">
              {appContext.allBlogs.map((blog) => (
                <Col key={`${blog.slug}-list`} md="12">
                  <CardListItem
                    author={blog.author}
                    title={blog.title}
                    description={blog.description}
                    date={formatDate(blog.date)}
                    category={blog.category}
                    content={blog.content}
                    image={blog.coverImage}
                    slug={blog.slug}
                    link={{
                      href: `/blogs/${blog.slug}`,
                    }}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            " ...No Results found "
          ))}
      </div>
    </PageLayout>
  );
}

//created dynamically
// for better undertanding of paramas check https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
// export async function getServerSideProps({ params }) {
//   console.log("those are the parameters", params);
//   const blogs = await getBlogsByCategory(params.category);
//   return {
//     props: { blogs },
//   };
// }

//created statically
export async function getStaticProps({ params, locale }) {
  const blogs = await getBlogsByAuthor(params.author, locale);
  const author = await getAuthorProperties(params.author);
  const megamenuItems = await getMegamenuItems(locale);
  const assets = await getAllAssets();
  const globals = await getAllGlobals();
  return {
    props: { blogs, author, megamenuItems, globals, assets },
  };
}

//function provided by next use to create static paths from dynamic routes

export async function getStaticPaths({ locales }) {
  const authors = await getAllAuthors();
  let paths = [];
  authors?.map((author) => {
    for (const locale of locales) {
      paths.push({
        params: {
          author: author.slug,
        },
        locale,
      });
    }
  });

  return {
    paths,
    fallback: false,
  };
}
