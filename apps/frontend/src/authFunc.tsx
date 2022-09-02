import axios from "axios"

export const LOGIN_TOKEN = "auth_token"

export async function loginUser(username: string, password: string) {
    const data = JSON.stringify({
        query: `mutation Login($username: String!, $password: String!){
        login(username: $username, password: $password)
        }`,
        variables: {
            username,
            password
        }
    });

    return axios({
        method: 'post',
        url: process.env['NX_GRAPHQL_URL'],
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    })
}

export function logoutUser() {
    return new Promise((resolve, reject) => {
        removeToken()
        resolve(true)
    })
}

export function setToken(token: string) {
    localStorage.setItem(LOGIN_TOKEN, JSON.stringify(token))
}

export function getToken(): string | null {
    let token = null
    const lsToken =localStorage.getItem(LOGIN_TOKEN)
    if (lsToken) {
        token = JSON.parse(lsToken)
    }
    return token
}

export function removeToken() {
    localStorage.removeItem(LOGIN_TOKEN)
}

export function isAuthenticated(): boolean {
    return getToken() != null
}