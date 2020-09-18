import React from 'react';

export interface ProfileData {
    valid: boolean,
    errorMsg: string,
    username: string,
}

export interface MessageData {
    content: string,
    username: string,
    timestamp: string,
}

export interface ChatRoomProps {
    username: string,
    onUnmountChat: () => void,
    handleDisconnectInfo: (value: string) => void,
}

export interface HeaderSmProps {
    onLogout: () => void,
    heading: string,
    allUsers: string[],
}

export interface HomeProps {
    onSubmitForm: (value: string) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    errorMsg: string,
    disconnectInfo: string,
    handleDisconnectInfo: (value: string) => void,
}

export interface MessageProps {
    username: string,
    content: string,
    loggedInUser: string,
    timestamp: string,
}

export interface UsersInRoomProps {
    allUsers: string[],
}
