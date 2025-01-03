import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Axios'u dahil et
import '../cssCode/userSupport.css'; // CSS dosyanızı dahil edin

function UserSupport() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // Tüm mesajların listesi
  const [response, setResponse] = useState(''); // Admin'den gelen mesaj durumu

  // Sayfa yüklendiğinde mesajları al
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Backend'den tüm mesajları al
        const result = await axios.get('/api/messages');
        setMessages(result.data);
      } catch (error) {
        console.error('Mesajlar alınırken bir hata oluştu', error);
      }
    };

    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    const userMessage = {
      user: 'John Doe', // Dinamik kullanıcı adı
      message,
      timestamp: new Date().toISOString(),
      role: 'user', // Kullanıcı rolü
    };

    try {
      // Mesajı backend'e gönder (POST isteği)
      await axios.post('/api/messages', userMessage);
      setMessages((prevMessages) => [...prevMessages, userMessage]); // Kullanıcı mesajını listeye ekle
      setMessage(''); // Mesaj kutusunu temizle
      setResponse('Mesaj başarıyla gönderildi!');
    } catch (err) {
      console.error('Mesaj gönderilirken bir hata oluştu', err);
      setResponse('Mesaj gönderilirken bir hata oluştu.');
    }
  };

  return (
    <div className="user-support-container">
      <h1 className="user-support-title">Destek Mesajı</h1>
      <div className="user-support-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-bubble ${msg.role === 'user' ? 'user-message' : 'admin-message'}`}
          >
            <strong>{msg.role === 'user' ? 'Siz' : 'Admin'}:</strong> {msg.message}
            <div className="timestamp">{new Date(msg.timestamp).toLocaleString()}</div>
          </div>
        ))}
      </div>
      {response && <p>{response}</p>} {/* Admin'den gelen cevabı göster */}
      <form className="user-support-form" onSubmit={handleSubmit}>
        <textarea
          className="user-support-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mesajınızı buraya yazın..."
        />
        <button className="user-support-button" type="submit">
          Gönder
        </button>
      </form>
    </div>
  );
}

export default UserSupport;
