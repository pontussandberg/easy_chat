import React from 'react'
import { HeaderSmProps } from '../lib/interfaces'
import LogoutSVG from './svg/LogoutSVG'
import UsersInRoom from './UsersInRoom'
import '../css/HeaderSM.css'

const HeaderSM = ({ onLogout, heading, allUsers }: HeaderSmProps): JSX.Element => (
    <header className='sm-header'>
        <button className='sm-header__logout' tabIndex={-1} onClick={onLogout}>
            <LogoutSVG />
            <span className='logout__text'>Disconnect</span>
        </button>
        <h1 className='sm-header__heading'>{heading}</h1>
        <UsersInRoom allUsers={allUsers}/>
    </header>
)

export default HeaderSM
