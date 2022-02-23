import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LIST_VIEW_ICONS = ["list", "border-all"];

const FilteringMenu = ({ onChange, filter }) => {
  return (
    <div className="filtering-menu mb-2">
      <FontAwesomeIcon
        className="clickable hoverable"
        icon={LIST_VIEW_ICONS[filter.view.list]}
        size="2x"
        onClick={() => onChange({ list: +!filter.view.list })}
      />
    </div>
  );
};

export default FilteringMenu;
