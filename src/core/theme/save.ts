import { THEMES_KEY } from "../..";
import { Themes } from "./types";
import read from "./read";
import remove from "./remove";


export default function save(theme: Themes.Theme): Themes.SuccessCriteria {
    // -- Check if the theme is already saved
    const exists = read(theme.details.identifier, 'details');

    // -- If it exists, remove it
    if(exists) {
        // -- Remove the theme
        const res = remove(theme.details.identifier);

        // -- Check if the removal was successful
        if(res !== Themes.SuccessCriteria.Removed) return res;
    }
    

    // -- Save the theme (Root)
    localStorage.setItem(`${THEMES_KEY}_${theme.details.identifier}`, JSON.stringify(theme));

    // -- Get the theme list
    const list = JSON.parse(localStorage.getItem(THEMES_KEY) || '[]') as Themes.ThemeList;

    // -- Add the theme to the list
    const newList = [...list, theme.details];

    // -- Save the new list
    localStorage.setItem(THEMES_KEY, JSON.stringify(newList));
    
    
    // -- Return success
    return Themes.SuccessCriteria.Success;
}