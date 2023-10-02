import React, { useState, useRef, useEffect } from 'react';
import { userQuery } from '../utils/data';
import { client } from '../sanity';
import Grid from '@mui/material/Unstable_Grid2';
import { ObjectCard } from '../components';

const Profile = () => {
  const [user, setUser] = useState();
  const [displayedObjects, setDisplayedObjects] = useState();
  const [activeButton, setActiveButton] = useState('all');
  const userId = localStorage.getItem('user');

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
          setUser(data[0]);
          setDisplayedObjects(data[0]?.starred);
      });
  }, []);

  useEffect(() => {
    if (activeButton == 'all') {
      const data = user?.starred;
      setDisplayedObjects(data);
    } else if (activeButton == 'fish') {
      const data = user?.starred?.filter(e => e.objType === 'fish');
      setDisplayedObjects(data);
    } else if (activeButton == 'bugs') {
      const data = user?.starred?.filter(e => e.objType === 'bugs');
      setDisplayedObjects(data);
    } else if (activeButton == 'sea') {
      const data = user?.starred?.filter(e => e.objType === 'sea');
      setDisplayedObjects(data);
    } else if (activeButton == 'villagers') {
      const data = user?.starred?.filter(e => e.objType === 'villagers');
      setDisplayedObjects(data);
    }
  }, [activeButton]);

  return (
    <div className="body">
      <div className="flex gap-2 my-5">
        <button className={activeButton == 'all' ? 'button-active' : 'button'} onClick={() => setActiveButton('all')}>Everything</button>
        <button className={activeButton == 'fish' ? 'button-active' : 'button'} onClick={() => setActiveButton('fish')}>Fish</button>
        <button className={activeButton == 'bugs' ? 'button-active' : 'button'} onClick={() => setActiveButton('bugs')}>Bugs</button>
        <button className={activeButton == 'sea' ? 'button-active' : 'button'} onClick={() => setActiveButton('sea')}>Sea Creatures</button>
        <button className={activeButton == 'villagers' ? 'button-active' : 'button'} onClick={() => setActiveButton('villagers')}>Villagers</button>
      </div>
        <Grid container spacing={1}>
              {displayedObjects?.map((obj) => {
                return (
                  <Grid key={obj.objName} xs={6} sm={4} md={2}>
                    <ObjectCard user={user} objName={obj.objName} objImage={obj.objImg} objType={obj.objType}/>
                  </Grid>
                )
              })}
          </Grid>
    </div>
  )
}

export default Profile