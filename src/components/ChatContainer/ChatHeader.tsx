import React from 'react'
import { Friend } from '@/types'
import styles from './ChatHeader.module.css';

interface ChatHeaderProps {
  friend: Friend
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ friend }) => {
  return (
    <div className={styles.header}>
      <div className={styles.avatar}>
        <img className={styles.avatar} src={friend.avatar} alt={`Avatar for ${friend.name}`} />
      </div>
      <div className={styles.name}>
        {friend.name}
      </div>
    </div>
  )
}
