
const setLocalStorage = (key, data) => {
    localStorage.setItem(key, data)
}

const getLocalStorage = (key) => {
    return localStorage.getItem(key)
}

const removeLocalStorage = (key) => {
    localStorage.removeItem(key)
}


const setSessionStorage = (key, data) => {
    sessionStorage.setItem(key, data)
}

const getSessionStorage = (key) => {
    return sessionStorage.getItem(key)
}

const removeSessionStorage = (key) => {
    sessionStorage.removeItem(key)
}

export {
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage,
    setSessionStorage,
    getSessionStorage,
    removeSessionStorage
}