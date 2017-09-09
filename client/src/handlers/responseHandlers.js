import Auth from '../security/auth';


export const checkResponseStatus = (response) => {
    if(response.status >= 200 && response.status < 300) {
        console.log('Response status ok')
        return response.json()
    } else {
        console.log('Response status NOT OK!')
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

export const loginResponseHandler = (response, handler) => {
    Auth.logIn(response);

    if(handler) {
        handler.call();
    }
};