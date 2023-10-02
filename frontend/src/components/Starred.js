import React, { useState, useRef, useEffect } from 'react';
import { client } from '../sanity';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

const Starred = ({objectName, objectType, objectImg, alreadyStarred}) => {
    const [isStarred, setIsStarred] = useState(alreadyStarred);

    useEffect(() => {
        setIsStarred(Boolean(alreadyStarred));
    }, [alreadyStarred])

    const starObject = () => {
        const userId = localStorage.getItem('user');

        if (!isStarred) {
            setIsStarred(true);
            try {
                client
                .patch(userId)
                .setIfMissing({starred: []})
                .append('starred', [{
                    _key: objectType.concat(objectName),
                    objType: objectType,
                    objName: objectName,
                    objImg: objectImg
                }])
                .commit()
                .then (() => {
                    console.log(`${objectName} has been starred ${objectType}`)
                })
            }
            catch {
                console.log('please login to star a fish');
                setIsStarred(false);
            }

        }
    }

    const unstarObject = () => {
        const userId = localStorage.getItem('user');
        client
            .patch(userId)
            .unset([`starred[_key=="${objectType.concat(objectName)}"]`])
            .commit()
        console.log('unstarring');
        setIsStarred(false);
    }

    return (
        <div>
            {isStarred ?
            <AiFillStar className="hover:cursor-pointer" onClick={() => unstarObject()} style={{color: '#FDCB4D', fontSize: '20px'}}/>
            : <AiOutlineStar className="hover:cursor-pointer" onClick={() => starObject()} style={{color: '#a3a3a3', fontSize: '20px'}}/>
            }
        </div>
    )
}

export default Starred