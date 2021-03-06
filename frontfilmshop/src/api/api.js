import axios from 'axios'

let backendAddress = 'http://localhost:3000/api/'

function sendRequest(address, endpoint, method, body, headers) {
    headers['Content-Type'] = 'application/json'
    return axios({
        method: method.toLowerCase(),
        url: address + endpoint,
        headers: headers,
        data: body,
    })
}

export function getAllFilms() {
    return sendRequest(backendAddress, 'films', 'get', {}, {})
}

export function createFilm(film){
    return sendRequest(backendAddress, 'films', 'post', film, {})
}

export function updateFilm(film, newFIlm){
    return sendRequest(backendAddress, 'films/'+film._id, 'put', newFIlm, {})
}

export function getAllOpinions() {
    return sendRequest(backendAddress, 'opinions', 'get', {}, {})
}

export function createOpinion(opinion) {
    return sendRequest(backendAddress, 'opinions', 'post', opinion, {})
}

export function deleteOpinion(opinionId) {
    return sendRequest(backendAddress, 'opinions/' + opinionId, 'delete', {}, {})
}

export function registerUser(email, password) {
    return sendRequest(
        backendAddress,
        'register',
        'post',
        {email, password},
        {}
    )
}

export function loginUser(email, password) {
    return sendRequest(backendAddress, '/login', 'post', {email, password}, {})
}

export function sendEmail(email, films, totalPrice){
    return sendRequest(
        backendAddress,
        'buy',
        'post',
        {email, films, totalPrice},
        {}
    )
}