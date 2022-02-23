import PageLayout from "components/PageLayout";
import BlogHeader from "components/BlogHeader";
import {
  getBlogBySlug,
  getAllBlogs,
  getBlogsByAuthor,
  getMegamenuItems,
  getAllGlobals,
  getAllAssets,
} from "lib/api";
import BlogContent from "components/BlogContent";
import formatDate from "lib/formatDate";
import BlogFooter from "components/BlogFooter";

export default function BlogDetail({
  blog,
  relatedBlogs,
  megamenuItems,
  globals,
  assets,
  blogsList,
}) {
  //remove the current blog thats been displayed from the related list
  let filteredRelatedBlogs = relatedBlogs.filter(
    (relatedlog) => relatedlog.title != blog.title
  );

  return (
    <PageLayout
      className="blog-detail-page"
      megamenuItems={megamenuItems}
      footer={globals.footer}
      sideImage={assets.sideImage}
      logo={assets.logo}
      blogsList={blogsList}
      hasPaginationButtons={false}
    >
      <BlogHeader
        title={blog.title}
        subtitle={blog.subtitle}
        coverImage={blog.coverImage}
        author={blog.author}
        category={blog.category}
        date={formatDate(blog.date)}
      />
      <BlogContent content={blog.content} />
      <BlogFooter
        author={blog.author}
        //need 4 related blogs max
        relatedBlogs={filteredRelatedBlogs.slice(0, 4)}
      />
    </PageLayout>
  );
}

//created dynamically
// for better undertanding of paramas check https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering

// export async function getServerSideProps({ params }) {
//   console.log("those are the parameters", params);
//   debugger;
//   const blog = await getBlogBySlug(params.slug);
//   return {
//     props: { blog },
//   };
// }

//created statically
export async function getStaticProps({ params, locale }) {
  const blog = await getBlogBySlug(params.slug, locale);
  const authorSlug = await blog.author.slug;
  const relatedBlogs = await getBlogsByAuthor(authorSlug, locale);
  const globals = await getAllGlobals();
  const assets = await getAllAssets();
  const megamenuItems = await getMegamenuItems(locale);
  const blogsList = await getAllBlogs(locale, false);
  return {
    props: { blog, relatedBlogs, megamenuItems, globals, assets, blogsList },
  };
}

//function provided by next use to create static paths from dynamic routes
export async function getStaticPaths({ locales }) {
  const blogs = await getAllBlogs();
  let paths = [];
  blogs?.map((blog) => {
    for (const locale of locales) {
      paths.push({
        params: {
          slug: blog.slug,
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
