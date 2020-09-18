import React from 'react'
import { MessageProps } from '../lib/interfaces'
import '../css/Message.css'

const getMsgClasses = (username: string, loggedInUser: string): string => {
    if (username === 'easy_chat_bot') return 'msg__bot-msg'
    if (username === loggedInUser) return 'msg__out-msg'
    return 'msg__inc-msg'
}

const getMetaClasses = (username: string, loggedInUser: string): string => {
    const generic = 'msg__meta'
    if (username === 'easy_chat_bot') return `${generic} msg__meta--bot`
    if (username === loggedInUser) return `${generic} msg__meta--outgoing`
    return generic
}

const getUsernameClasses = (username: string, loggedInUser: string): string => {
    return username === loggedInUser || username === 'easy_chat_bot'
        ? 'meta__username meta__username--out-or-bot'
        : 'meta__username'
}

const renderMeta = (username: string, loggedInUser:string, timestamp: string): JSX.Element => (
    <div className={getMetaClasses(username, loggedInUser)}>
        <span className={getUsernameClasses(username, loggedInUser)}>{username}</span>
        <span className='meta__timestamp'>{timestamp}</span>
    </div>
)

const Message = ({ username, content, loggedInUser, timestamp }: MessageProps): JSX.Element => (
    <div className='msg'>
        {renderMeta(username, loggedInUser, timestamp)}
        <div className={getMsgClasses(username, loggedInUser)}>
            <span className='msg__content'>{content}</span>
        </div>
    </div>
)

export default Message
