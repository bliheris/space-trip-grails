import 'whatwg-fetch';

import { SERVER_URL } from '../config'
import headers from '../security/headers';

const get = url => {
    const fullUrl = `${SERVER_URL}/api/${url}`
    console.log('HTTP GET: ' + fullUrl)
    return fetch(fullUrl, {
        method: 'GET',
        headers: headers()
    })
        .then(r => r.json())
        .catch(error => console.error('Error when calling endpoint: ' + fullUrl + ', ' + error));
}

const post = (url, data) => {
    const fullUrl = `${SERVER_URL}/api/${url}`
    console.log('HTTP POST ' + fullUrl + ' data: ' + data)
    return fetch(fullUrl, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(data)
    })
        .then(r => r.json())
        .catch(ex => console.error('Unable to POST', ex));
}

export default {
    get,
    post,
}
