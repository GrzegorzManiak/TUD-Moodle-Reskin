export default <T>(
    url: string, 
    paramaters: RequestInit = {}, 
    debug = false
): Promise<T | undefined> => {

    // -- Fetch paramaters 
    let fetch_def: RequestInit = Object.assign({
        mode: 'cors',
        cache: 'no-cache',
        method: 'GET'
    }, paramaters);
    
    // -- Commence fetch
    return new Promise(async(resolve: any, reject: any) => {

        // -- Get version from github
        fetch(url, fetch_def)
        .then((res) => res.text())
        .then((content) => {
            // -- Parse JSON
            let json: T = JSON.parse(content);

            // -- Resolve
            resolve(json);
        })
        .catch((e) => {
            if(debug) console.warn(e);

            // -- Reject
            reject(e);
        });
    });
};