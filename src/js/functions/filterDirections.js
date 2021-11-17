export function filterDirections(data, location, triggers) {
    return(
        data.locations[location].directions.filter(
            direction => {
                if (data.locations[direction].requirements){
                    let reqMet = true
                    data.locations[direction].requirements.forEach( (requirement) => {
                        if (!(triggers[requirement].value)) {
                            reqMet = false
                        }
                    })
                    return reqMet
                }
                else {
                    return true
                }
            } // Checkt of de directions aan alle requirements voldoen
            )
            )
        }
