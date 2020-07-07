import React, { useRef, useEffect } from "react";

const LabelTxtInput = ({
  lblTxt,
  inputNm,
  className = "",
  value,
  onChange,
  error = "",
  refreshErrors,
  regexClass = /[A-Za-z0-9\s]/,
  size,
  mask = "",
  formatChars = {},
  ...restProps
}) => {
  // console.log("rendering labelInput", inputNm);

  const pasteRef = useRef(false);

  const formats = {
    "9": "[0-9]",
    a: "[A-Za-z]",
    "*": "[A-Za-z0-9]",
    ...formatChars,
  };

  useEffect(() => {
    if (pasteRef.current) {
      // check this value for mask, size, regex
      let evt = { target: { name: inputNm } };
      let newVal = "";

      if (!mask) {
        for (let key of value) {
          if (regexClass.test(key)) newVal += key;
        }
        if (size) newVal = newVal.slice(0, size);
      } else {
        for (let m = 0, i = 0; m < mask.length; i++) {
          let key = value[i];
          if (
            key === mask[m] ||
            (!!formats[mask[m]] && new RegExp(formats[mask[m]]).test(key))
          ) {
            newVal += key;
            m++;
          }
        }
      }

      evt.target.value = newVal;
      onChange(evt);

      pasteRef.current = false;
    }
  }, [value, regexClass, inputNm, onChange, size, formats, mask]);

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
    } else if (!regexClass.test(key) || (size && value.length >= size)) {
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

  const handleBlur = () => {
    refreshErrors(inputNm);
  };

  const handlePaste = (e) => {
    pasteRef.current = true;
  };

  return (
    <section
      className={`d-flex flex-column flex-column-reverse mb-3 px-0 ${className}`}
    >
      <aside className="text-danger small">{!!error ? error : ""}&nbsp;</aside>
      <input
        className="formInput"
        type="text"
        name={inputNm}
        id={inputNm}
        autoComplete={"none"}
        autoCorrect={"off"}
        autoCapitalize={"none"}
        value={value}
        onChange={onChange}
        onPaste={handlePaste}
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
    prevProp.value === nextProp.value &&
    prevProp.onChange === nextProp.onChange &&
    prevProp.error === nextProp.error
  );
}

export default React.memo(LabelTxtInput, arePropsEqual);
