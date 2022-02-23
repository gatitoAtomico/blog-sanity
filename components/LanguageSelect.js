import { useRef, useState } from "react";
import Flag from "react-world-flags";
import Link from "next/link";
import meta_country from "lib/meta_country";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LanguageSelect = ({ locale, path }) => {
  const router = useRouter();
  const { pathname, asPath } = router;

  const [language, setLanguage] = useState(locale);
  const isOpen = useRef(false);
  const valueText = useRef(null);
  const selectContainer = useRef(null);
  const selectedValue = useRef(null);

  const isCurrentLocale = (value) => {
    return value != locale;
  };

  const toggleOptions = (e) => {
    isOpen.current = !isOpen.current;

    if (isOpen.current) {
      selectContainer.current.style.visibility = "visible";
      selectContainer.current.focus();
    } else {
      selectContainer.current.blur();
      selectContainer.current.style.visibility = "hidden";
    }
  };

  const selected = (val) => {
    router.push({ pathname }, asPath, { locale: val });
    setLanguage(val);
    toggleOptions();
  };

  return (
    <div>
      <input ref={selectedValue} name="select_value" type="hidden" />
      <div
        className="display-value"
        id="displayValue"
        onClick={(e) => {
          toggleOptions(e);
        }}
      >
        <span ref={valueText} className="value-text">
          <Flag
            className="flag"
            code={meta_country[language].flag}
            height="15"
          />
          <div className="current-lang">{meta_country[language].label}</div>
          <FontAwesomeIcon
            className="mobile-arrow"
            icon="angle-down"
            color="white"
          />
        </span>
      </div>
      <ul
        tabIndex="0"
        className="select-container"
        ref={selectContainer}
        onBlur={toggleOptions}
      >
        {Object.keys(meta_country)
          .filter((key) => isCurrentLocale(key))
          .map((key) => (
            <li key={key}>
              <div
                className="select-lang  select-option"
                onClick={() => selected(key)}
              >
                <Flag
                  className="flag"
                  code={meta_country[key].flag}
                  height="15"
                />
                {meta_country[key].label}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default LanguageSelect;
