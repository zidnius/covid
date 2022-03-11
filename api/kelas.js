import Firebase from './firebase'

async function tambahKelas(data, id = Date.now()) {
    try {
        await Firebase.database().ref(`kelas/${id}`).set({ ...data })
        return true
    } catch (error) {
        alert(error);
        return false
    }
}

export const hapusKelas = async (id) => {
    try {
        await Firebase.database().ref(`kelas/${id}`).remove()
        return true
    } catch (error) {
        return false
    }
}

export const getKelas = async () => {
    try {
        const kelasRef = Firebase.database().ref(`kelas`)
        const kelas = kelasRef.on('value', (snapshot) => {
            const data = snapshot.val();
            localStorage.setItem('kelas', JSON.stringify(data))
        })
        return kelas
    } catch (err) {
        return false
    }
}

export { tambahKelas }
