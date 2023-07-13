export const slugRegex = (value: string) => {
  const startCheck = new RegExp("^[a-z0-9_]");
  const lengthAndCharCheck = new RegExp("^[a-z0-9_.-]{3,15}$");

  if (!lengthAndCharCheck.test(value)) {
    return {
      valueValid: false,
      valueError: "name must be 3-15 charactor of numbers, lowercase letters, underscore and period.",
    };
  }

  if (!value.match(/[a-z]/g)) {
    return {
      valueValid: false,
      valueError: "name must contain atleast one letter",
    };
  }

  if (!startCheck.test(value)) {
    return {
      valueValid: false,
      valueError: "name cannot start with a period",
    };
  }

  return {
    valueValid: true,
    valueError: "",
  };
};
