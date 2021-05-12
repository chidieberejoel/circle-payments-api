import FormatDateDirective from "./formatDate";
import isAuthenticatedDirective from "./isAuthenticated";
import isAuthorizedDirective from "./isAuthorized";

module.exports = {
  schemaDirectives: {
    date: FormatDateDirective,
    isAuthenticated: isAuthenticatedDirective,
    isAuthorized: isAuthorizedDirective,
  },
};
