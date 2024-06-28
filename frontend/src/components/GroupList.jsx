import Team from "./Team"


const GroupList = ({ type, teams, session }) => {

  return (
    <div className='w-3/6'>

      {
        teams.map(team => {

          return <Team key={team._id} type={type} team={team} session={session}/>
        })
      }

    </div>
  )
}

export default GroupList;