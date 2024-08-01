import axios from 'axios'

export const keysList = async () => {
    const { data } = await axios.get(import.meta.env.VITE_API_HOST + '/list/keys', {
        headers: {
            'X-Auth-Key': import.meta.env.VITE_API_AUTH,
            'Content-Type': 'application/json'
        },
    })

    return data;
}

export const getKey = async (keyname) => {
    const { data } = await axios.get(import.meta.env.VITE_API_HOST + '/view/' + keyname, {
        headers: {
            'X-Auth-Key': import.meta.env.VITE_API_AUTH,
            'Content-Type': 'application/json'
        },
    })

    return data;
}

export const updateKey = async (
    keyname,
    value
) => {
    const { data } = await axios.post(import.meta.env.VITE_API_HOST + '/create', {
        url: value,
        key: keyname
    }, {
        headers: {
            'X-Auth-Key': import.meta.env.VITE_API_AUTH,
            'Content-Type': 'application/json'
        },
    })

    return data;
}

export const deleteKey = async (keyname) => {
    const { data } = await axios.delete(import.meta.env.VITE_API_HOST + '/' + keyname, {
        headers: {
            'X-Auth-Key': import.meta.env.VITE_API_AUTH,
            'Content-Type': 'application/json'
        },
    })

    return data;
}

export const fetchStats = async () => {
    const { data } = await axios.get(import.meta.env.VITE_API_HOST + '/stats', {
        headers: {
            'Content-Type': 'application/json'
        },
    })

    return data;
}