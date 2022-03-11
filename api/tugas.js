import Firebase from './firebase'

async function tambahTugas(kelas, pelajaran, data, id = Date.now()) {
    try {
        const tugas = await Firebase.database().ref(`tugas/${kelas}/${pelajaran}/${id}`).set({ ...data })
        return true
    } catch (error) {
        alert(error);
        return false
    }
}

export const hapusTugas = async (id) => {
    try {
        await Firebase.database().ref(`tugas/${id}`).remove()
        return true
    } catch (error) {
        return false
    }
}

export const getTugas = async () => {
    try {
        const tugasRef = Firebase.database().ref(`tugas`)
        const tugas = tugasRef.on('value', (snapshot) => {
            const data = snapshot.val();
            localStorage.setItem('tugas', JSON.stringify(data))
        })
        return tugas
    } catch (err) {
        return false
    }
}

export { tambahTugas }
