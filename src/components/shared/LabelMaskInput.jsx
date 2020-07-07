import React from "react";
import Input from "react-input-mask";

const LabelMaskInput = ({
  lblTxt,
  inputNm,
  className = "",
  value,
  onChange,
  error = "",
  refreshErrors,
  mask,
  maskChar = null,
  ...restProps
}) => {
  //   console.log("rerendering labelMask", inputNm);

  //   const handleKeyDown = (e) => {
  //     let key = e.keyCode || e.which;
  //     if (!!mask) {
  //       // disable arrow keys when mask is on
  //       if (key >= 37 && key <= 40) {
  //         e.returnValue = false;
  //         if (e.preventDefault) e.preventDefault();
  //       }
  //     }
  //   };

  const handleBlur = () => {
    refreshErrors(inputNm);
  };

  return (
    <section
      className={`d-flex flex-column flex-column-reverse mb-3 px-0 ${className}`}
    >
      <aside className="text-danger small">{!!error ? error : ""}&nbsp;</aside>
      <Input
        className="formInput"
        type="text"
        name={inputNm}
        id={inputNm}
        mask={mask}
        maskChar={maskChar}
        autoComplete={"none"}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        {...restProps}
      />
      <label htmlFor={inputNm} className="formLabel d-block">
        {lblTxt}
      </label>
    </section>
  );
};

function arePropsEqual(prevProp, nextProp) {
  return (
    prevProp.value === nextProp.value &&
    prevProp.onChange === nextProp.onChange &&
    prevProp.error === nextProp.error
  );
}

export default React.memo(LabelMaskInput, arePropsEqual);
