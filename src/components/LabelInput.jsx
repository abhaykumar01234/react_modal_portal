import React from "react";

const LabelInput = ({
  lblTxt,
  inputNm,
  className = "",
  value,
  onChange,
  error = "",
  refreshErrors,
  regexClass = /^[A-Za-z0-9\s]$/,
  size,
  ...restProps
}) => {
  // console.log("rendering labelInput", inputNm);

  const handleBlur = () => {
    refreshErrors(inputNm);
  };

  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    key = String.fromCharCode(key);
    // 32:space, 9:tab, 8:backspace, 46:delete, 16:shift 17:ctrl 18:alt
    if (
      // ![32, 9, 8, 17, 18, 46].includes(e.which) &&
      // [16].includes(e.which) &&
      !regexClass.test(key) ||
      (size && value.length >= size)
    ) {
      e.returnValue = false;
      if (e.preventDefault) e.preventDefault();
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

export default React.memo(LabelInput, arePropsEqual);
