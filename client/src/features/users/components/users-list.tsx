'use client'
import {FC} from 'react'
import {ListOfUsers} from '../types'

interface UsersListProps {
  isLoading: boolean;
  users?: ListOfUsers;
}

const UsersList: FC<UsersListProps> = ({isLoading, users}) => {
  return (
    <>
      {isLoading ? <h2>Loading</h2> : <h2 className="font-bold text-2xl capitalize text-center">List of users</h2>}
      <ul className="space-y-4 px-8 mt-9 h-96 overflow-y-scroll">
        {users && users.length ? users.map(({id, firstname, lastname, email}) => (
          <li key={id} className="list-decimal">
            <p><span className="font-bold">{email}</span> ({firstname} {lastname})</p>
          </li>
        )) : null}
      </ul>
    </>
  )
}

export default UsersList
