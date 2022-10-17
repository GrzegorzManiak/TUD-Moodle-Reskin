import { THEMES_KEY } from "../..";
import read from "./read";
import { Themes } from "./types";

export default function remove(identifier: string): Themes.SuccessCriteria {
    // -- Get the theme
    const theme = read(identifier, 'details'),
        root = read(identifier, 'root');

    // -- Check if the theme exists
    if(!theme || !root) return Themes.SuccessCriteria.DoesNotExist;

    // -- Attempt to remove the theme
    try {
        // -- Remove the theme
        localStorage.removeItem(`${THEMES_KEY}_${identifier}`);
        
        // -- Get the theme list
        const list = JSON.parse(localStorage.getItem(THEMES_KEY) || '[]') as Themes.ThemeList;

        // -- Remove the theme from the list
        const newList = list.filter(t => t.identifier !== identifier);

        // -- Save the new list
        localStorage.setItem(THEMES_KEY, JSON.stringify(newList));

        // -- Return success
        return Themes.SuccessCriteria.Removed;
    }

    // -- Catch any errors
    catch(e) {
        // -- Return error
        return Themes.SuccessCriteria.RemovalError;
    }
}