import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import useFirestore from '../hooks/useFirestore';
import {motion} from 'framer-motion';
import MuiLink from '@material-ui/core/Link';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import {useAuth} from '../hooks/AuthContext';
import {projectFirestore} from '../firebase/config';

const ImageGrid = ({setSelectedImg, docs = false}) => {
    const {currentUser} = useAuth();
    const [cards, setCards] = useState();

    async function handleLikeOrUnlike(isLiked, postId){
        
        if (isLiked){
            let likeId;
            let likes;
            await projectFirestore.collection('likes').where('handle', '==', currentUser.handle).where('postId', '==', postId).get()
                .then(data => {
                    data.forEach(doc => {
                        likeId = doc.id;
                    })
                })
            await projectFirestore.doc(`/likes/${likeId}`).delete()
            await projectFirestore.doc(`/images/${postId}`).get()
                .then(data => {
                    likes = data.data().likeCount;
                })
            await projectFirestore.doc(`/images/${postId}`).update({likeCount: likes - 1})
        } else {
            let likes;
            await projectFirestore.collection('likes').add({handle: currentUser.handle, postId: postId})
            await projectFirestore.doc(`/images/${postId}`).get()
                .then(data => {
                    likes = data.data().likeCount;
                })
            await projectFirestore.doc(`/images/${postId}`).update({likeCount: likes + 1})
        }
    }

    async function getUserLikes(){
        let likeIds = [];
        await projectFirestore.collection('likes').where('handle', '==', currentUser? currentUser.handle : '').get()
        .then(data => {
            data.forEach(doc => {
                likeIds.push(doc.data().postId);
            })
        })
        
        return likeIds;
    } 

    async function getCards() {
        const likes = await getUserLikes()
        const cards = <div className="img-grid">
                {docs && docs.map((doc, index) => (
                    <div className="card">
                        <motion.div className="img-wrap" key={doc.id} 
                            layout
                            whileHover={{ opacity: 1 }}
                            onClick={() => setSelectedImg(doc.url)}
                        >
                            <motion.img src={doc.url} alt="uploaded pic"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                            />
                        </motion.div>
                        {!currentUser? (
                            <Link className="likeButton" to="/login">
                                <FavoriteBorder/>
                            </Link>
                        ) : (
                            likes.includes(doc.id)? (
                                <button className="likeButton">
                                    <Favorite fontSize="medium"  onClick={() => {handleLikeOrUnlike(likes.includes(doc.id), doc.id)}}/>
                                </button>
                            ) : (
                                <button className="likeButton">
                                    <FavoriteBorder fontSize="medium" onClick={() => {handleLikeOrUnlike(likes.includes(doc.id), doc.id)}}/>
                                </button>
                            )
                        )}
                        <div className="likeCount">{doc.likeCount}</div>
                        <MuiLink underline="none" className="userLink" component={Link} to={`/profile/${doc.handle}`}>{doc.handle}</MuiLink>
                        
                    </div>
                )
                )}
            </div>
        setCards(cards);
    }

    useEffect(getCards, [docs]);




    return (
        <div>
            {cards}
        </div>
    )
}

export default ImageGrid;