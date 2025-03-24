import React from 'react'
import { Friend } from '@/types'
import styles from './styles.module.css'

interface FriendItemProps {
  friend: Friend
  isSelected: boolean
  onSelect: (friend: Friend) => void
}

export const FriendItem: React.FC<FriendItemProps> = ({ friend, isSelected, onSelect }) => {
  const handleClick = () => {
    onSelect(friend)
  }

  return (
    <li
      className={`${styles.friend} ${isSelected ? styles.isSelected : ''}`}
      onClick={handleClick}
    >
      <img className={styles.avatar} alt={`Avatar for ${friend.avatar}`} src={friend.avatar} />
      <div className={styles.name}>
        {friend.name}
      </div>
    </li>
  )
}
