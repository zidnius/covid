import Firebase from './firebase'

async function tambahPengajar(data, id = Date.now()) {
    try {
        const pengajar = await Firebase.database().ref(`pengajar/${id}`).set({ ...data })
        return true
    } catch (error) {
        alert(error);
        return false
    }
}

export const hapusPengajar = async (id) => {
    try {
        await Firebase.database().ref(`pengajar/${id}`).remove()
        return true
    } catch (error) {
        return false
    }
}

export const getPengajar = async () => {
    try {
        const pengajarRef = Firebase.database().ref(`pengajar`)
        const pengajar = pengajarRef.on('value', (snapshot) => {
            const data = snapshot.val();
            localStorage.setItem('pengajar', JSON.stringify(data))
        })
        return pengajar
    } catch (err) {
        return false
    }
}

export { tambahPengajar }
