export function mapDirections(filtered_data, data, triggers, setLocation, setTrigger) {
    return(filtered_data.map((direction, index) => (
        <div key={index} className="flex items-center mt-2">
        <button
        onClick={() => {
            setTrigger({
                ...triggers,
                message: null
            }); // Clears triggerMessages
            if (data.locations[direction].triggers) {
                data.locations[direction].triggers.forEach((trigger) => {
                    if (triggers[trigger].value !== triggers[trigger].triggerValue) {
                        const updatedTrigger = triggers[trigger]
                        updatedTrigger.value = triggers[trigger].triggerValue // Assign new values
                        setTrigger({
                            ...triggers,
                            [trigger]: updatedTrigger,
                            message: triggers[trigger].message
                        }) // Update trigger State
                    }
                })
            }; // Handles Triggers
            setLocation(direction); // Updates Location
        }} // action
        className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
        >
        {data.locations[direction].name}
        </button>
        </div>
        ))
        )
    }