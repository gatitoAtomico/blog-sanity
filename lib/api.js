import sanityClient from "./sanity";
import stringSanitizer from "./stringSanitizer";

const megamenuFields = `
_id,
title,
'slug':slug.current,
date,
'coverImage':coverImage.asset->url,
'category':category->{name,'slug':slug.current},
`;

const assetsFields = `
'sideImage':sideImage.asset->url,
'logo':logo.asset->url,
`;

const globalsFields = `
footer,
`;

const blogFields = `
_id,
title,
description,
'slug':slug.current,
date,
'author':author->{name,'slug':slug.current,'avatar':avatar.asset->url},//point to the reference retrieve only name and avatar,
'category':category->{name,'slug':slug.current},
'coverImage':coverImage.asset->url,
`;

const authorFields = `
name,
'slug':slug.current,
`;

const categoryFields = `
_id,
name,
'slug':slug.current,
`;

// use sanity GROQ to fetch data check at https://www.sanity.io/docs/query-cheat-sheet
//follow this for the localization and remove it afterwards
export async function getAllBlogs(locale, is_staic_paths = true) {
  // get only title subtitle slug

  let blogs = await sanityClient.fetch(
    `*[_type == "blog"  &&  __i18n_lang =="en"] | order(date desc) {${blogFields}  content[]{..., "asset":asset->}} `
  );

  if (is_staic_paths) {
    return blogs;
  } else {
    if (locale != "en") {
      let localizedBlogs = [];
      for (const blog of blogs) {
        const localizedBlog = await sanityClient
          .fetch(
            `*[_id == "i18n.${blog._id}.${locale}"] {${blogFields}
          content[]{..., "asset":asset->}}`
          )
          .then((res) => res?.[0]);
        //ovewrite slug with the slug of the default language
        localizedBlog.slug = blog.slug;
        //ovewrite cateory slug with the slug of the default category language
        localizedBlog.category.slug = blog.category.slug;
        localizedBlogs.push(localizedBlog);
      }
      return localizedBlogs;
    }
    return blogs;
  }
}

export async function getMegamenuItems(locale) {
  let categorySlugs = [
    "analysis",
    "partners",
    "crypto",
    "company-news",
    "education",
    "news",
  ];

  const navMenuList = {};
  for (const categorySlug of categorySlugs) {
    var blogsByCategory = await sanityClient.fetch(
      `*[_type == "blog" && category._ref in *[_type=="category" && slug.current == '${categorySlug}']._id ] {${megamenuFields}}`
    );

    if (locale != "en") {
      let localizedBlogs = [];
      for (const blog of blogsByCategory) {
        const localizedBlog = await sanityClient
          .fetch(`*[_id == "i18n.${blog._id}.${locale}"] {${megamenuFields}}`)
          .then((res) => res?.[0]);
        //ovewrite slug with the slug of the default language
        localizedBlog.slug = blog.slug;
        //custom field added in order to store the category name for the current language
        localizedBlog.label = localizedBlog.category.name;
        //ovewrite cateory slug with the slug of the default category language
        localizedBlog.category.slug = blog.category.slug;
        localizedBlog.category.name = blog.category.name;
        localizedBlogs.push(localizedBlog);
        // console.log(localizedBlogs);
      }
      let category = stringSanitizer(localizedBlogs[0]?.category.name);

      navMenuList[category] = localizedBlogs;
    } else {
      let category = stringSanitizer(blogsByCategory[0]?.category.name);
      navMenuList[category] = blogsByCategory;
    }
  }
  return navMenuList;
}

export async function getAllCategories() {
  // get only title subtitle slug
  const categories = await sanityClient.fetch(
    `*[_type == "category" &&  __i18n_lang =="en"] | order(date desc) {${categoryFields}}`
  );
  return categories;
}

export async function getAllAuthors() {
  // get only title subtitle slug
  const categories = await sanityClient.fetch(
    `*[_type == "author"] | order(date desc) {${authorFields}}`
  );
  return categories;
}

export async function getBlogBySlug(slug, locale) {
  const blog = await sanityClient
    .fetch(
      `*[_type == "blog" && slug.current == $slug] {
      ${blogFields}
      content[]{..., "asset":asset->}
    }`,
      { slug }
    )
    .then((res) => res?.[0]); //the above query will return an array from which we want only the first element

  if (locale != "en") {
    const localizedBlog = await sanityClient
      .fetch(
        `*[_id == "i18n.${blog._id}.${locale}"] {${blogFields}  content[]{..., "asset":asset->}}`
      )
      .then((res) => res?.[0]);
    // console.log("language is not english");
    localizedBlog.category.slug = blog.category.slug;
    return localizedBlog;
  }

  return blog;
}

export async function getBlogsByCategory(categorySlug, locale) {
  const blogs = await sanityClient.fetch(
    `*[_type == "blog" && category._ref in *[_type=="category" && slug.current == '${categorySlug}']._id ] {${blogFields} 
    content[]{..., "asset":asset->}}`
  );
  if (locale != "en") {
    let localizedBlogs = [];
    for (const blog of blogs) {
      const localizedBlog = await sanityClient
        .fetch(
          `*[_id == "i18n.${blog._id}.${locale}"] {${blogFields}
        content[]{..., "asset":asset->}}`
        )
        .then((res) => res?.[0]);
      //ovewrite slug with the slug of the default language
      localizedBlog.slug = blog.slug;
      //ovewrite cateory slug with the slug of the default category language
      localizedBlog.category.slug = blog.category.slug;
      localizedBlogs.push(localizedBlog);
      // console.log(localizedBlogs);
    }
    return localizedBlogs;
  }
  return blogs;
}

export async function getCategoryAttributes(categorySlug, locale) {
  const category = await sanityClient
    .fetch(
      `*[_type=='category' && slug.current == '${categorySlug}'] {${categoryFields}}`
    )
    .then((res) => res?.[0]); //get only the first element in the returning array

  if (locale != "en") {
    const localizedCategory = await sanityClient
      .fetch(`*[_id == "i18n.${category._id}.${locale}"] {${categoryFields}}`)
      .then((res) => res?.[0]);
    // console.log("language is not english");
    return localizedCategory;
  }
  return category;
}

export async function getBlogsByAuthor(authorSlug, locale) {
  const blogs = await sanityClient.fetch(
    `*[_type == "blog"   &&  __i18n_lang =="en" && author._ref in *[_type=="author" && slug.current == '${authorSlug}']._id ] {${blogFields}
    content[]{..., "asset":asset->}}`
  );

  if (locale != "en") {
    let localizedBlogs = [];
    for (const blog of blogs) {
      const localizedBlog = await sanityClient
        .fetch(
          `*[_id == "i18n.${blog._id}.${locale}"] {${blogFields}
        content[]{..., "asset":asset->}}`
        )
        .then((res) => res?.[0]);
      //ovewrite slug with the slug of the default language
      localizedBlog.slug = blog.slug;
      localizedBlogs.push(localizedBlog);
    }
    return localizedBlogs;
  }

  return blogs;
}

export async function getAuthorProperties(authorSlug) {
  const author = await sanityClient
    .fetch(
      `*[_type=='author' && slug.current == '${authorSlug}'] {${authorFields}}`
    )
    .then((res) => res?.[0]); //get only the first element in the returning array
  return author;
}

export async function getAllAssets() {
  // get only title subtitle slug
  const assets = await sanityClient
    .fetch(`*[_type == "assets"] | order(date desc) {${assetsFields}} `)
    .then((res) => res?.[0]);
  return assets;
}

export async function getAllGlobals() {
  // get only title subtitle slug
  const globals = await sanityClient
    .fetch(`*[_type == "globals"] {${globalsFields}} `)
    .then((res) => res?.[0]);
  return globals;
}
