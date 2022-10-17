import { THEMES_KEY, ACTIVE_THEME_KEY } from "../..";
import { RootObject } from "../api/ver";
import read from "../theme/read";
import { Themes } from "../theme/types";
import { gen_def_theme, get_active_theme } from "./theme";


const pop_up = `
    <style>
        body {
            overflow: hidden;
        }

        .gm-tud-reskin-greyout {
            position: absolute;

            top: 0;
            left: 0;

            width: 100vw;
            height: 100vh;

            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;

            display: flex;
            justify-content: center;
            align-items: center;
        }

        .gm-tud-reskin-popup {
            position: relative;
            background-color: white;
            border-radius: 10px;
            padding: 10px;
            z-index: 1001;

            max-width: 500px;
            width: 30%;
        }
    </style>
    <div class='gm-tud-reskin-greyout'>
        <div class='gm-tud-reskin-popup'>
            <h1 class='gm-tud-reskin-popup-header'> 
                You have current unsaved changes, would you like to continue?
            </h1>

            <div>
                <button id='gm-tud-reskin-popup-yes'> Yes </button>
                <button id='gm-tud-reskin-popup-no'> No </button>
            </div>
        </div>
    </div>
`;

function dropdown(
    themes: Themes.ThemeList,
    input_elm: HTMLInputElement,
    main_elm: HTMLElement
): {
    changed: () => void;
    themes_elm: HTMLSelectElement;
} {
    // -- Keep track of the changes
    let made_changes = false;
    const changed = () => { made_changes = true; };

    // -- Themes dropdown
    const themes_elm = document.createElement("select");
        
    themes_elm.setAttribute("class", "themes");

    // -- Change theme function
    const change_theme = (theme: string) => {
        // -- Attempt to find the theme
        const found_theme = read<Themes.Theme>(theme, "root");

        const active_theme_key = localStorage.getItem(ACTIVE_THEME_KEY),
            active_theme = read<Themes.ThemeIdentifier>(active_theme_key, "details");

        // -- Check if the theme exists
        if (!found_theme) return;

        function update() {
            // -- Update localStorage
            localStorage.setItem(ACTIVE_THEME_KEY, theme);

            // TODO: Update the css root variables
        }

        // -- Check if the user made changes
        if (made_changes) {
            // -- Create the popup
            const popup = document.createElement("div");
            popup.innerHTML = pop_up;

            // -- Append the popup
            main_elm.appendChild(popup);

            // -- Get the buttons
            const yes = popup.querySelector("#gm-tud-reskin-popup-yes"),
                no = popup.querySelector("#gm-tud-reskin-popup-no");

            // -- Add the event listeners
            yes.addEventListener("click", () => {
                update();
                popup.remove();
                themes_elm.value = found_theme.details.identifier;
                input_elm.value = found_theme.details.name;
            });

            no.addEventListener("click", () => {
                popup.remove();
                themes_elm.value = active_theme.identifier;
                input_elm.value = active_theme.name;
            });
        }

        else {
            update();
            themes_elm.value = found_theme.details.identifier;
            input_elm.value = found_theme.details.name;
        }
    };

    themes_elm.addEventListener("change", () => 
        change_theme(themes_elm.value));

    // -- Add the themes to the dropdown
    themes.forEach((theme: Themes.ThemeIdentifier) => {
        const elm = document.createElement("option");
        elm.setAttribute("value", theme.identifier);
        elm.innerText = theme.name;
        themes_elm.appendChild(elm);
    });


    // -- Return the changed function
    return { 
        changed,
        themes_elm
    };
}



export function theme_section(
    main_elm: HTMLElement,
    root: RootObject
): {
    changed: () => void;
} {
    // -- STATE MANAGER -- //
    let themes = JSON.parse(localStorage.getItem(THEMES_KEY) || "[]") as Themes.ThemeList,
        active_theme = get_active_theme(root);

    let cur_theme = active_theme.details.identifier;

    // -- Save current theme function
    const save = (input_elm: HTMLInputElement) => {
        // -- Get the current name 
        const name = input_elm.value;


    };
        
    const delete_active = () => {
        
    };

    // -- Theme elements
    const themes_parent = document.createElement("div");
    themes_parent.setAttribute("class", "themes");
    main_elm.appendChild(themes_parent);

    // -- Save theme button
    const save_theme = document.createElement("button");
    save_theme.setAttribute("class", "save-theme");
    save_theme.innerText = "Save Theme";
    themes_parent.appendChild(save_theme);

    // -- Remove theme button
    const remove_theme = document.createElement("button");
    remove_theme.setAttribute("class", "remove-theme");
    remove_theme.innerText = "Remove Theme";
    themes_parent.appendChild(remove_theme);

    // -- New theme button
    const new_theme = document.createElement("button");
    new_theme.setAttribute("class", "new-theme");
    new_theme.innerText = "New Theme";
    themes_parent.appendChild(new_theme);

    // -- Reset theme button
    const reset_theme = document.createElement("button");
    reset_theme.setAttribute("class", "reset-theme");
    reset_theme.innerText = "Reset Theme";
    themes_parent.appendChild(reset_theme);

    // -- Theme name input
    const theme_name = document.createElement("input");
    theme_name.setAttribute("class", "theme-name");
    theme_name.setAttribute("placeholder", "Theme Name");
    themes_parent.appendChild(theme_name);
    theme_name.addEventListener("input", () => {
        changed();
        cur_theme = theme_name.value;
    });

    const {
        changed,
        themes_elm
    } = dropdown(themes, theme_name, main_elm);

    // -- Set the theme name input
    theme_name.value = active_theme.details.name;
    themes_elm.value = active_theme.details.identifier;
    themes_parent.appendChild(themes_elm);

    // -- Return hooks
    return {
        changed
    };
}


export function options_section(
    main_elm: HTMLElement,
): {
    colors: HTMLElement;
    inputs: HTMLElement;
} {
    // -- colors elements
    const colors = document.createElement("div");
    colors.setAttribute("class", "colors");
    main_elm.appendChild(colors);

    // -- Input elements
    const inputs = document.createElement("div");
    inputs.setAttribute("class", "inputs");
    main_elm.appendChild(inputs);

    
    // -- Return the elements
    return {
        colors,
        inputs,
    };
}
