export const csvParser = (str) => {
    const lines = str.trim().split('\n');
    const delimiter = ',';

    if (lines.length === 0) return [];

    // get headers
    const headers = lines[0].split(delimiter);
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(delimiter);
        const rowObject = {};

        // if we do not enough data for every header, skip
        if(headers.length !== values.length) {
            continue;
        }

        // otherwise, map the object
        for (let j = 0; j < headers.length; j++) {
            // value is undefined?, skip
            if(!values[j]){
                rowObject = {};
                continue;
            }

            rowObject[headers[j]] = values[j];
        }

        // built object is undefined?, skip
        if(rowObject) data.push(rowObject);
    }
    
    return data;
};