import React from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { client } from '../sanity';

const Login = () => {
    const navigate = useNavigate();

    const responseGoogle = (response) => {
        const { name, sub, picture } = jwt_decode(response.credential);
        localStorage.setItem('user', sub);
        console.log('user item local storage: ', localStorage.getItem('user'))
        console.log('user info: ', { name, sub, picture });
        const doc = {
            _id: sub,
            _type: 'user',
            userName: name,
            image: picture,
        };
        client.createIfNotExists(doc).then(() => {
            navigate('/', { replace: true });
        });
    };

    const errorGoogle = (error) => {
        console.log(error);
    };

    return (
        <div className="body">
            <div className="flex items-center flex-col">
                <div className="bg-lightgreen p-10 rounded-xl md:w-1/2 w-5/6 mt-8 flex flex-col items-center">
                    <span className="text-lg font-bold text-brown mb-4">Sign in</span>
                    <GoogleLogin 
                        clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                        onSuccess={responseGoogle} 
                        onError={errorGoogle} 
                        cookiePolicy='single_host_origin'
                    />
                </div>
            </div>
        </div>
    )
}

export default Login