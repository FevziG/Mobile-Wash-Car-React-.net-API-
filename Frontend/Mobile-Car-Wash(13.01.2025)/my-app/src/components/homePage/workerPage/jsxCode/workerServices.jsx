import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../cssCode/workerServices.css';

function WorkerServices() {
  const [allServices, setAllServices] = useState([]); // Tüm servisler
  const [workerServices, setWorkerServices] = useState([]); // Çalışanın mevcut servisleri
  const [selectedServices, setSelectedServices] = useState([]); // Yeni eklenmek istenen servisler
  const [statusMessage, setStatusMessage] = useState(''); // İşlem durumu mesajı

  const workerId = localStorage.getItem('workerId'); // Çalışan ID'si

  // Tüm servisleri ve çalışan servislerini yükle
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Tüm servisleri çek
        const servicesResponse = await axios.get('/api/CwServices');
        setAllServices(servicesResponse.data);

        // Çalışanın mevcut servislerini çek
        const workerServicesResponse = await axios.get('/api/CwWorkerServices', {
          params: { workerId: workerId },
        });
        const workerServicesWithNames = await Promise.all(
          workerServicesResponse.data.map(async (ws) => {
            const service = await axios.get(`/api/CwServices/${ws.serviceId}`);
            return {
              ...ws,
              serviceName: service.data.serviceName,
            };
          })
        );
        setWorkerServices(workerServicesWithNames);
      } catch (error) {
        console.error('Veriler yüklenirken hata oluştu:', error);
      }
    };

    fetchData();
  }, [workerId]);

  // Yeni servis seçme işlemi
  const handleServiceSelect = (serviceId) => {
    // Eğer servis zaten eklenmişse, seçime izin verme
    const alreadyExists = workerServices.some(
      (workerService) => workerService.serviceId === serviceId
    );

    if (alreadyExists) {
      setStatusMessage('Bu servis zaten eklenmiş.');
      setTimeout(() => setStatusMessage(''), 3000); // Mesajı 3 saniye sonra temizle
      return;
    }

    // Seçilmişler arasında varsa kaldır, yoksa ekle
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId)); // Servisi kaldır
    } else {
      setSelectedServices([...selectedServices, serviceId]); // Servisi ekle
    }
  };

  // Seçilen servisleri kaydet
  const saveSelectedServices = async () => {
    try {
      const requests = selectedServices.map((serviceId) => {
        return axios.post('/api/CwWorkerServices', {
          workerId: workerId,
          serviceId: serviceId,
          isActive: true,
        });
      });

      await Promise.all(requests); // Tüm post isteklerini paralel çalıştır
      setStatusMessage('Servisler başarıyla kaydedildi.');
      setSelectedServices([]); // Seçilen servisleri sıfırla
      window.location.reload(); // Sayfayı yenileyerek servisleri güncelle
    } catch (error) {
      console.error('Servisler kaydedilirken hata oluştu:', error);
      setStatusMessage('Servisler kaydedilemedi. Lütfen tekrar deneyin.');
    }
  };

  // Çalışanın sahip olduğu servislerin id'lerini al
  const workerServiceIds = workerServices.map(service => service.serviceId);

  return (
    <div className="worker-services-container">
      <h2>Mevcut Servislerim</h2>
      {workerServices.length > 0 ? (
        <ul className="list-group">
          {workerServices.map((service) => (
            <li key={service.serviceId} className="list-group-item">
              {service.serviceName}
            </li>
          ))}
        </ul>
      ) : (
        <p>Henüz bir servisiniz bulunmamaktadır.</p>
      )}

      <h2>Yeni Servis Ekle</h2>
      {allServices.length > 0 ? (
        <ul className="list-group">
          {allServices
            .filter(service => !workerServiceIds.includes(service.id)) // Çalışanın sahip olmadığı servisleri göster
            .map((service) => (
              <li
                key={service.id}
                className={`list-group-item ${
                  selectedServices.includes(service.id) ? 'active' : ''
                }`}
                onClick={() => handleServiceSelect(service.id)}
              >
                {service.serviceName}
              </li>
            ))}
        </ul>
      ) : (
        <p>Servisler yükleniyor...</p>
      )}

      <button
        className="btn btn-primary mt-3"
        onClick={saveSelectedServices}
        disabled={selectedServices.length === 0}
      >
        Kaydet
      </button>
      {statusMessage && <div className="alert alert-info mt-3">{statusMessage}</div>}
    </div>
  );
}

export default WorkerServices;
