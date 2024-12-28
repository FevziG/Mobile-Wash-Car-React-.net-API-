import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Axios'u dahil et
import '../cssCode/workerSupport.css'; // Worker'a özel CSS dosyasını dahil et

function WorkerSupport() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // Tüm mesajların listesi
  const [response, setResponse] = useState(''); // Admin'den gelen mesaj durumu

  // Sayfa yüklendiğinde mesajları al
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Backend'den tüm mesajları al (worker ve admin mesajları)
        const result = await axios.get('/api/messages');
        setMessages(result.data);
      } catch (error) {
        console.error('Mesajlar alınırken bir hata oluştu', error);
      }
    };

    fetchMessages();
  }, []); // Sayfa yüklendiğinde sadece bir kez çalışacak

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    const workerMessage = {
      user: 'Worker 1', // Dinamik worker adı
      message,
      timestamp: new Date().toISOString(),
      role: 'worker', // Worker rolü
    };

    try {
      // Mesajı backend'e gönder (POST isteği)
      await axios.post('/api/messages', workerMessage);
      setMessages((prevMessages) => [...prevMessages, workerMessage]); // Worker mesajını listeye ekle
      setMessage(''); // Mesaj kutusunu temizle
      setResponse('Mesaj başarıyla gönderildi!');
    } catch (err) {
      console.error('Mesaj gönderilirken bir hata oluştu', err);
      setResponse('Mesaj gönderilirken bir hata oluştu.');
    }
  };

  return (
    <div className="worker-support-container">
      <h1 className="worker-support-title">Destek Mesajı</h1>
      <div className="worker-support-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-bubble ${msg.role === 'worker' ? 'worker-message' : 'admin-message'}`}
          >
            <strong>{msg.role === 'worker' ? 'Worker' : 'Admin'}:</strong> {msg.message}
            <div className="timestamp">{new Date(msg.timestamp).toLocaleString()}</div>
          </div>
        ))}
      </div>
      {response && <p>{response}</p>} {/* Admin'den gelen cevabı göster */}
      <form className="worker-support-form" onSubmit={handleSubmit}>
        <textarea
          className="worker-support-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mesajınızı buraya yazın..."
        />
        <button className="worker-support-button" type="submit">
          Gönder
        </button>
      </form>
    </div>
  );
}

export default WorkerSupport;
