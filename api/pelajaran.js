import Firebase from './firebase'

async function tambahPelajaran(data, id = Date.now()) {
    try {
        const pelajaran = await Firebase.database().ref(`pelajaran/${id}`).set({ ...data })
        return true
    } catch (error) {
        alert(error);
        return false
    }
}

export const hapusPelajaran = async (id) => {
    try {
        await Firebase.database().ref(`pelajaran/${id}`).remove()
        return true
    } catch (error) {
        return false
    }
}

export const getPelajaran = async () => {
    try {
        const pelajaranRef = Firebase.database().ref(`pelajaran`)
        const pelajaran = pelajaranRef.on('value', (snapshot) => {
            const data = snapshot.val();
            localStorage.setItem('pelajaran', JSON.stringify(data))
        })
        return pelajaran
    } catch (err) {
        return false
    }
}

export { tambahPelajaran }
