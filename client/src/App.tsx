import React, { useState } from 'react'
import Home from './components/Home'
import ChatRoom from './components/ChatRoom'
import { ProfileData } from './lib/interfaces'
import './css/App.css'

const App: React.FC = () => {
    const [ isChatMounted, setIsChatMounted ] = useState<boolean>(false)
    const [ username, setUsername ] = useState<string>('')
    const [ errorMsg, setErrorMsg ] = useState<string>('')
    const [ disconnectInfo, setDisconnectInfo ] = useState<string>('')

    const connect = (data: ProfileData): void => {
        setErrorMsg('')
        setDisconnectInfo('')
        setUsername(data.username)
        setIsChatMounted(true)
    }

    const checkValidResponse = (data: ProfileData): void => data.valid
        ? connect(data)
        : setErrorMsg(data.errorMsg)

    const handleServerErr = (): void => {
        setErrorMsg('Oops, something went wrong!')
    }

    const handleSubmitForm = (value: string) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault()
        fetch(`/api/users/validate/${value}/`)
            .then(res => res.json())
            .then(checkValidResponse)
            .catch(handleServerErr)
    }

    const handleUnmountChat = (): void => setIsChatMounted(false)
    const handleDisconnectInfo = (info: string): void => setDisconnectInfo(info)

    const view = isChatMounted
        ? (<ChatRoom
            handleDisconnectInfo={handleDisconnectInfo}
            onUnmountChat={handleUnmountChat}
            username={username}
        />)
        : (<Home
            handleDisconnectInfo={handleDisconnectInfo}
            disconnectInfo={disconnectInfo}
            errorMsg={errorMsg}
            onSubmitForm={handleSubmitForm}
        />)

    return (
        <div className="view">
            {view}
        </div>
    )
}

export default App;
