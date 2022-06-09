const substationLogger = require('../loggers/substationLogger')

const substationsHandler = (substations) => {
    console.log(substations)
    for (let i = 0; i < substations.length; i += 1) {
        console.log(substations[i])
        setInterval(substationLogger, 3000, substations[i])
    }

    
}


module.exports = substationsHandler;