import {useState, useEffect} from 'react';
import {projectStorage, projectFirestore, timestamp} from '../firebase/config';

const useStorage = (file, userHandle) => {
    const [progress, setPropgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const storageRef = projectStorage.ref(file.name);
        const collectionRef = projectFirestore.collection('images');

        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setPropgress(percentage);
        }, 
        (err) => {
            setError(err);
        },
        async () => {
            const url = await storageRef.getDownloadURL();
            const createdAt = timestamp();
            collectionRef.add({url: url, createdAt, handle: userHandle, likeCount: 0, commentCount: 0});
            setUrl(url);
        })
    }, [file])

    return {progress, url, error};
} 

export default useStorage;