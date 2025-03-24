import React from 'react'
import { Message } from '@/types'
import styles from './MessageItem.module.css'

interface MessageItemProps {
  message: Message,
  isFriendMessage: boolean,
}

export const MessageItem: React.FC<MessageItemProps> = ({ message, isFriendMessage }) => {
  return (
    <div className={`${styles.message} ${isFriendMessage ? styles.isFriend : styles.isUser}`} >
      <div>{message.text}</div>
      <div className={styles.timestamp} >
        {message.timestamp}
      </div>
    </div>
  )
}
