import { useEffect, useContext } from "react";
import { AppContext } from "util/AppManager";
import PageLayout from "components/PageLayout";
import {
  getBlogsByCategory,
  getAllCategories,
  getCategoryAttributes,
  getMegamenuItems,
  getAllGlobals,
  getAllAssets,
} from "lib/api";
import { Row, Col } from "react-bootstrap"; //installed with npm install --save @sanity/block-content-to-react, use it to parse large content
import formatDate from "lib/formatDate";
import CardListItem from "components/CardListItem";

export default function BlogDetail({
  categoryBlogs,
  category,
  megamenuItems,
  globals,
  assets,
}) {
  const appContext = useContext(AppContext);

  useEffect(() => {
    appContext.populateBlogList(categoryBlogs);
  }, [categoryBlogs]);

  const header = (
    <div className="category-page-header">
      <label className="category-label text-primary">CATEGORY</label>
      <div className="category-name">{category.name.toUpperCase()}</div>
    </div>
  );

  return (
    <PageLayout
      blogsList={categoryBlogs}
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
  const categoryBlogs = await getBlogsByCategory(params.category, locale);
  const category = await getCategoryAttributes(params.category, locale);
  const megamenuItems = await getMegamenuItems(locale);
  const assets = await getAllAssets();
  const globals = await getAllGlobals();
  return {
    props: { categoryBlogs, category, megamenuItems, globals, assets },
  };
}

export async function getStaticPaths({ locales }) {
  const categories = await getAllCategories();
  let paths = [];
  categories?.map((category) => {
    for (const locale of locales) {
      paths.push({
        params: {
          category: category.slug,
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
