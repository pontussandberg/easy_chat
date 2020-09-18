import React, { useState } from 'react';
import { UsersInRoomProps } from '../lib/interfaces'
import '../css/UsersInRoom.css'

const mapUserList = (username: string, idx: number): JSX.Element => <li key={idx} className='user-list__user'>{username}</li>

const UsersInRoom = ({ allUsers }: UsersInRoomProps) : JSX.Element => {
    const [ userListDisplayed, setUserListDisplayed ] = useState<boolean>(false)

    const renderUserList = (): JSX.Element | null => userListDisplayed
        ? (
            <div className='users-in-room__user-list'>
                <ul>
                    {allUsers.map(mapUserList)}
                </ul>
            </div>
        )
        : null

    return (
        <div className='users-in-room'>
            <button
                onClick={() => setUserListDisplayed(!userListDisplayed)}
                className='users-in-room__count'
            >
                {allUsers.length}
            </button>
            {renderUserList()}
        </div>
    );
}

export default UsersInRoom
