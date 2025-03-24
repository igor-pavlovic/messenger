import React from 'react'
import { Friend, Message } from '@/types'
import { ChatHeader } from './ChatHeader'
import { MessageList } from '@/components/MessageList'
import { ChatInput } from './ChatInput'
import styles from './ChatContainer.module.css';

interface ChatContainerProps {
  selectedFriend: Friend,
  messages: Message[],
  onSendMessage: (text: string) => void
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ selectedFriend, messages, onSendMessage}) => {

  if (!selectedFriend) return <div>No friend selected</div>

  return (
    <div className={styles.chat}>
      <ChatHeader friend={selectedFriend} />
      <MessageList messages={messages} friend={selectedFriend} />
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  )
}
