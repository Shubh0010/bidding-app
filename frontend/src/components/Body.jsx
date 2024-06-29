import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addCurrentSession } from "../utils/sessionSlice"
import GroupList from "./GroupList"
import Player from "./Player"
import axios from "axios";

const Body = () => {

  const player_sold = useSelector(store => store?.session?.player_sold);

  const dispatch = useDispatch();

  const manageSession = async () => {

    const json = await axios.post(`${import.meta.env.VITE_SERVER_URL}/session`);

    dispatch(addCurrentSession(json?.data?.data));
  }

  useEffect(() => {

    manageSession();
  }, [player_sold]);

  return (
    <div
      className="bg-[url('https://images.jdmagicbox.com/comp/chandigarh/m5/0172px172.x172.190912034053.t2m5/catalogue/kick-start-chandigarh-sector-44b-chandigarh-dj-system-on-rent-8q286l7o5m.jpg')]">
      <div className="flex justify-between p-2 bg-opacity-85 bg-slate-900 h-screen">
        {/**
       * Team From Pool A
       * Player Details
       * Team From Pool B
       */}

        <GroupList />
        <Player />
        <GroupList type={'right'}/>
      </div>
    </div>

  )
}

export default Body;