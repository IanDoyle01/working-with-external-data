const baseUrl = "https://swapi.co/api/";

function getData(type, cb) {
    var xhr = new XMLHttpRequest(); //built in JS obj to handle api calls

    xhr.open("GET", baseUrl + type + "/"); //request type and data
    xhr.send(); // sends the request
    
    //waits till data is fetched (4) and ok (200)
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

function getTableHeaders(obj) {
    var tableHeaders = [];
    
    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });
    
    return `<tr>${tableHeaders}</tr>`;
}

function writeToDocument(type) {
    var tableRows = [];
    var el = document.getElementById("data");
    el.innerHTML = ""; //creates a blank element everytime function called
    getData(type, function(data) {
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);
        
        data.forEach(function(item) {
            var dataRow = [];
            Object.keys(item).forEach(function(key) {
                dataRow.push(`<td>${item[key]}</td>`);
            });
            tableRows.push(dataRow);
        });
        
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;
    });
}