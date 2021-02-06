import React, {useEffect} from 'react';
import useStorage from '../hooks/useStorage';
import {motion} from 'framer-motion';
import {useAuth} from '../hooks/AuthContext';

const ProgressBar = ({file, setFile}) => {
    const {currentUser} = useAuth();
    const {url, progress} = useStorage(file, currentUser.handle);
    console.log(progress);
    useEffect(() => {
        if (url){
            setFile(null);
        }
    }, [url, setFile])
    
    return (
        <motion.div 
            className="progress-bar"
            initial={{width: 0}}
            animate={{width: progress + '%'}}
        ></motion.div>
    )
}

export default ProgressBar;