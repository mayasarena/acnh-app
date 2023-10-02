import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Route, Routes } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

const Search = () => {
    const [fish, setFish] = useState([]);
    const [seaCreatures, setSeaCreatures] = useState([]);
    const [bugs, setBugs] = useState([]);
    const [villagers, setVillagers] = useState([]);
    const [value, setValue] = useState('');
    const [fishSuggestions, setFishSuggestions] = useState([]);
    const [seaSuggestions, setSeaSuggestions] = useState([]);
    const [bugSuggestions, setBugSuggestions] = useState([]);
    const [villagerSuggestions, setVillagerSuggestions] = useState([]);
    const navigate = useNavigate();

    const fetchData = () => {
        Promise.all([
            fetch(`https://api.nookipedia.com/nh/fish?api_key=${process.env.REACT_APP_ACNH_API_KEY}`),
            fetch(`https://api.nookipedia.com/nh/bugs?api_key=${process.env.REACT_APP_ACNH_API_KEY}`),
            fetch(`https://api.nookipedia.com/nh/sea?api_key=${process.env.REACT_APP_ACNH_API_KEY}`),
            fetch(`https://api.nookipedia.com/villagers?game=nh&api_key=${process.env.REACT_APP_ACNH_API_KEY}`),
        ])
        .then(([resFish, resBugs, resSea, resVillager]) =>
            Promise.all([resFish.json(), resBugs.json(), resSea.json(), resVillager.json()])
        )
        .then(([dataFish, dataBugs, dataSea, dataVillager]) => {
            setFish(dataFish);
            setSeaCreatures(dataSea);
            setBugs(dataBugs);
            setVillagers(dataVillager);
        })
        .catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        fetchData()
    }, []);

    useEffect(() => {
        const fishSuggest = fish.filter(e => (e?.name.toLowerCase().includes(value.toLowerCase())));
        const seaSuggest = seaCreatures.filter(e => (e?.name.toLowerCase().includes(value.toLowerCase())));
        const bugSuggest = bugs.filter(e => (e?.name.toLowerCase().includes(value.toLowerCase())));
        const villagerSuggest = villagers.filter(e => (e?.name.toLowerCase().includes(value.toLowerCase())));

        setFishSuggestions(fishSuggest);
        setSeaSuggestions(seaSuggest);
        setBugSuggestions(bugSuggest);
        setVillagerSuggestions(villagerSuggest);

        if (value === '') {
            setFishSuggestions([]);
            setSeaSuggestions([]);
            setBugSuggestions([]);
            setVillagerSuggestions([]);
        }
    }, [value])

    const clickResult = (itemType, itemName) => {
        setValue('');
        navigate(`/${itemType}/${itemName}`);
    }

  return (
    <div>
        <div className="flex w-full items-center rounded-lg bg-lightcream">
            <input
                className="p-2 w-full bg-lightcream rounded-lg text-brown"
                type="text"
                id="search"
                value={value}
                placeholder="Search"
                onChange={(e) => {setValue(e.target.value)}}
            />
            <div className="text-blue px-2">
                <AiOutlineSearch size={30}/>
            </div>
        </div>
        <div className={(value === '' || (fishSuggestions.length == 0 && bugSuggestions.length == 0 && seaSuggestions.length == 0 && villagerSuggestions == 0)) ? "hidden" : "fixed w-1/2 top-14 max-h-96 overflow-y-scroll bg-lightcream text-brown mt-1"}>
            {fishSuggestions.map((item, index) => {
            return (
                <div key={index}>
                    <div className="flex items-center p-2 border-b hover:bg-lightgreen" onClick={() => clickResult('fish', item['name'])}>
                        <div className="flex items-center gap-4">
                            <img className="h-10" src={item["image_url"]} />
                            {item['name']} <span className="text-lightgray text-sm font-bold">in Fish</span>
                        </div>
                    </div>
                </div>
            )
            })}
            {bugSuggestions.map((item, index) => {
                return (
                    <div key={index}>
                    <div className="flex items-center p-2 border-b hover:bg-lightgreen" onClick={() => clickResult('bugs', item['name'])}>
                        <div className="flex items-center gap-4">
                            <img className="h-10" src={item["image_url"]} />
                            {item['name']} <span className="text-lightgray text-sm font-bold">in Bugs</span>
                        </div>
                    </div>
                </div>
                )
            })}
            {seaSuggestions.map((item, index) => {
                return (
                    <div key={index}>
                    <div className="flex items-center p-2 border-b hover:bg-lightgreen" onClick={() => clickResult('sea', item['name'])}>
                        <div className="flex items-center gap-4">
                            <img className="h-10" src={item["image_url"]} />
                            {item['name']} <span className="text-lightgray text-sm font-bold">in Sea Creatures</span>
                        </div>
                    </div>
                </div>
                )
            })}
            {villagerSuggestions.map((item, index) => {
                return (
                    <div key={index}>
                    <div className="flex items-center p-2 border-b hover:bg-lightgreen" onClick={() => clickResult('villagers', item['name'])}>
                        <div className="flex items-center gap-4">
                            <img className="h-10" src={item["image_url"]} />
                            {item['name']} <span className="text-lightgray text-sm font-bold">in Villagers</span>
                        </div>
                    </div>
                </div>
                )
            })}
        </div>
    </div>
  )
}

export default Search