import React, { useState, useRef, useEffect } from 'react';
import { userQuery } from '../utils/data';
import { client } from '../sanity';
import { NavLink, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { PiButterflyFill } from 'react-icons/pi';
import { FaFish, FaOctopusDeploy } from 'react-icons/fa';
import { BsFillPersonFill, BsHouseDoorFill } from 'react-icons/bs';
import { BiLogOutCircle, BiSolidHomeAlt2 } from 'react-icons/bi';
import { GiRoundStar, GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { Search } from '../components';

const Navbar = () => {
  const [user, setUser] = useState();
  const userId = localStorage.getItem('user');
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      const query = userQuery(userId);

      client.fetch(query).then((data) => {
          setUser(data[0]);
      });
    }, [userId]);

    const handleNavExpand = () => {
      setIsNavExpanded(!isNavExpanded);
    }

    const logout = () => {
      setIsNavExpanded(false);
      googleLogout();
      localStorage.clear();
      navigate('/', { replace: true });
      console.log('logged out');
    }

  return (
    <nav className="z-10 h-16 w-screen fixed m-auto bg-lightblue opacity-95 flex items-center justify-between px-8 text-lg text-brown">
      <div className="flex gap-2">
        <div className="mr-5" onClick={() => handleNavExpand()}>
          {isNavExpanded ? <AiOutlineClose size={24} /> : <GiHamburgerMenu size={24}/>}
        </div>
        <div className={isNavExpanded ? 'showNav top-16 bg-lightblue' : 'hideNav'}>
          <NavLink className={({ isActive }) => (isActive ? "p-2 bg-blue flex gap-3 items-center" : "p-2 bg-lightblue flex gap-3 items-center hover:bg-blue")} to="/" onClick={() => setIsNavExpanded(false)}><BiSolidHomeAlt2 size={18} /> Home</NavLink>
          <NavLink className={({ isActive }) => (isActive ? "p-2 bg-blue flex gap-3 items-center" : "p-2 bg-lightblue flex gap-3 items-center hover:bg-blue")} to="/fish" onClick={() => setIsNavExpanded(false)}><FaFish size={18} /> Fish</NavLink>
          <NavLink className={({ isActive }) => (isActive ? "p-2 bg-blue flex gap-3 items-center" : "p-2 bg-lightblue flex gap-3 items-center hover:bg-blue")} to="/bugs" onClick={() => setIsNavExpanded(false)}><PiButterflyFill size={18}/> Bugs</NavLink>
          <NavLink className={({ isActive }) => (isActive ? "p-2 bg-blue flex gap-3 items-center" : "p-2 bg-lightblue flex gap-3 items-center hover:bg-blue")} to="/sea" onClick={() => setIsNavExpanded(false)}><FaOctopusDeploy size={18}/> Sea Creatures</NavLink>
          <NavLink className={({ isActive }) => (isActive ? "p-2 bg-blue flex gap-3 items-center" : "p-2 bg-lightblue flex gap-3 items-center hover:bg-blue")} to="/villagers" onClick={() => setIsNavExpanded(false)}><BsHouseDoorFill size={18} /> Villagers</NavLink>
          <div className="h-px bg-brown"></div>
          <div className={user == null ? "hidden" : "block"}>
          <NavLink className={({ isActive }) => (isActive ? "p-2 bg-blue flex gap-3 items-center" : "p-2 bg-lightblue flex gap-3 items-center hover:bg-blue")} to={`/profile/${userId}`} onClick={() => setIsNavExpanded(false)}><GiRoundStar size={18} /> Starred Items</NavLink>
          <div className="p-2 bg-lightblue flex gap-3 items-center hover:bg-blue hover:cursor-pointer" onClick={logout}><BiLogOutCircle size={18} /> Logout</div>
          </div>
          <div className={user == null ? "block" : "hidden"}>
          <NavLink className={({ isActive }) => (isActive ? "p-2 bg-blue flex gap-3 items-center" : "p-2 bg-lightblue flex gap-3 items-center hover:bg-blue")} to={`/login`} onClick={() => setIsNavExpanded(false)}><BsFillPersonFill size={18} /> Sign in</NavLink>
          </div>
        </div>
        <div className="hidden md:block">
          <a href="/">Nook's Spot</a>
        </div>
      </div>
      <div className="w-1/2 mx-4">
        <Search />
      </div>
      <div>
        <span className={user == null ? "block" : "hidden"}>
          <a href="/login">Sign in</a><br />
        </span>
        <span className={user == null ? "hidden" : "block"}>
          Welcome, <a className="underline" href={`/profile/${userId}`}>{user?.userName}</a>
        </span>
      </div>
    </nav>
  )
}

export default Navbar;