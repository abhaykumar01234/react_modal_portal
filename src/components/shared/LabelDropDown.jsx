import React, { useState } from "react";

const Divider = React.memo(() => (
  <span className="p-0" style={{ borderTop: "1px dashed #bcbcbc" }}></span>
));

const LabelDropDown = ({
  lblTxt,
  dropdownNm,
  title,
  items = [],
  onSelect,
  className = "",
  refreshErrors,
  ...restProps
}) => {
  console.log("rendering dd", dropdownNm);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const toggleDropDown = () => setDropDownOpen((m) => !m);

  const handleBlur = () => {
    refreshErrors(dropdownNm);
    setDropDownOpen(false);
  };

  const handleSelect = (e, value) => {
    e.stopPropagation();
    // console.log(id, "and", items[id - 1], "was selected");
    let evt = { target: {} };
    evt.target.name = dropdownNm;
    evt.target.value = value;
    onSelect(evt);
    setDropDownOpen(false);
  };

  return (
    <section
      className={`d-flex flex-column flex-column-reverse mb-3 formDropdown ${className}`}
      {...restProps}
    >
      <aside className="text-danger">&nbsp;</aside>
      <article
        className="d-flex align-items-center formInput"
        name={dropdownNm}
        value={title}
        onClick={toggleDropDown}
        tabIndex={-1}
        onBlur={handleBlur}
        style={{ color: title ? "#555" : "#999" }}
      >
        <div className="w-100">{title || `Select ${lblTxt}`}</div>

        {dropDownOpen && (
          <aside className="d-flex flex-column">
            {items.length > 0 &&
              items.map(({ id, value }, idx) => (
                <React.Fragment key={id}>
                  <div onClick={(e) => handleSelect(e, value)}>{value}</div>
                  {idx < items.length - 1 && <Divider />}
                </React.Fragment>
              ))}
          </aside>
        )}
      </article>
      <label htmlFor={dropdownNm} className="formLabel d-block">
        {lblTxt}
      </label>
    </section>
  );
};

function arePropsEqual(prevProp, nextProp) {
  return (
    prevProp.value === nextProp.value && prevProp.onChange === nextProp.onChange
  );
}

export default React.memo(LabelDropDown, arePropsEqual);
