import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentSession } from "../utils/sessionSlice";

const Bid = ({ team }) => {

  const dispatch = useDispatch();

  const session = useSelector((store) => store.session?.current_session);

  const bidValue = useRef(0);

  // Use state to store and manage the team data
  const [teamData, setTeamData] = useState(null);

  // Update teamData when the team prop changes
  useEffect(() => {

    setTeamData(team);

  }, []);

  const handleClick = async () => {

    try {

      const currentBidAmount = bidValue?.current?.value;

      const response = await makeBid({ team_id: teamData._id, bid_amount: currentBidAmount, session_id: session?._id });

      if(response?.data?.statusCode == 200) {
        
        dispatch(addCurrentSession({
          _id: session?._id,
          player: session?.player,
          current_bid: currentBidAmount,
          status: 'active',
          biddingTeamId: teamData._id
        }));

        return window.alert('Bid Raised');
      }

      window.alert('Bid Failed!');

    } catch (error) {

      window.alert( error?.response?.data?.message || error.message);
    }

  };

  const makeBid = async ({ team_id, bid_amount, session_id }) => {

    try {

      const body = {
        "team_id": team_id,
        "amount": bid_amount
      };

      return axios.put(`${import.meta.env.VITE_SERVER_URL}/bid/${session_id}`, body, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

    } catch (error) {

      window.alert('Bid Fail');
    }
  };

  return (
    <div className={
      session?.biddingTeamId == teamData?._id ? 
      "bg-emerald-300 m-2 p-4 rounded-lg h-1/6 justify-between my-auto w-1/3 shadow-lg shadow-slate-500" :
      "bg-slate-300 m-2 p-4 rounded-lg h-1/6 justify-between my-auto w-1/3 shadow-lg shadow-slate-500"
      }>
      <h1>Team's Bid: {session?.biddingTeamId == teamData?._id ? session?.current_bid : 0}M</h1>
      <div className="my-4">
        <input
          ref={bidValue}
          className="w-1/3 bg-slate-50 border-black border-solid border-opacity-100 rounded-lg"
        />
        <button
          className="mx-2 rounded-lg font-bold bg-slate-500 text-white px-4"
          onClick={handleClick}
        >
          Bid
        </button>
      </div>
    </div>
  );
};

export default Bid;
