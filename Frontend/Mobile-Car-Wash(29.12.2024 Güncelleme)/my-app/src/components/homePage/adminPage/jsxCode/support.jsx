import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Axios'u dahil et
import '../cssCode/adminSupport.css'; // Admin CSS dosyanızı dahil edin

function AdminSupport() {
  const [messages, setMessages] = useState([
    { user: 'John Doe', message: 'Merhaba, yardım edebilir misiniz?', timestamp: new Date().toISOString(), role: 'user', toUser: 'Admin' },
    { user: 'Jane Smith', message: 'Lütfen sorumu yanıtlayın.', timestamp: new Date().toISOString(), role: 'user', toUser: 'Admin' },
 
  ]); // Tüm mesajların listesi
  const [selectedUser, setSelectedUser] = useState(null); // Seçili kullanıcı
  const [responseMessage, setResponseMessage] = useState(''); // Admin'in yanıtı

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

  const handleResponseSubmit = async (e) => {
    e.preventDefault();
    if (responseMessage.trim() === '') return;

    const adminResponse = {
      user: 'Admin',
      message: responseMessage,
      timestamp: new Date().toISOString(),
      role: 'admin',
      toUser: selectedUser, // Cevap verilecek kullanıcı
    };

    try {
      // Admin cevabını backend'e gönder
      await axios.post('/api/messages', adminResponse);
      setMessages((prevMessages) => [...prevMessages, adminResponse]); // Yeni mesajı ekle
      setResponseMessage(''); // Admin mesaj kutusunu temizle
    } catch (err) {
      console.error('Mesaj gönderilirken bir hata oluştu', err);
    }
  };

  const filterMessagesByUser = (user) => {
    return messages.filter((msg) => msg.user === user);
  };

  return (
    <div className="admin-support-container">
      <h1 className="admin-support-title">Admin Destek Paneli</h1>
      
      <div className="user-list">
        <h2>Kullanıcılar</h2>
        <ul>
          {/* Kullanıcıların listesi */}
          {[...new Set(messages.map((msg) => msg.user))].map((user, index) => (
            <li key={index} onClick={() => setSelectedUser(user)} className="user-list-item">
              {user}
            </li>
          ))}
        </ul>
      </div>

      {selectedUser && (
        <div className="user-messages">
          <h3>{selectedUser} ile sohbet</h3>
          <div className="messages-display">
            {filterMessagesByUser(selectedUser).map((msg, index) => (
              <div
                key={index}
                className={`message-bubble ${msg.role === 'user' ? 'user-message' : 'admin-message'}`}
              >
                <strong>{msg.role === 'user' ? 'Kullanıcı' : 'Admin'}:</strong> {msg.message}
                <div className="timestamp">{new Date(msg.timestamp).toLocaleString()}</div>
              </div>
            ))}
          </div>
          <form className="admin-response-form" onSubmit={handleResponseSubmit}>
            <textarea
              className="admin-response-textarea"
              value={responseMessage}
              onChange={(e) => setResponseMessage(e.target.value)}
              placeholder="Cevabınızı buraya yazın..."
            />
            <button className="admin-response-button" type="submit">
              Cevap Gönder
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminSupport;
