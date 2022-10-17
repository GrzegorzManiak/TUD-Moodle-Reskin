import { ACTIVE_THEME_KEY } from "../..";
import { RootObject } from "../api/ver";
import { Themes } from "../theme/types";

import read from "../theme/read";
import save from "../theme/save";

export function gen_def_theme(
    rootObject: RootObject, 
    name = 'Default',
    identifier = 'default'
): Themes.Theme {
    // -- Create the base of the theme
    let theme: Themes.Theme = {
        details: {
            name, identifier
        },
        root: {}
    };

    
    // -- Loop through the root object
    for(const key in rootObject) {
        // -- Get the value
        const value = rootObject[key];

        // -- Set the value
        theme.root[key] = value.default;
    }

    // -- Set the default theme id
    localStorage.setItem(ACTIVE_THEME_KEY, theme.details.identifier);

    // -- Save the theme
    save(theme);

    // -- Return
    return theme;
}


export function get_active_theme(data: RootObject): Themes.Theme {
    // -- Get the active theme
    const active_theme_id = 
        localStorage.getItem(ACTIVE_THEME_KEY) || 
        gen_def_theme(data).details.identifier;

    // -- Validate the active theme
    let theme = read<Themes.Theme>(active_theme_id, 'root');

    // -- Check if the theme exists, if not, generate a new one
    if(!theme) theme = gen_def_theme(data);


    // -- Return
    return theme;
}


export function map_theme(theme: Themes.Theme, data: RootObject): RootObject {
    // -- Loop through the root object
    for(const key in data) {
        // -- Get the value
        const value = data[key];

        // -- Set the value
        data[key].value = theme.root[key];
    }

    // -- Return
    return data;
}