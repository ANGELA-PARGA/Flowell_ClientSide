'use client';

import { useState, useEffect, useRef } from 'react';
import { sendChatMessage } from '@/lib/fetchingRequests';
import styles from './components.module.css';

const STORAGE_KEY = 'flowell_chat_messages';

const ChatInterface = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Load messages from sessionStorage on component mount
    useEffect(() => {
        const loadMessagesFromStorage = () => {
            try {
                const storedMessages = sessionStorage.getItem(STORAGE_KEY);
                if (storedMessages) {
                    const parsedMessages = JSON.parse(storedMessages);
                    setMessages(parsedMessages);
                }
            } catch (error) {
                console.error('Failed to load messages from sessionStorage:', error);
                // Clear corrupted data
                sessionStorage.removeItem(STORAGE_KEY);
            }
        };

        loadMessagesFromStorage();
    }, []);

    // Save messages to sessionStorage whenever messages change
    useEffect(() => {
        const saveMessagesToStorage = () => {
            try {
                sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
            } catch (error) {
                console.error('Failed to save messages to sessionStorage:', error);
            }
        };

        // Only save if we have messages to avoid saving empty array on initial load
        if (messages.length > 0) {
            saveMessagesToStorage();
        }
    }, [messages]);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleToggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = {
            id: Date.now(),
            text: inputMessage.trim(),
            sender: 'user',
            timestamp: new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
            })
        };

        // Add user message to chat
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            const response = await sendChatMessage(userMessage.text);
            
            const botMessage = {
                id: Date.now() + 1,
                text: response.message || response.reply || 'I received your message!',
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                })
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Failed to send message:', error);
            
            const errorMessage = {
                id: Date.now() + 1,
                text: 'Sorry, I\'m having trouble connecting right now. Please try again later.',
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                }),
                isError: true
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const renderMessage = (message) => {
        const messageClass = message.sender === 'user' 
            ? `${styles.messageItem} ${styles.userMessage}` 
            : `${styles.messageItem} ${styles.botMessage}`;

        return (
            <div key={message.id} className={messageClass}>
                <div>{message.text}</div>
                <div className={styles.messageTimestamp}>
                    {message.timestamp}
                </div>
            </div>
        );
    };

    const renderLoadingMessage = () => (
        <div className={`${styles.messageItem} ${styles.loadingMessage}`}>
            <span>Typing</span>
            <div className={styles.loadingDots}>
                <div className={styles.loadingDot}></div>
                <div className={styles.loadingDot}></div>
                <div className={styles.loadingDot}></div>
            </div>
        </div>
    );

    const renderEmptyState = () => (
        <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>💬</div>
            <div className={styles.emptyStateText}>
                Hello! I'm here to help you.<br />
                Ask me anything about our products or services.
            </div>
        </div>
    );

    if (!isOpen) {
        return (
            <button 
                className={styles.chatToggleButton}
                onClick={handleToggleChat}
                aria-label="Open chat"
            >
                💬
            </button>
        );
    }

    return (
        <div className={`${styles.chatContainer} ${isOpen ? styles.open : styles.closed}`}>
            <div className={styles.chatHeader} onClick={handleToggleChat}>
                <h3 className={styles.chatTitle}>Customer Support</h3>
                <div className={styles.headerButtons}>
                    <button 
                        className={styles.toggleButton}
                        aria-label="Close chat"
                    >
                        ✕
                    </button>
                </div>
            </div>

            <div className={styles.chatWindow}>
                <div className={styles.messagesContainer}>
                    {messages.length === 0 ? (
                        renderEmptyState()
                    ) : (
                        <>
                            {messages.map(renderMessage)}
                            {isLoading && renderLoadingMessage()}
                        </>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className={styles.inputContainer}>
                <form className={styles.inputForm} onSubmit={handleSendMessage}>
                    <textarea
                        ref={inputRef}
                        className={styles.messageInput}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                        rows={1}
                        disabled={isLoading}
                    />
                    <button 
                        type="submit" 
                        className={styles.sendButton}
                        disabled={!inputMessage.trim() || isLoading}
                        aria-label="Send message"
                    >
                        {isLoading ? '...' : '➤'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatInterface;
