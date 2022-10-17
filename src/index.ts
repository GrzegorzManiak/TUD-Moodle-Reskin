import styles, { apply_old } from "./core/styles";
import ver from "./core/api/ver";

export const CSS_KEY = "tud-moodle-reskin-css";
export const ROOT_KEY = "tud-moodle-reskin-root";
export const VER_KEY = "tud-moodle-reskin-ver";
export const OPTIONS_PANEL = "gm-tud-reskin-options";

export const THEMES_KEY = "tud-moodle-reskin-themes";
export const ACTIVE_THEME_KEY = "tud-moodle-reskin-active-theme";

// -- Apply what we got
apply_old();

// -- Get the current version
const version = ver(true);

version.then(async (data) => {
    // -- Pass the data to the css function
    styles(data, true, true);

    // -- log the data
    console.log(data);
});
