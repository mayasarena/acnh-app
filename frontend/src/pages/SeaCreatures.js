import Grid from '@mui/material/Unstable_Grid2';
import { Routes, Route } from 'react-router-dom';
import { ObjectCard } from '../components';
import React, { useEffect, useState } from 'react';
import { userQuery } from '../utils/data';
import { client } from '../sanity';
import bellBag from '../assets/bell-bag.png';

const SeaCreatures = () => {
  const [seaCreatures, setSeaCreatures] = useState([]);
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

  const fetchSeaCreatureData = () => {
    fetch(`https://api.nookipedia.com/nh/sea?api_key=${process.env.REACT_APP_ACNH_API_KEY}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      data.sort(compareByNumber);
      setSeaCreatures(data);
      setAllData(data);
    })
  }

  useEffect(() => {
    fetchSeaCreatureData();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
     setSeaCreatures(allData);
    } else if (filter == 'crab') {
      const data = allData.filter(e => (e.name.includes('crab')));
      setSeaCreatures(data);
    } else if (filter == 'squid') {
      const data = allData.filter(e => (e.name.includes('squid')));
      setSeaCreatures(data);
     } else if (filter == 'shrimp') {
      const data = allData.filter(e => (e.name.includes('shrimp')));
      setSeaCreatures(data);
     } else if (filter == '10000') {
      const data = allData.filter(e => (e.sell_nook >= 10000));
      setSeaCreatures(data);
    }
  }, [filter]);

  return (
    <div className="body">
      <div className="flex flex-wrap gap-2 my-5">
        <button className={filter == 'all' ? 'button-active' : 'button'} onClick={() => setFilter('all')}>All Sea Creatures</button>
        <button className={filter == 'crab' ? 'button-active' : 'button'} onClick={() => setFilter('crab')}>Crab</button>
        <button className={filter == 'squid' ? 'button-active' : 'button'} onClick={() => setFilter('squid')}>Squid</button>
        <button className={filter == 'shrimp' ? 'button-active' : 'button'} onClick={() => setFilter('shrimp')}>Shrimp</button>
        <button className={filter == '10000' ? 'button-active flex' : 'button flex'} onClick={() => setFilter('10000')}>10000+ <img className="w-5" src={bellBag} alt="Bell" /></button>
      </div>
      <span className="text-sm">{seaCreatures.length} Results</span>
      {seaCreatures.length > 0 ? (
        <div className="mt-3">
          <Grid container spacing={1}>
              {seaCreatures.map((item) => {
                return (
                  <Grid key={item['name']} xs={6} sm={4} md={2}>
                    <ObjectCard user={user} objName={item['name']} objImage={item['image_url']} objType='sea'/>
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

export default SeaCreatures
