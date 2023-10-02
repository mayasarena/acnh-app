import React from 'react';
import '../index.css';
import Card from '@mui/material/Card';
import { Link, useNavigate } from 'react-router-dom';
import  { Starred } from '../components';

const ObjectCard = ({ user, objName, objImage, objType }) => {
  const navigate = useNavigate();
  let alreadyStarred = (user?.starred?.find(e => (e.objName === objName) && (e.objType === objType)));
  
  return (
    <div className="card">
      <div className="flex justify-end items-end">
        <Starred objectName={objName} objectType={objType} objectImg={objImage} alreadyStarred={alreadyStarred} />
      </div>
      <div className="flex flex-col items-center gap-3">
        <img className="h-24 hover:cursor-pointer" src={objImage} alt="details" onClick={() => navigate(`/${objType}/${objName}`)}/>
          { objName }
      </div>
    </div>
  )
}

export default ObjectCard