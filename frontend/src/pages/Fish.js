import Grid from '@mui/material/Unstable_Grid2';
import { Routes, Route } from 'react-router-dom';
import { ObjectCard } from '../components';
import React, { useEffect, useState } from 'react';
import { userQuery } from '../utils/data';
import { client } from '../sanity';
import bellBag from '../assets/bell-bag.png';

const Fish = () => {
  const [fish, setFish] = useState([]);
  const [allData, setAllData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [user, setUser] = useState();
  const userId = localStorage.getItem('user');

  const compareByNumber = (a, b) => {
    return a.number - b.number;
  }

  useEffect(() => {
      const query = userQuery(userId);

      client.fetch(query).then((data) => {
          setUser(data[0]);
      });
    }, [userId]);

  const fetchFishData = () => {
    fetch(`https://api.nookipedia.com/nh/fish?api_key=${process.env.REACT_APP_ACNH_API_KEY}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      data.sort(compareByNumber);
      setFish(data);
      setAllData(data);
    })
  }

  useEffect(() => {
    fetchFishData();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
     setFish(allData);
    } else if (filter == 'river') {
      const data = allData.filter(e => (e.location.includes('River')));
      setFish(data);
    } else if (filter == 'pond') {
      const data = allData.filter(e => (e.location.includes('Pond')));
      setFish(data);
    } else if (filter == 'sea') {
      const data = allData.filter(e => (e.location.includes('Sea')));
      setFish(data);
    } else if (filter == 'pier') {
      const data = allData.filter(e => (e.location.includes('Pier')));
      setFish(data);
    } else if (filter == '10000') {
      const data = allData.filter(e => (e.sell_nook >= 10000));
      setFish(data);
    }
  }, [filter]);

  return (
    <div className="body">
      <div className="flex flex-wrap gap-2 my-5">
        <button className={filter == 'all' ? 'button-active' : 'button'} onClick={() => setFilter('all')}>All Fish</button>
        <button className={filter == 'river' ? 'button-active' : 'button'} onClick={() => setFilter('river')}>River</button>
        <button className={filter == 'pond' ? 'button-active' : 'button'} onClick={() => setFilter('pond')}>Pond</button>
        <button className={filter == 'sea' ? 'button-active' : 'button'} onClick={() => setFilter('sea')}>Sea</button>
        <button className={filter == 'pier' ? 'button-active' : 'button'} onClick={() => setFilter('pier')}>Pier</button>
        <button className={filter == '10000' ? 'button-active flex' : 'button flex'} onClick={() => setFilter('10000')}>10000+ <img className="w-5" src={bellBag} alt="Bell" /></button>
      </div>
      <span className="text-sm">{fish.length} Results</span>
      {fish.length > 0 ? (
        <div className="mt-3">
          <Grid container spacing={1}>
              {fish.map((item) => {
                return (
                  <Grid key={item['name']} xs={6} sm={4} md={2}>
                    <ObjectCard user={user} objName={item['name']} objImage={item['image_url']} objType='fish'/>
                  </Grid>
                )
              })}
          </Grid>
        </div>
      ) : (
        <h1>Data pending</h1>
      )}
    </div>
  )
}

export default Fish
