import Grid from '@mui/material/Unstable_Grid2';
import { Routes, Route } from 'react-router-dom';
import { ObjectCard } from '../components';
import React, { useEffect, useState } from 'react';
import { userQuery } from '../utils/data';
import { client } from '../sanity';
import bellBag from '../assets/bell-bag.png';
import SeaCreatures from './SeaCreatures';

const Bugs = () => {
  const [bugs, setBugs] = useState([]);
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

  const fetchBugData = () => {
    fetch(`https://api.nookipedia.com/nh/bugs?api_key=${process.env.REACT_APP_ACNH_API_KEY}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      data.sort(compareByNumber);
      setBugs(data);
      setAllData(data);
    })
  }

  useEffect(() => {
    fetchBugData()
  }, []);

  useEffect(() => {
    if (filter === 'all') {
     setBugs(allData);
    } else if (filter == 'ground') {
      const data = allData.filter(e => (e.location.includes('ground')));
      setBugs(data);
    } else if (filter == 'flying') {
      const data = allData.filter(e => (e.location.includes('Flying')));
      setBugs(data);
    } else if (filter == 'flowers') {
      const data = allData.filter(e => (e.location.includes('flowers') && e.location.includes('On')));
      setBugs(data);
    } else if (filter == 'trees') {
      const data = allData.filter(e => (e.location.includes('trees') && e.location.includes('On')));
      setBugs(data);
    } else if (filter == '10000') {
      const data = allData.filter(e => (e.sell_nook >= 10000));
      setBugs(data);
    }
  }, [filter]);

  return (
    <div className="body">
      <div className="flex flex-wrap gap-2 my-5">
        <button className={filter == 'all' ? 'button-active' : 'button'} onClick={() => setFilter('all')}>All Bugs</button>
        <button className={filter == 'ground' ? 'button-active' : 'button'} onClick={() => setFilter('ground')}>Ground</button>
        <button className={filter == 'flying' ? 'button-active' : 'button'} onClick={() => setFilter('flying')}>Flying</button>
        <button className={filter == 'flowers' ? 'button-active' : 'button'} onClick={() => setFilter('flowers')}>On flowers</button>
        <button className={filter == 'trees' ? 'button-active' : 'button'} onClick={() => setFilter('trees')}>On trees</button>
        <button className={filter == '10000' ? 'button-active flex' : 'button flex'} onClick={() => setFilter('10000')}>10000+ <img className="w-5" src={bellBag} alt="Bell" /></button>
      </div>
      <span className="text-sm">{bugs.length} Results</span>
      {bugs.length > 0 ? (
        <div className="mt-3">
          <Grid container spacing={1}>
              {bugs.map((item) => {
                return (
                  <Grid key={item['name']} xs={6} sm={4} md={2}>
                    <ObjectCard user={user} objName={item['name']} objImage={item['image_url']} objType='bugs'/>
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

export default Bugs
