import ReactRailsUJS from "react_ujs";

import * as Components from "../app/**/*.tsx";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

let componentsContext = {};
Components.filenames.forEach((fileName, i) => {
  let cleanName = fileName
    .replace("../app/", "")
    .replace(".tsx", "")
    .replace("/index", "");
  componentsContext[cleanName] = Components.default[i].default;
});

ReactRailsUJS.getConstructor = (name) => componentsContext[name];
