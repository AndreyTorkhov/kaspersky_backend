exports.validateUserData = (data) => {
  const { name, surname, status, role } = data;

  if (
    !name ||
    !surname ||
    typeof status !== "boolean" ||
    !["User", "Admin", "Guest"].includes(role)
  ) {
    return { valid: false, message: "Invalid user data" };
  }

  return { valid: true };
};
