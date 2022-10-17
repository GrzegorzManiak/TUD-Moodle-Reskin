import { Themes } from "./types";
import { THEMES_KEY } from "../..";

export default function read<type>(identifier: string, rt: Themes.ReturnType): type | undefined {
    // -- We have two options here:
    // -- 1. Theme
    // -- 2. Theme identifier

    if(rt === 'details') {
        // -- Get the theme
        const theme = JSON.parse(localStorage.getItem(THEMES_KEY) || '[]').
            find((t: Themes.ThemeIdentifier) => t.identifier === identifier);

        // -- Check if the theme exists
        if(!theme) return undefined;

        // -- Return the theme
        return theme as type;
    }

    if (rt === 'root') {
        // -- Get the theme
        // The theme is stored with a composite key (THEME_KEY_identifier)
        const theme = localStorage.getItem(`${THEMES_KEY}_${identifier}`);

        // -- Check if the theme exists
        if(!theme) return undefined;

        // -- Return the theme
        return JSON.parse(theme) as type;
    }

    // -- Return undefined
    return undefined;
}