import { get_active_theme, map_theme } from "./theme";
import { OPTIONS_PANEL, THEMES_KEY } from "../..";
import { RootObject } from "../api/ver";

import slider from "./inputs/slider";
import { Themes } from "../theme/types";
import { options_section, theme_section } from "./html";


// -- Process the Root object
export default (data: RootObject, debug = false): void => {
    // -- Get the main elm 
    const main = document.getElementById(OPTIONS_PANEL);

    // -- If we dont have it, return
    if(!main) return 
        console.error("TUD-Moodle-Reskin: Failed to find the main element");

    // -- Clear the main element
    main.innerHTML = "";
    

    // -- Options elements
    const { colors, inputs } = options_section(main);

    // -- Theme elements
    const { changed } = theme_section(main, data);


    // -- Get the active theme
    const theme = map_theme(get_active_theme(data), data);

    // -- Loop through the object
    for(const key in theme) {
        // -- Get the value
        const value = theme[key];


        // -- Create the element
        const elm = document.createElement("div"),
            label = document.createElement("label"),
            input = document.createElement("input");


        // -- Set the attributes
        elm.setAttribute("class", "gm-tud-reskin-option");
        label.setAttribute("for", key);
        label.innerText = escape(value.display_name);
        input.setAttribute("type", "text");
        input.setAttribute("id", key);
        input.setAttribute("value", escape(value.value));


        // -- Attempt to get the local storage
        const local_storage = get_local_storage(key);

        // -- If not there, set default
        if(local_storage.value === "")
            set_local_storage(key, value.default, value.type);
            

        // -- Append the elements
        elm.appendChild(label);
        elm.appendChild(input);

        
        switch(value.type) {
            case "color":
                input.setAttribute("type", "color");
                colors.appendChild(elm);
                break;

            case "text":
                input.setAttribute("type", "text");
                inputs.appendChild(elm);
                break;

            case "px":
                // -- Create the slider and
                // append it as the last child
                elm.appendChild(slider({
                    fn: (value, extension) => {
                        set_root(key, `${value}${extension}`);
                        changed();
                    },
                    value: get_local_storage(key).value, key: key,
                    extension: "px", monitor_input: input, min: 0,
                    max: Number(value.default) * 2
                }));

                // -- append main 
                inputs.appendChild(elm);
            break;
            
            case "rem":
                // -- Create the slider and
                // append it as the last child
                elm.appendChild(slider({
                    fn: (value, extension) => {
                        set_root(key, `${value}${extension}`);
                        changed();
                    },
                    value: get_local_storage(key).value, key: key,
                    extension: "rem", monitor_input: input, min: 0,
                    max: Number(value.default) * 2
                }));

                // -- append main
                inputs.appendChild(elm);
            break;
        }
    }
}


const set_local_storage = (key: string, value: string, extension: string): void => {
    localStorage.setItem(key, value);
    localStorage.setItem(`${key}_extension`, extension);
}
const get_local_storage = (key: string): {
    value: string,
    extension: string
} => {
    return {
        value: localStorage.getItem(key) || "",
        extension: localStorage.getItem(`${key}_extension`) || ""
    }
}



// -- We dont like xss
const escape = (str: string): string => {
    //  < >
    str = str.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // replace script with an invisible space verison
    str = str.replace(/script/g, "scr\u200Bipt");

    // -- Return
    return str;
}

// -- Set css root value
function set_root(key: string, value: string): void {
    // -- Set the value
    document.documentElement.style.setProperty(key, value);
}
