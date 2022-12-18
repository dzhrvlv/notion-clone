export const url = 'http://localhost:5000';

export const AuthorizationHeaderConfig = {
    headers: {
        Authorization: '' + localStorage.getItem('token')
    }
}