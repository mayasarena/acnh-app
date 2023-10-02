import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import bell from '../assets/bell.png';
import  { Starred } from '../components';
import { userQuery } from '../utils/data';
import { client } from '../sanity';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const FishDetails = () => {
  const { fishName } = useParams();
  const [fish, setFish] = useState([]);
  const [user, setUser] = useState();
  const userId = localStorage.getItem('user');

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  const fetchFishData = () => {
    fetch(`https://api.nookipedia.com/nh/fish/${fishName}?api_key=${process.env.REACT_APP_ACNH_API_KEY}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      setFish(data);
    })
  }

  useEffect(() => {
    fetchFishData()
  }, [])

  let availabilityArrayN = null;
  let availabilityArrayS = null;

  try {
    availabilityArrayN = fish['north']['availability_array'];
    availabilityArrayS = fish['south']['availability_array'];
  } catch {
    console.log("error fetching availability arrays")
  }

  let catchphrases = null;

  try {
    catchphrases = fish['catchphrases'];
  } catch {
    console.log("error fetching catchphrases")
  }

  const navigate = useNavigate();
  const goBack = () => { navigate(-1); }

  return (
    <div className="body">

      <div className="flex gap-5 items-center justify-between m-auto p-4 md:w-5/6 lg:w-1/2 font-bold text-xl">
        <button onClick={() => goBack()} className="bg-green hover:bg-darkgreen drop-shadow-btn py-1 px-2 rounded-md text-sm flex items-center gap-2 font-normal"><BiArrowBack /> Back</button>
        <span className="grow">{fish['name']}</span>
        <Starred objectName={fish['name']} objectType='fish' objectImg={fish['image_url']} alreadyStarred={user?.starred?.find(e => (e.objName === fish['name']) && (e.objType === 'fish'))}/>
      </div>

      <div className="flex flex-col m-auto text-center bg-darkcream rounded-lg p-4 md:w-5/6 lg:w-1/2">
        <div className="bg-lightcream m-auto rounded-md p-8 mb-3">
          <img className="max-w-24 max-h-24" src={fish['render_url']} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="bg-lightcream rounded p-1 px-3 text-left">
            <span className="flex gap-2"><b>Category:</b> Fish</span>
          </div>
          <div className="flex bg-lightcream rounded p-1 px-3 text-left">
            <div className="grow basis-1">
            <span className="flex flex-row gap-2"><b>Sell (Nook):</b> {fish['sell_nook']} <img className="w-6" src={bell} alt="Bell" /></span>
            </div>
            <div className="grow basis-1">
            <span className="flex flex-row gap-2"><b>Sell (C.J.):</b> {fish['sell_cj']} <img className="w-6" src={bell} alt="Bell" /></span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 bg-lightcream rounded p-1 px-3 text-left">
            <span className="flex gap-2"><b>Spawn Location: </b> {fish['location']}</span>
            <div className="flex">
              {availabilityArrayN && (
                <div className="grow basis-1">
                <span className="flex flex-col"><b>Availability (North): </b> {availabilityArrayN.map((item, index) => <span key={index}>{item.months}, {item.time} </span>)}</span>
                </div>
              )}
              {availabilityArrayS && (
                <div className="grow basis-1">
                <span className="flex flex-col"><b>Availability (South): </b> {availabilityArrayS.map((item, index) => <span key={index}>{item.months}, {item.time} </span>)}</span>
                </div>
              )}
            </div>
          </div>
          <div className="bg-lightcream rounded p-1 px-3 text-left">
            {catchphrases && (
              <span className="flex flex-col"><b>Catchphrases:</b> {catchphrases.map((item, index) => <span key={index}>"{item}"</span>)}</span>
            )}
          </div>
        </div>
      </div>
    </div>

  )
}

export default FishDetails