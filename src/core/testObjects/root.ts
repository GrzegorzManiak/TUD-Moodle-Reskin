import { VersionObject, RootObject } from "../api/ver";

export const test_object: VersionObject = {
    "cur": "1.1.3",
    "content": {
        "main": "https://raw.githubusercontent.com/GrzegorzManiak/TUD-Moodle-Reskin/main/releases/1.1.3/styles.css",
        "root": "https://raw.githubusercontent.com/GrzegorzManiak/TUD-Moodle-Reskin/main/releases/1.1.3/root.json"
    },
    "ver": [
        "1.1.3",
        "1.1.2"
    ]
}

const test_root: RootObject = {
    "color-main": {
        "type": "color",
        "default": "#191c22",
        "display_name": "Main Color"
    },
    "color-primary": {
        "type": "color",
        "default": "#30475E",
        "display_name": "Primary Color"
    },
    "color-secondary": {
        "type": "color",
        "default": "#252a35",
        "display_name": "Secondary Color"
    },
    "color-tertiary": {
        "type": "color",
        "default": "#1f232b",
        "display_name": "Tertiary Color"
    },
    "color-alert": {
        "type": "color",
        "default": "#f05454",
        "display_name": "Alert Color"
    },
    "color-alert-light": {
        "type": "color",
        "default": "#d46666",
        "display_name": "Alert Light Color"
    },
    "color-info": {
        "type": "color",
        "default": "#3b82f6",
        "display_name": "Info Color"
    },
    "color-info-light": {
        "type": "color",
        "default": "#4b6cb7",
        "display_name": "Info Light Color"
    },
    "color-danger": {
        "type": "color",
        "default": "#f59e0b",
        "display_name": "Danger Color"
    },
    "color-danger-light": {
        "type": "color",
        "default": "#f7a549",
        "display_name": "Danger Light Color"
    },
    "color-success": {
        "type": "color",
        "default": "#10b981",
        "display_name": "Success Color"
    },
    "color-success-light": {
        "type": "color",
        "default": "#059669",
        "display_name": "Success Light Color"
    },
    "font-color-heading": {
        "type": "color",
        "default": "#fff",
        "display_name": "Heading Font Color"
    },
    "font-color-text": {
        "type": "color",
        "default": "#DDDDDD",
        "display_name": "Text Font Color"
    },
    "font-color-link": {
        "type": "color",
        "default": "rgb(218, 241, 255)",
        "display_name": "Link Font Color"
    },
    "font-size-heading": {
        "type": "rem",
        "default": "1.5",
        "display_name": "Heading Font Size"
    },
    "image-radius": {
        "type": "rem",
        "default": "0.5",
        "display_name": "Image Radius"
    },
    "border-radius": {
        "type": "px",
        "default": "10",
        "display_name": "Border Radius"
    },
    "transition": {
        "type": "text",
        "default": "0.2s ease-in-out",
        "display_name": "Transition"
    },
    "btn-padding": {
        "type": "rem",
        "default": "0.5",
        "display_name": "Button Padding"
    }
}

export default test_root;