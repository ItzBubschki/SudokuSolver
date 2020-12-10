const fetch = require('node-fetch');

const raw = JSON.stringify({"data": [["6", "", "", "", "", "9", "", "", "1"], ["8", "3", "", "", "", "", "", "4", ""], ["", "", "", "", "", "", "", "2", ""], ["", "", "7", "", "3", "", "", "", ""], ["", "", "", "5", "", "", "", "", "8"], ["2", "", "4", "6", "", "", "7", "", ""], ["4", "", "5", "8", "", "", "", "6", ""], ["", "", "", "9", "2", "4", "", "", ""], ["", "", "", "", "", "", "3", "", ""]]});

const requestOptions = {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: raw,
    redirect: 'follow'
};
for (let i = 0; i < 1000; i++) {
    fetch("http://localhost:6969/solve", requestOptions).then((res) => {
        console.log(`Call number ${i} got status code ${res.status}`);
    }).catch((err) => {
        console.log(`got error while fetching: ${err}`);
    })
}
