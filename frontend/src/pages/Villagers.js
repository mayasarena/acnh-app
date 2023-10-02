import Grid from '@mui/material/Unstable_Grid2';
import { Routes, Route } from 'react-router-dom';
import { ObjectCard } from '../components';
import React, { useEffect, useState } from 'react';
import { userQuery } from '../utils/data';
import { client } from '../sanity';

const Villagers = () => {
  const [villagers, setVillagers] = useState([]);
  const [user, setUser] = useState();
  const [filter, setFilter] = useState('all');
  const userId = localStorage.getItem('user');

  const personalityList = [
    'big sister', 'cranky', 'jock', 'lazy', 'normal', 'peppy', 'sisterly', 'smug', 'snooty'
  ]

  const speciesList = [
    'alligator', 'anteater', 'bear', 'bear cub', 'bird', 'bull', 'cat', 'cub', 'chicken',
    'cow', 'deer', 'dog', 'duck', 'eagle', 'elephant', 'frog', 'goat', 'gorilla', 'hamster',
    'hippo', 'horse', 'koala', 'kangaroo', 'lion', 'monkey', 'mouse', 'octopus', 'ostrich',
    'penguin', 'pig', 'rabbit', 'rhino', 'rhinoceros', 'sheep', 'squirrel', 'tiger', 'wolf'
  ]

  useEffect(() => {
      const query = userQuery(userId);

      client.fetch(query).then((data) => {
          setUser(data[0]);
      });
    }, []);

  const fetchVillagerData = () => {
    fetch(`https://api.nookipedia.com/villagers?game=nh&api_key=${process.env.REACT_APP_ACNH_API_KEY}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      setVillagers(data);
    })
  }

  const fetchPersonalityVillagerData = (personality) => {
    fetch(`https://api.nookipedia.com/villagers?game=nh&personality=${personality}&api_key=${process.env.REACT_APP_ACNH_API_KEY}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      setVillagers(data);
    })
  }

  const fetchSpeciesVillagerData = (species) => {
    fetch(`https://api.nookipedia.com/villagers?game=nh&species=${species}&api_key=${process.env.REACT_APP_ACNH_API_KEY}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      setVillagers(data);
    })
  }

  useEffect(() => {
    if (filter === 'all') {
      fetchVillagerData()
     } else if (personalityList.includes(filter)) {
      fetchPersonalityVillagerData(filter);
     } else if (speciesList.includes(filter)) {
      fetchSpeciesVillagerData(filter);
     }
  }, [filter]);

  return (
    <div className="body">
      <div className="flex flex-wrap gap-2 my-5">
        <button className={filter == 'all' ? 'button-active' : 'button'} onClick={() => setFilter('all')}>All Villagers</button>
        {personalityList.map((item, index) => {
          return (
            <div key={index}>
            <button className={filter == item ? 'button-active' : 'button'} onClick={() => setFilter(item)}>{item.charAt(0).toUpperCase() + item.slice(1)}</button>
            </div>
        )})}
        {speciesList.map((item, index) => {
          return (
            <div key={index}>
            <button className={filter == item ? 'button-active' : 'button'} onClick={() => setFilter(item)}>{item.charAt(0).toUpperCase() + item.slice(1)}</button>
            </div>
        )})}
      </div>
      <span className="text-sm">{villagers.length} Results</span>
      {villagers.length > 0 ? (
        <div className="mt-3">
          <Grid container spacing={1}>
              {villagers.map((item) => {
                return (
                  <Grid key={item['name']} xs={6} sm={4} md={2}>
                    <ObjectCard user={user} objName={item['name']} objImage={item['image_url']} objType='villagers' />
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

export default Villagers
