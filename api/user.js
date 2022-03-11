import firebase from './firebase'

async function loginUser(username, password) {
    try {
        await firebase.database().ref('/user').orderByChild('username').equalTo(username).on("value", async function (snapshot) {
            const result = snapshot.val() || {}
            await Object.keys(result).forEach(async function (index) {
                if (result[index] && result[index].password === password) {
                    await localStorage.setItem('user', JSON.stringify(result[index]))
                }
            });
            return true
        });
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

async function tambahUser(data, id = Date.now()) {
    try {
        const user = await firebase.database().ref(`user/${id}`).set({ ...data })
        return true
    } catch (error) {
        alert(error);
        return false
    }
}

export const getTipeUser = async () => {
    try {
        const pelajaranRef = firebase.database().ref(`/tipe`)
        const pelajaran = pelajaranRef.on('value', (snapshot) => {
            const data = snapshot.val();
            localStorage.setItem('tipe', JSON.stringify(data))
        })
        return pelajaran
    } catch (err) {
        return false
    }
}

export const getUser = async () => {
    try {
        const pelajaranRef = firebase.database().ref(`/user`)
        const pelajaran = pelajaranRef.on('value', (snapshot) => {
            const data = snapshot.val();
            localStorage.setItem('users', JSON.stringify(data))
        })
        return pelajaran
    } catch (err) {
        return false
    }
}


export { loginUser, tambahUser }
