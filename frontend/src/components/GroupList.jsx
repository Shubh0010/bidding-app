import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Team from "./Team"


const GroupList = ({ type }) => {

  let [teams, setTeams] = useState([]);

  const player_sold = useSelector((store) => store.session?.player_sold);

  if(type != 'right') {
    teams = teams?.filter((team, index) => index < 4);
  } else {
    teams = teams?.filter((team, index) => index >= 4);
  }

  const fetchAllTeamsdata = async () => {

    var requestOptions = {
      method: 'GET'
    };

    const json = await axios.get(`${import.meta.env.VITE_SERVER_URL}/teams`, requestOptions);

    setTeams(json?.data?.data);
  };

  useEffect(() => {
    fetchAllTeamsdata();
  }, [player_sold]);

  return !teams?.length ? <div>Loading....</div> : (
    <div className='w-3/6'>

      {
        teams.map(team => {

          return <Team key={team._id} type={type} team={team}/>
        })
      }

    </div>
  )
}

export default GroupList;