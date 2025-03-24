import React, { useState, FormEvent } from 'react'
import styles from './ChatInput.module.css'

interface MessageInputProps {
  onSendMessage: (text: string) => void
}

export const ChatInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [messageInput, setMessageInput] = useState<string>('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (messageInput.trim() === '') return

    onSendMessage(messageInput)
    setMessageInput('')
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          className={styles.input}
          placeholder="Type a message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          Send
        </button>
    </form>
  )
}
