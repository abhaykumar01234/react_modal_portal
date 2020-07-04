import React from "react";

const LabelInput = ({
  lblTxt,
  inputNm,
  className = "",
  value,
  onChange,
  editMode,
  onBlur,
  ...restProps
}) => {
  // console.log("rendering labelInput", inputNm);

  return (
    <section
      className={`d-flex flex-column flex-column-reverse mb-3 px-0 ${className}`}
      {...restProps}
    >
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
        onBlur={onBlur}
      />
      <label htmlFor={inputNm} className="formLabel d-block">
        {lblTxt}
      </label>
    </section>
  );
};

function arePropsEqual(prevProp, nextProp) {
  return (
    prevProp.value === nextProp.value && prevProp.editMode === nextProp.editMode
  );
}

export default React.memo(LabelInput, arePropsEqual);
