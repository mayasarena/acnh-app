import React, { useState, useRef, useEffect } from 'react';
import { Search } from '../components';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const navigateTo = (location) => {
        navigate(location, { replace: true });
    }

    return (
        <div className="body">
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center text-brown text-lg mt-6 mb-6 text-center ml-4 mr-4">
                    <b>Welcome to Nook's Spot!</b>
                    A spot where you can explore fish, bugs, sea creatures, and villagers from Animal Crossing: New Horizons.
                </div>
                <div onClick={() => navigateTo('/fish')} className="flex gap-4 items-center bg-lightgreen w-1/2 lg:w-1/4 p-8 rounded-lg hover:bg-green">
                    See Fish
                    <AiOutlineArrowRight size={18} />
                </div>
                <div onClick={() => navigateTo('/bugs')} className="flex gap-4 items-center bg-lightgreen w-1/2 lg:w-1/4 p-8 mt-4 rounded-lg hover:bg-green">
                    See Bugs
                    <AiOutlineArrowRight size={18} />
                </div>
                <div onClick={() => navigateTo('/sea')} className="flex gap-4 items-center bg-lightgreen w-1/2 lg:w-1/4 p-8 mt-4 rounded-lg hover:bg-green">
                    See Sea Creatures
                    <AiOutlineArrowRight size={18} />
                </div>
                <div onClick={() => navigateTo('/villagers')} className="flex gap-4 items-center bg-lightgreen w-1/2 lg:w-1/4 p-8 mt-4 rounded-lg hover:bg-green">
                    See Villagers
                    <AiOutlineArrowRight size={18} />
                </div>
            </div>
        </div>
    )
}

export default Home