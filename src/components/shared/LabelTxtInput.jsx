import React from "react";

const LabelTxtInput = ({
  lblTxt,
  inputNm,
  className = "",
  value,
  onChange,
  error = "",
  refreshErrors,
  regexClass = /^[A-Za-z0-9\s]$/,
  size,
  mask = "",
  formatChars = {},
  ...restProps
}) => {
  // console.log("rendering labelInput", inputNm);

  const formats = {
    "9": "[0-9]",
    a: "[A-Za-z]",
    "*": "[A-Za-z0-9]",
    ...formatChars,
  };

  const handleBlur = () => {
    refreshErrors(inputNm);
  };

  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    key = String.fromCharCode(key);

    if (!!mask && mask.length >= value.length) {
      if (
        key !== mask[value.length] &&
        (!formats[mask[value.length]] ||
          !new RegExp(formats[mask[value.length]]).test(key))
      ) {
        e.returnValue = false;
        if (e.preventDefault) e.preventDefault();
      }
    } else if (
      // 32:space, 9:tab, 8:backspace, 46:delete, 16:shift 17:ctrl 18:alt
      // ![32, 9, 8, 17, 18, 46].includes(e.which) &&
      // [16].includes(e.which) &&
      !regexClass.test(key) ||
      (size && value.length >= size)
    ) {
      e.returnValue = false;
      if (e.preventDefault) e.preventDefault();
    }
  };

  const handleKeyDown = (e) => {
    let key = e.keyCode || e.which;
    if (!!mask) {
      // disable arrow keys when mask is on
      if (key >= 37 && key <= 40) {
        e.returnValue = false;
        if (e.preventDefault) e.preventDefault();
      }
    }
  };

  return (
    <section
      className={`d-flex flex-column flex-column-reverse mb-3 px-0 ${className}`}
    >
      <aside className="text-danger">{!!error ? error : ""}&nbsp;</aside>
      <input
        className="formInput"
        type="text"
        name={inputNm}
        id={inputNm}
        autoComplete={"off"}
        autoCorrect={"off"}
        autoCapitalize={"none"}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      <label htmlFor={inputNm} className="formLabel d-block">
        {lblTxt}
      </label>
    </section>
  );
};

// when false => component will rerender
// when true => component will not update
// !shouldComponentUpdate
function arePropsEqual(prevProp, nextProp) {
  return (
    prevProp.value === nextProp.value && prevProp.onChange === nextProp.onChange
  );
}

export default React.memo(LabelTxtInput, arePropsEqual);
