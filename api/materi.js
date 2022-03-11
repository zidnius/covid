import Firebase from './firebase'

async function tambahMateri(kelas, pelajaran, data, id = Date.now()) {
    try {
        const materi = await Firebase.database().ref(`materi/${kelas}/${pelajaran}/${id}`).set({ ...data })
        return true
    } catch (error) {
        alert(error);
        return false
    }
}

export const hapusMateri = async (id) => {
    try {
        await Firebase.database().ref(`materi/${id}`).remove()
        return true
    } catch (error) {
        return false
    }
}

export const getMateri = async () => {
    try {
        const materiRef = Firebase.database().ref(`materi`)
        const materi = materiRef.on('value', (snapshot) => {
            const data = snapshot.val();
            localStorage.setItem('materi', JSON.stringify(data))
        })
        return materi
    } catch (err) {
        return false
    }
}

export { tambahMateri }
