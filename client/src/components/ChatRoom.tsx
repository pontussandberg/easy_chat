import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import { v4 } from 'uuid'
import moment from 'moment'
import { MessageData, ChatRoomProps } from '../lib/interfaces'
import Message from './Message'
import HeaderSM from './HeaderSM'
import ArrowSVG from './svg/ArrowSVG'
import '../css/ChatRoom.css'


const mapMessage = (username: string) => (x: MessageData): JSX.Element => (
    <Message
        key={v4()}
        loggedInUser={username}
        username={x.username}
        content={x.content}
        timestamp={x.timestamp}
    />
)

const appendMsg = (content: string, username: string, all: MessageData[]): MessageData[] => {
    const toAdd = {
        content,
        username,
        timestamp: moment().format('LT'),
    }
    return [ ...all, toAdd ]
}

const ChatRoom = ({ username, onUnmountChat, handleDisconnectInfo }: ChatRoomProps): JSX.Element => {
    const socket = useRef<SocketIOClient.Socket | null>(null)
    const messagesElemRef = useRef<HTMLDivElement>(null)
    const prevMessagesRef = useRef<MessageData[]>([])
    const [ messages, setMessages ] = useState<MessageData[]>([])
    const [ allUsers, setAllUsers ] = useState<string[]>([])
    const [ inputValue, setInputValue ] = useState<string | number | readonly string[] | undefined>('')
    useEffect((): void => {
        prevMessagesRef.current = messages
    }, [ messages ])

    useEffect(() => {
        socket.current = io()
        socket.current.emit('new_user', username)
        socket.current.on('inc_chat_msg', (msg: MessageData) => {
            const msgs = appendMsg(msg.content, msg.username, prevMessagesRef.current)
            setMessages(msgs)
        })
        socket.current.on('disconnect', onUnmountChat)
        socket.current.on('connected_users', setAllUsers)

        const base = 'You were disconnected due to'
        socket.current.on('server_error', () => handleDisconnectInfo(`${base} server error`))
        socket.current.on('inactive', () => handleDisconnectInfo(`${base} inactivity`))

        return (): void => {
            if (socket?.current) {
                socket.current.disconnect()
            }
        }
    }, [])

    // Scroll to bottom when new messages are appended
    useEffect((): void => {
        if (messagesElemRef?.current)
            messagesElemRef.current.scrollTop = messagesElemRef.current.scrollHeight
    }, [ messages ])

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
        setInputValue(event.currentTarget.value)
    }

    const handleSend = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault()
        if (!inputValue) return
        if (socket?.current && inputValue) {
            const msgs = appendMsg(inputValue.toString(), username, messages)
            setMessages(msgs)
            setInputValue('')
            socket.current.emit('out_chat_msg', inputValue)
        }
    }

    const disconnectSocket = (): void => {
        if (socket?.current) {
            socket.current.emit('disconnect')
            onUnmountChat()
        }
    }

    return (
        <div className='chat-room'>
            <HeaderSM allUsers={allUsers} heading={username} onLogout={disconnectSocket} />
            <div className='chat-room__messages' ref={messagesElemRef}>
                {messages.map(mapMessage(username))}
            </div>
            <form className='chat-room__form'>
                <input
                    className='form__message-input'
                    type='text'
                    placeholder='Compose your message...'
                    onChange={handleInputChange}
                    value={inputValue}
                />
                <button className='form__send-cta' type='submit' onClick={handleSend}>
                    <ArrowSVG />
                </button>
            </form>
        </div>
    )
}

export default ChatRoom
