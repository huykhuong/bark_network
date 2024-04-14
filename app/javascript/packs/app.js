import ReactRailsUJS from "react_ujs";

import * as Components from "../app/**/*.tsx";

let componentsContext = {};
Components.filenames.forEach((fileName, i) => {
  let cleanName = fileName
    .replace("../app/", "")
    .replace(".tsx", "")
    .replace("/index", "");
  componentsContext[cleanName] = Components.default[i].default;
});

ReactRailsUJS.getConstructor = (name) => componentsContext[name];

// ReactRailsUJS.handleEvent("turbo:load", ReactRailsUJS.handleMount, false);
// ReactRailsUJS.handleEvent("turbo:frame-load", ReactRailsUJS.handleMount, false);
// ReactRailsUJS.handleEvent(
//   "turbo:before-render",
//   ReactRailsUJS.handleUnmount,
//   false
// );
