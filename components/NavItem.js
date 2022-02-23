import Link from "next/link";
import { Image } from "react-bootstrap";
import formatDate from "lib/formatDate";

const NavItem = ({ category, slideIndex, slides, dots, categoryClass }) => {
  const splitInChunks = (blogsByCategory) => {
    //change chunkSize in order to change the number of items that will be displayed in the megamenu for every category
    const chunkSize = 2;

    return blogsByCategory
      ?.map((e, i) => {
        return i % chunkSize === 0
          ? blogsByCategory.slice(i, i + chunkSize)
          : null;
      })
      .filter((e) => {
        return e;
      });
  };

  const plusSlides = (position) => {
    var i;
    slideIndex += position;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    } else if (slideIndex < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "flex";
    dots[slideIndex - 1].className += " active";
  };

  return (
    <div className="ss-container">
      {category &&
        splitInChunks(category).map((group, index) => (
          <div key={index} className={`${categoryClass}-slides`}>
            {group.map((item, index) => (
              <Link key={index} href={`/blogs/${item.slug}`}>
                <div className="navigation-item">
                  <Image
                    src={item.coverImage}
                    width={90}
                    height={90}
                    className="pics"
                    alt="avatar"
                  />
                  <div className="titleBlogNav">
                    <b>{item.title}</b>
                  </div>
                  <div className="dateBlogNav">{formatDate(item.date)}</div>
                </div>
              </Link>
            ))}
          </div>
        ))}

      <div style={{ textAlign: "center", paddingTop: "10px" }}>
        {category &&
          splitInChunks(category).map((group, index) => (
            <span key={index} className={`${categoryClass}-dot dot`}></span>
          ))}
      </div>
      <div className="arrows">
        <a className="prev" onClick={() => plusSlides(-1)}>
          &#10094;
        </a>
        <a className="next" onClick={() => plusSlides(1)}>
          &#10095;
        </a>
      </div>
    </div>
  );
};

export default NavItem;
