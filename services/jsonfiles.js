const path = require("path");
const fs = require("fs");

const readJSONfile = (filename) => {
    return new Promise ((resolve, reject) => {
        fs.readFile(path.join(filename), null, async (err, data) => {
            if (err) {
                console.log("Error en lectura de datos JSON ", err.message);
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    })
};

const addToJSONfile = (filename, dato) => {
    let  datos = [];
    readJSONfile(filename)
    .then( (data) => {
        datos = data[Object.keys(data)[0]];
        datos.push(dato);
        return JSON.stringify(data);
    })
    .then( (JSONData) => {
        fs.writeFile(filename, JSONData, (error) => {
            if (error) {
                throw error
            }
        })
    })
    .catch ( (err) => {
        console.log("Error en agregar a archivo, ", err.message);
    })
};

const clearJSONfile = (filename) => {
    let  datos = [];
    readJSONfile(filename)
    .then( (data) => {
        data[Object.keys(data)[0]] = [];
        return JSON.stringify(data);
    })
    .then( (JSONData) => {
        console.log("JS", JSONData);
        fs.writeFile(filename, JSONData, (error) => {
            if (error) {
                throw error
            }
        })
    })
    .catch ( (err) => {
        console.log("Error en escribir archivo, ", err.message);
    })
};


module.exports = {
    readJSONfile,
    addToJSONfile,
    clearJSONfile
}