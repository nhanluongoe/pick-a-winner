export const hidePrefix = (name?: string) => {
  if (!name) return;
  return name.replace("DBD_", "");
};
