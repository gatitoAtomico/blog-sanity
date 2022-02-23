import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavItem from "./NavItem";
// import Image from "next/image";
import { Image, Button } from "react-bootstrap";
// import { Image, Navbar } from "react-bootstrap";
// import Link from "next/link";
import Flag from "react-world-flags";
import Link from "next/link";
import meta_country from "lib/meta_country";
import { useRouter } from "next/router";
import LanguageSelect from "./LanguageSelect";

const BlogNavbar = ({ megamenu, logo, locale }) => {
  const [rerender, setRerender] = useState(0);
  const router = useRouter();

  const { asPath } = router;

  const slideIndexRef = useRef({
    analysis: "",
    education: 0,
    "company-news": 0,
    // partners: 0,
  });

  const slidesRef = useRef({
    analysis: "",
    education: 0,
    "company-news": 0,
    // partners: 0,
  });

  const dotsRef = useRef({
    analysis: "",
    education: 0,
    "company-news": 0,
    // partners: 0,
  });
  useEffect(() => {
    //trigger
    showSlides();
  }, []);

  const isCurrentLocale = (value) => {
    return value != router.locale;
  };

  const showSlides = () => {
    for (var key in slideIndexRef.current) {
      // console.log("key " + key + " has value " + slideIndexRef.current[key]);
      var i;
      slidesRef.current[key] = document.getElementsByClassName(`${key}-slides`);
      dotsRef.current[key] = document.getElementsByClassName(`${key}-dot`);

      for (i = 0; i < slidesRef.current[key].length; i++) {
        slidesRef.current[key][i].style.display = "none";
      }
      slideIndexRef.current[key] = 1;
      for (i = 0; i < dotsRef.current[key].length; i++) {
        dotsRef.current[key][i].className = dotsRef.current[key][
          i
        ].className.replace("active", "");
      }

      slidesRef.current[key][slideIndexRef.current[key] - 1].style.display =
        "flex";
      dotsRef.current[key][slideIndexRef.current[key] - 1].className +=
        " active";
    }
    setRerender(1);
  };

  const openNav = () => {
    document.getElementById("mySidenav").style.left = ("left", "0vw");
  };

  const closeNav = () => {
    document.getElementById("mySidenav").style.left = ("left", "-75vw");
  };

  return (
    <Nav className="top-nav">
      <Container>
        <ul className="menu">
          <div className="mobile-menu-toggle">
            <FontAwesomeIcon icon="bars" color="white" onClick={openNav} />
          </div>

          <li className="logo">
            <Link href="/">
              <Image src={logo} width={200} height={40} alt="logo" />
            </Link>
          </li>
          <div id="mySidenav" className="sidenav">
            <div className="mobile-menu-toggle closebtn">
              <FontAwesomeIcon icon="times" color="white" onClick={closeNav} />
            </div>
            <li className="menu-item">
              <Link href="/category/crypto">Crypto</Link>
            </li>
            <li className="menu-item">
              <Link href="/category/analysis">
                {megamenu.analysis[0].label
                  ? megamenu.analysis[0].label
                  : "Analysis"}
              </Link>
              <i>
                {" "}
                <FontAwesomeIcon
                  className="arrow"
                  icon="angle-down"
                  color="white"
                />
              </i>
              <ul className="submenu">
                <li className="submenu-item">
                  <div className="submenu-bottom">
                    <div className="submenu-bottom-item">
                      {/* analysis */}
                      <NavItem
                        category={megamenu.analysis}
                        slideIndex={slideIndexRef.current["analysis"]}
                        slides={slidesRef.current["analysis"]}
                        dots={dotsRef.current["analysis"]}
                        categoryClass="analysis"
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <Link href="/category/education">
                {megamenu.education[0].label
                  ? megamenu.education[0].label
                  : "Education"}
              </Link>
              <i>
                {" "}
                <FontAwesomeIcon
                  className="arrow"
                  icon="angle-down"
                  color="white"
                />
              </i>
              <ul className="submenu">
                <li className="submenu-item">
                  <div className="submenu-bottom">
                    <div className="submenu-bottom-item">
                      <NavItem
                        category={megamenu.education}
                        slideIndex={slideIndexRef.current["education"]}
                        slides={slidesRef.current["education"]}
                        dots={dotsRef.current["education"]}
                        categoryClass="education"
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <Link href="/category/company-news">
                {megamenu.companynews[0].label
                  ? megamenu.companynews[0].label
                  : "Company News"}
              </Link>
              <i>
                {" "}
                <FontAwesomeIcon
                  className="arrow"
                  icon="angle-down"
                  color="white"
                />
              </i>
              <ul className="submenu">
                <li className="submenu-item">
                  <div className="submenu-bottom">
                    <div className="submenu-bottom-item">
                      {/* company news */}
                      <NavItem
                        category={megamenu.companynews}
                        slideIndex={slideIndexRef.current["company-news"]}
                        slides={slidesRef.current["company-news"]}
                        dots={dotsRef.current["company-news"]}
                        categoryClass="company-news"
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <Link href="/category/partners">Partners</Link>
            </li>
            <div className="lang-menu">
              <li className="menu-item">
                <Link href={asPath} locale={router.locale}>
                  <div className="selected-lang current-lang">
                    <Flag
                      className="flag"
                      code={meta_country[router.locale].flag}
                      height="15"
                    />
                    <div className="current-lang">
                      {meta_country[router.locale].label}
                    </div>
                  </div>
                </Link>
              </li>
              <ul>
                {/* show all countries except the one wih the current locale */}
                {Object.keys(meta_country)
                  .filter((key) => isCurrentLocale(key))
                  .map((key) => (
                    <li key={key}>
                      <Link href={asPath} locale={key}>
                        <div className="select-lang">
                          <Flag
                            className="flag"
                            code={meta_country[key].flag}
                            height="15"
                          />
                          {meta_country[key].label}
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            {/* mobile language selelect */}
            <div className="d-lg-none">
              <LanguageSelect locale={router.locale} path={asPath} />
            </div>

            {/* end of sidenav */}
          </div>
          <li className="menu-item start-trading">
            <Button type="button" className="btn bg-transparent btn-lg">
              Start Trading
            </Button>
            Trading Carries Risk
          </li>
        </ul>
      </Container>
    </Nav>
  );
};

export default BlogNavbar;
