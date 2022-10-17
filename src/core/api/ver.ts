import req from "./req";
import { test_object } from "../testObjects/root";

const VER_URL = "https://raw.githubusercontent.com/GrzegorzManiak/TUD-Moodle-Reskin/main/.ver";

export interface VersionObject {
    cur: string;
    content: {
        main: string;
        root: string;
    };
    ver: Array<string>;
}

export interface Returnable {
    verison_object: VersionObject;
    needs_update: boolean;
    current_version: string;
    latest_version: string;
}

export interface RootObject {
    [key: string]: {
        type: 'color' | 'text' | 'px' | 'rem';
        default: string;
        display_name: string;
        value?: string;
    }
}

export default async(debug = false): Promise<Returnable> => {
    // -- Get our version from storage
    let local_ver: string = localStorage.getItem("tud-moodle-reskin-ver") || "";

    // -- Commence fetch
    const server_ver = debug ? test_object : await req<VersionObject>(VER_URL);

    // -- Verify the version
    if(server_ver === undefined) {
        console.error("TUD-Moodle-Reskin: Failed to fetch version");
        return Promise.reject("Failed to fetch version");
    }

    // -- Check if we need to update
    const local_ver_index = server_ver.ver.indexOf(local_ver),
        server_ver_index = server_ver.ver.indexOf(server_ver.cur);
    
    // -- Check if we need to update
    const needs_update = local_ver_index < server_ver_index;

    // -- Return
    return Promise.resolve({
        verison_object: server_ver,
        needs_update: needs_update,
        current_version: local_ver,
        latest_version: server_ver.cur
    });
};