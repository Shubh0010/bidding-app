import axios from "axios";
import { useSelector } from "react-redux";


const Player = ({ }) => {

  const session = useSelector((store) => store.session?.current_session);;

  const handleClick = async ({ type }) => {

    try {
      
      if(type == 'sold' && (!session?.current_bid || session?.current_bid < 5)) {

        window.alert('Cannot bought for that amount!');
        return;
      }

      const body = {
        "team_id": session?.biddingTeamId,
        "amount": session?.current_bid,
        "status": type,
      };

      await axios.put(`${import.meta.env.VITE_SERVER_URL}/bid/${session?._id}/complete`, body, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      window.location.href = '/';

    } catch (error) {

      console.error(error);
      window.alert('Cannot complete bid!')
    }
    
  }

  return (
    <div className="mt-5 w-1/3 flex flex-wrap justify-center h-5/6">
      <div className="p-8 text-5xl bg-slate-700 mb-4 text-center text-white w-5/6">
        <h1 className="py-4 bg-gray-900 rounded-lg"> {session?.player?.name} </h1>
        <h1 className="my-7"> Position: </h1>
        <h1 className="py-4 bg-gray-900 rounded-lg"> {session?.player?.position} </h1>

        <div className="mt-16">

        </div>

        <h1 className="py-4 bg-gray-900 rounded-lg text-2xl"> CURRENT BID: <br /><span className="text-6xl">{session?.current_bid || 0} M</span> </h1>

      </div>
      <div className="my-4 mx-20">
        <button
          onClick={() => {
            handleClick({ type: 'sold' })
          }}
          className="px-4 py-2 bg-emerald-700 my-2 mx-2  mb-4 text-center rounded-lg text-white">
          Sold
        </button>
        <button
          onClick={() => {
            handleClick({ type: 'unsold' })
          }}
          className="px-2 py-2 bg-red-700 my-2 mx-2 mb-4 text-center rounded-lg text-white">
          Unsold
        </button>
      </div>
    </div>
  )
}

export default Player
