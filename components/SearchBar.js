import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({ onChange, onClick }) => {
  return (
    <div className="search-bar-container">
      <label htmlFor="header-search"></label>

      <input
        className="search-input search-input-text"
        onChange={onChange}
        type="text"
        id="header-search"
        placeholder="Search"
        name="search"
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            onClick();
          }
        }}
      />
      <button className="search-input" onClick={onClick}>
        <FontAwesomeIcon icon="search" />
      </button>
    </div>
  );
};

export default SearchBar;
