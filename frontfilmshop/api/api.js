import axios from "axios";

let backendAddress = 'http://localhost:3000/api/'

function sendRequest(address, endpoint, method, body, headers) {
    headers['Content-Type'] = 'application/json'
    return axios({
        method: method.toLowerCase(),
        url: address + endpoint,
        headers: headers,
        data: body
    })
}
export default