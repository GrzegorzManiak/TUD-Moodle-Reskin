export interface SliderParams {
    fn: (value: number, extension: string) => void,
    key: string,
    value: string,
    extension: string,
    monitor_input: HTMLInputElement
    min: number,
    max: number
}

// -- Slider element 
export default (
    paramaters: SliderParams
): HTMLDivElement => {
    // -- Create the element
    const elm = document.createElement("div"),
        input = document.createElement("input"),
        m_input = paramaters.monitor_input;

    // -- Set the attributes
    elm.setAttribute("class", "gm-tud-reskin-option");
    input.setAttribute("type", "range");
    input.setAttribute("step", '0.1');
    input.setAttribute("min", paramaters.min.toString());
    input.setAttribute("max", paramaters.max.toString());
    input.setAttribute("value", paramaters.value);

    m_input.setAttribute("value", 
    `${paramaters.value}${paramaters.extension}`);

    // -- Add the event listeners
    input.addEventListener("input", () => {
        paramaters.fn(Number(input.value), escape(paramaters.extension));
        m_input.setAttribute("value", `${input.value}${paramaters.extension}`);

        // set_local_storage(
        //     paramaters.key, 
        //     input.value, 
        //     paramaters.extension
        // );
    });

    m_input.addEventListener("input", () => {
        paramaters.fn(Number(paramaters.value), paramaters.extension);
        input.setAttribute("value", paramaters.value);

        // set_local_storage(
        //     paramaters.key, 
        //     input.value, 
        //     paramaters.extension
        // );
    });


    // -- Append the elements
    elm.appendChild(input);
    return elm;
}