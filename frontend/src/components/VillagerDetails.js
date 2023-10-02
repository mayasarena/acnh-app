import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import bell from '../assets/bell.png';
import  { Starred } from '../components';
import { userQuery } from '../utils/data';
import { client } from '../sanity';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const VillagerDetails = () => {
  const { villagerName } = useParams();
  const [villager, setVillager] = useState([]);
  const [user, setUser] = useState();
  const userId = localStorage.getItem('user');

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  const fetchVillagerData = () => {
    fetch(`https://api.nookipedia.com/villagers?game=nh&name=${villagerName}&api_key=${process.env.REACT_APP_ACNH_API_KEY}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      setVillager(data[0]);
    })
  }

  useEffect(() => {
    fetchVillagerData();
  }, [])

  const navigate = useNavigate();
  const goBack = () => { navigate(-1); }

  return (
    <div className="body">
    {villager && (
    <div>
      <div className="flex gap-5 items-center justify-between m-auto p-4 md:w-5/6 lg:w-1/2 font-bold text-xl">
        <button onClick={() => goBack()} className="bg-green hover:bg-darkgreen drop-shadow-btn py-1 px-2 rounded-md text-sm flex items-center gap-2 font-normal"><BiArrowBack /> Back</button>
        <span className="grow">{villager['name']}</span>
        <Starred objectName={villager['name']} objectType='villagers' objectImg={villager['image_url']} alreadyStarred={user?.starred?.find(e => (e.objName === villager['name']) && (e.objType === 'villagers'))}/>
      </div>

      <div className="flex flex-col m-auto text-center bg-darkcream rounded-lg p-4 md:w-5/6 lg:w-1/2">
        <div className="bg-lightcream m-auto rounded-md p-8 mb-3">
          <img className="max-w-24 max-h-24" src={villager['image_url']} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="bg-lightcream rounded p-1 px-3 text-left">
            <span className="flex gap-2"><b>Category:</b> Villager</span>
          </div>
          <div className="bg-lightcream rounded p-1 px-3 text-left">
            <span className="flex gap-2"><b>Gender:</b> {villager['gender']}</span>
          </div>
          <div className="bg-lightcream rounded p-1 px-3 text-left">
            <span className="flex gap-2"><b>Species:</b> {villager['species']}</span>
          </div>
          <div className="bg-lightcream rounded p-1 px-3 text-left">
            <span className="flex gap-2"><b>Personality:</b> {villager['personality']}</span>
          </div>
          <div className="bg-lightcream rounded p-1 px-3 text-left">
            <span className="flex gap-2"><b>Birthday:</b> {villager['birthday_month']} {villager['birthday_day']}</span>
          </div>
          <div className="bg-lightcream rounded p-1 px-3 text-left">
            <span className="flex gap-2"><b>Catchphrase:</b> "{villager['phrase']}"</span>
          </div>
        </div>
      </div>
    </div>
    )}
    </div>
  )
}

export default VillagerDetails