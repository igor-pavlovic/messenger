import React from 'react'
import {Friend, Message} from '@/types'
import { MessageItem } from './MessageItem'
import styles from './MessageList.module.css'

interface MessageListProps {
  messages: Message[],
  friend: Friend
}

export const MessageList: React.FC<MessageListProps> = ({ messages, friend }) => {
  return (
    <div className={styles.list}>
      {messages.length === 0
        ? <div className={styles.emptyList}>No messages yet</div>
        : messages.map((message) =>
          <MessageItem
            key={message.id}
            message={message}
            isFriendMessage={friend.id === message.senderId}
          />
        )}
    </div>
  )
}
