import React, { useState } from 'react'
import { HomeProps } from '../lib/interfaces'
import HeaderLG from './HeaderLG'
import CrossSVG from './svg/CrossSVG'
import '../css/Home.css'


const renderDisconnectInfo = (value: string, handleClick: (value: string) => void): JSX.Element | null => value
    ? (<div className='home__disconnect-info'>
        <button className='disconnect-info__close-btn' onClick={() => handleClick('')}>
            <CrossSVG />
        </button>
        <span className='disconnect-info__text'>{value}</span>
    </div>)
    : null

const Home = ({ onSubmitForm, errorMsg, disconnectInfo, handleDisconnectInfo }: HomeProps): JSX.Element => {
    const [ value, setValue ] = useState<string>('')
    const handleValueChange = (event: React.FormEvent<HTMLInputElement>): void => {
        setValue(event.currentTarget.value)
    }

    return (
        <div className='home'>
            {renderDisconnectInfo(disconnectInfo, handleDisconnectInfo)}
            <HeaderLG />
            <form className='home__form'>
                <h2 className='form__heading'>Enter display name</h2>
                <div className='form__input-container'>
                    <span className='input-container__error-msg'>{errorMsg}</span>
                    <input placeholder='username' className='input-container__input' type='text' onChange={handleValueChange} />
                    <div className='input-container__element-drop'></div>
                </div>
                <button className='form__submit' type='submit' onClick={onSubmitForm(value)}>
                    Join chat
                </button>
            </form>
        </div>
    )
}

export default Home
