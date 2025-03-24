import React from 'react'
import { Friend } from '@/types'
import { FriendItem } from './FriendItem'
import styles from './styles.module.css'

interface FriendsListProps {
  friends: Friend[]
  selectedFriend: Friend
  onSelectFriend: (friend: Friend) => void
}

export const FriendsList: React.FC<FriendsListProps> = ({ friends, selectedFriend, onSelectFriend }) => {
  return (
    <div className={styles.friends}>
      <h2 className={styles.friendsTitle}>Contacts</h2>
      <ul className={styles.friendsList}>
        {friends.map((friend) => (
          <FriendItem
            key={friend.id}
            friend={friend}
            isSelected={selectedFriend.id === friend.id}
            onSelect={onSelectFriend} />
        ))}
      </ul>
    </div>
  )
}
