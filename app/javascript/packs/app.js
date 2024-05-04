import ReactRailsUJS from "react_ujs";
import { toast } from "react-hot-toast";

import * as Components from "../app/**/*.tsx";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import "../app/flash_messages.js";

window.toast = toast;

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
