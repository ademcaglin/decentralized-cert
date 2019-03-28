export const pageInitialState = {
  currentPage: "scan"
};

export const pageActions = {
  scan: () => ({ currentPage: "scan" }),
  view: () => ({ currentPage: "view" })
};
