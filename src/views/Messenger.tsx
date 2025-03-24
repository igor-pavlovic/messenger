import React, {useCallback, useEffect} from 'react';
import {Friend} from "@/types";
import { ChatContainer, FriendsList }  from '@/components';
import { useSelector, useDispatch } from 'react-redux'
import {
  sendMessage, selectFriend, AppDispatch, getChats, getFriends, selectFriends,
  selectSelectedFriend, selectCurrentMessages
} from "@/store";
import styles from './Messenger.module.css';

export const Messenger: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getChats());
    dispatch(getFriends())
      .unwrap()
      .then((friends: Friend[]) => {
        if (friends.length > 0) {
          dispatch(selectFriend(friends[0].id));
        }
      })
  }, [dispatch]); // Dispatch shouldn't change between re-renders but seems like good practice to add it

  const friends = useSelector(selectFriends);
  const selectedFriend = useSelector(selectSelectedFriend);
  const messages = useSelector(selectCurrentMessages);

  const onSelectFriend = useCallback((friend: Friend): void => {
    dispatch(selectFriend(friend.id));
  }, [dispatch]);

  const onSendMessage = useCallback((text: string): void => {
    dispatch(sendMessage(text));
  }, [dispatch]);


  // Loading state
  if (!selectedFriend) {
    return <div className={styles.loading}>Loading...</div>;
  }

  /*
    Using container and presentational pattern (smart/dumb components) to make components
    easier to test. This is a simple app so there's not a lot of prop-drilling happening, but I would
    plan which components are managing the state.
   */
  return (
    <div className={styles.messenger}>
      <FriendsList
        friends={friends}
        selectedFriend={selectedFriend}
        onSelectFriend={onSelectFriend}
      />
      <ChatContainer
        selectedFriend={selectedFriend}
        messages={messages}
        onSendMessage={onSendMessage}
      />
    </div>
  );
};

