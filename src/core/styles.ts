import { RootObject, Returnable } from "./api/ver";
import { CSS_KEY, ROOT_KEY, VER_KEY } from "../index";  
import { apply_css } from "../modifers/core";

import test_root from "./testObjects/root";
import test_css from "./testObjects/css";

import process_root from "./panel";
import req from "./api/req";

export default (data: Returnable, force = false, debug = false): Promise<void> => {
    // -- Check if we need to update
    if(
        !data.needs_update && 
        localStorage.getItem(CSS_KEY) &&
        localStorage.getItem(ROOT_KEY) &&
        force === false
    ) return Promise.resolve();
    
    // -- Get the CSS and ROOT
    const CSS = debug ? test_css : req<string>(data.verison_object.content.main, {}),
        ROOT = debug ? test_root : req<RootObject>(data.verison_object.content.root, {});

    // -- Set both to local storage
    Promise.all([CSS, ROOT]).then((values) => {
        // -- Set the CSS and root
        localStorage.setItem(CSS_KEY, values[0]);
        localStorage.setItem(ROOT_KEY, JSON.stringify(values[1]));

        // -- Apply Root and the CSS
        apply_css(values[0]);
        process_root(values[1]);

        // -- Set the version
        localStorage.setItem(VER_KEY, data.latest_version);
    });
}


// Will apply the locally stored CSS
export const apply_old = (): void => {
    // -- Get the CSS
    const css = localStorage.getItem(CSS_KEY),
        root = localStorage.getItem(ROOT_KEY) as unknown as string;

    // -- If we have it, apply it
    if(css && Object.keys(css).length > 0) {
        apply_css(css);
        process_root(JSON.parse(root));
    }
}