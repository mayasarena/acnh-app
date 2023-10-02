import { Home, Login, Profile, Fish, Bugs, SeaCreatures, Villagers } from './pages';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar, FishDetails, BugDetails, SeaCreatureDetails, VillagerDetails } from './components';

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route path="fish" element={<Fish />} />
      <Route path="bugs" element={<Bugs />} />
      <Route path="sea" element={<SeaCreatures />} />
      <Route path="villagers" element={<Villagers />} />
      <Route path="/fish/:fishName" element={<FishDetails />} />
      <Route path="/bugs/:bugName" element={<BugDetails />} />
      <Route path="/sea/:seaCreatureName" element={<SeaCreatureDetails />} />
      <Route path="/villagers/:villagerName" element={<VillagerDetails />} />
    </Routes>
    </>
  );
}

export default App;