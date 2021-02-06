import {useState, useEffect} from 'react';
import {projectFirestore} from '../firebase/config';

const useFirestore = (collection, userName = false) => {
    const [docs, setDocs] = useState([]);
    const [userLikes, setUserLikes] = useState([]);
    useEffect(() => {
        if (userName){
            projectFirestore.collection(collection)
                .orderBy('createdAt', 'asc')
                .where("handle", "==", userName)
                .onSnapshot((snap) => {
                    let documents = [];
                    snap.forEach((doc) => {
                        documents.push({...doc.data(), id: doc.id})
                    });
                    setDocs(documents);
                })

        } else{
            projectFirestore.collection(collection)
            .orderBy('createdAt', 'asc')
            .onSnapshot((snap) => {
                let documents = [];
                snap.forEach(doc => {
                    documents.push({...doc.data(), id: doc.id})
                });
                setDocs(documents);
            })
        }
        
    }, [userName])

    return {docs, userLikes};
}

export default useFirestore;