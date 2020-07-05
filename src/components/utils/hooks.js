import { useState, useEffect, useRef } from "react";

export const useForm = (callback, initialState = {}, validateKeys) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const [editDone, setEditDone] = useState(false);

  let onChange = useRef((e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  });

  useEffect(() => {
    if (editDone) {
      onChange.current = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
      setEditDone(false);
    }
  }, [editDone, values]);

  const validate = (values, errKey) => {
    let validChecks = validateKeys(values);
    let errors = {};

    if (!!errKey) {
      validChecks[errKey] &&
        validChecks[errKey].forEach((val) => {
          if (val[0]) errors[errKey] = val[1];
        });
    } else {
      for (const [key, checks] of Object.entries(validChecks)) {
        checks.forEach((val) => {
          if (val[0]) errors[key] = val[1];
        });
      }
    }

    return errors;
  };

  const onSubmit = (e) => {
    e && e.preventDefault();
    const errObj = validate(values);

    if (Object.keys(errObj).length === 0) {
      callback();
      setValues(initialState); //if not redirected
      setErrors({});
    } else {
      setErrors(errObj);
    }
  };

  const refreshErrors = (errKey) => {
    // console.log("refreshErrors", errKey);
    let errKeyObj = validate(values, errKey);

    if (!!errKey) {
      // error removed case
      if (Object.keys(errKeyObj).length === 0) {
        delete errors[errKey];
        setErrors({ ...errors });
      } else setErrors({ ...errors, ...errKeyObj });
    } else setErrors(validate(values));

    setEditDone(true);
  };

  return {
    onChange: onChange.current,
    onSubmit,
    errors,
    values,
    refreshErrors,
  };
};
