import React, {useState} from 'react'
import Title from './Title';
import UploadForm from './UploadForm';
import ImageGrid from './ImageGrid';
import Modal from './Modal';
import {useAuth} from '../hooks/AuthContext';
import {Link} from 'react-router-dom';
import useFirestore from '../hooks/useFirestore';

export default function Home() {

    const {currentUser} = useAuth();
    const [selectedImg, setSelectedImg] = useState(null);
    const {docs} = useFirestore('images');

    return (
        <div>
            <Title/>
            {currentUser && <UploadForm/>}
            {!currentUser && <div className="LorSWrapper"><Link className="LorS" to='/login'>Login</Link> or <Link className="LorS" to='/signup'>signup</Link> to start!</div>}
            <ImageGrid setSelectedImg={setSelectedImg} docs={docs}/>
            {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg}/>}
        </div>
    )
}
