import React, {useState, useEffect} from 'react';
import {projectFirestore} from '../firebase/config';
import {useAuth} from '../hooks/AuthContext';
import {motion} from 'framer-motion';
import Modal from './Modal';
import UploadForm from './UploadForm';
import ImageGrid from './ImageGrid';
import Title from './Title';
import {Link, useHistory} from 'react-router-dom';
import useFirestore from '../hooks/useFirestore';




export default function Profile(location) {
    let pathname = location.location.pathname;
    const userName = pathname.slice(9, );
    const {currentUser} = useAuth();
    const history = useHistory()
    const [selectedImg, setSelectedImg] = useState(null);
    const {docs} = useFirestore('images', userName? userName: false);

    useEffect(() => {   
        if (!currentUser){
            history.push('/login')
        }
    }, location.location.pathname)

    return (
        <div>
            <div className="title">
                <h1>Gallery</h1>
                <h2>{currentUser && userName == currentUser.handle? "Your" : userName} Pictures</h2>
                <p>{currentUser && currentUser.handle == userName && "Upload new pictures easily"}</p>
            </div>
            {currentUser && userName == currentUser.handle && <UploadForm/>}
            <ImageGrid setSelectedImg={setSelectedImg} docs={docs}/>

            {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg}/>}
        </div>
    )
}
