import React, { useState, useEffect } from 'react';
import '../cssCode/userHomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function UserHomePage() {
  const [workers, setWorkers] = useState([]); // API'den gelen çalışanlar
  const [filteredWorkers, setFilteredWorkers] = useState([]); // Filtrelenmiş çalışanlar
  const [selectedLocation, setSelectedLocation] = useState(""); // Seçilen şehir
  const [selectedWorker, setSelectedWorker] = useState(null); // Seçilen çalışan
  const [availableDates, setAvailableDates] = useState([]); // Uygun tarihler
  const [availableServices, setAvailableServices] = useState([]); // Çalışanın hizmetleri
  const [selectedDate, setSelectedDate] = useState(""); // Seçilen tarih
  const [selectedTime, setSelectedTime] = useState(""); // Seçilen saat
  const [selectedService, setSelectedService] = useState(""); // Seçilen hizmet
  const [appointmentStatus, setAppointmentStatus] = useState(""); // Randevu durumu

  const userId = localStorage.getItem('userId'); // Login sonrası userId alınıyor

  // Çalışanları getirme
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get("/api/CwWorkers");
        setWorkers(response.data);
        setFilteredWorkers(response.data);
      } catch (error) {
        console.error("Çalışanlar yüklenirken hata oluştu:", error);
      }
    };
    fetchWorkers();
  }, []);

  // Seçilen lokasyona göre çalışanları filtreleme
  useEffect(() => {
    if (selectedLocation) {
      setFilteredWorkers(
        workers.filter((worker) => worker.location === selectedLocation)
      );
    } else {
      setFilteredWorkers(workers);
    }
  }, [selectedLocation, workers]);

  // Çalışanın hizmetlerini getirme
  const fetchWorkerServices = async (workerId) => {
    try {
      const response = await axios.get(`/api/CwWorkerServices`);
      const workerServices = response.data.filter(
        (ws) => ws.workerId === workerId
      );

      const servicePromises = workerServices.map((ws) =>
        axios.get(`/api/CwServices/${ws.serviceId}`)
      );
      const servicesResponses = await Promise.all(servicePromises);
      setAvailableServices(servicesResponses.map((res) => res.data));
    } catch (error) {
      console.error("Hizmetler çekilirken hata oluştu:", error.message);
    }
  };

  // Gelecek 7 günün tarihlerini oluşturma
  useEffect(() => {
    const generateNext7Days = () => {
      const dates = [];
      const today = new Date();
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(date.toISOString().split("T")[0]);
      }
      setAvailableDates(dates);
    };
    generateNext7Days();
  }, []);

  // Saatleri oluşturma
  const getAvailableTimes = () => {
    const times = [];
    for (let i = 10; i <= 19; i++) {
      times.push(`${i}:00`);
    }
    return times;
  };

  // Randevu oluşturma
  const handleAppointment = async () => {
  if (!selectedWorker || !selectedDate || !selectedTime || !selectedService) {
    alert("Lütfen tüm alanları doldurun.");
    return;
  }

  // ISO formatında tarih oluşturma
  const appointmentDate = new Date(`${selectedDate}T${selectedTime}:00`);
  const isoDate = appointmentDate.toISOString(); // ISO formatında tarih

  // Gönderilecek JSON verisi
  const requestData = {
    workerId: selectedWorker.id,
    userId: userId,
    appointmentDate: isoDate,
    status: "Beklemede",
    isActive: true,
  };

  try {
    console.log("Gönderilen veri:", requestData); // Debug için kontrol
    await axios.post(
      "/api/CwAppointments",
      requestData,
      { headers: { "Content-Type": "application/json" } }
    );

    setAppointmentStatus("Randevu başarıyla oluşturuldu.");
    setSelectedDate("");
    setSelectedTime("");
    setSelectedService("");
  } catch (error) {
    console.error("Randevu oluşturulurken hata oluştu:", error.response?.data || error.message);
    setAppointmentStatus("Randevu oluşturulamadı. Lütfen tekrar deneyin.");
  }
};

  return (
    <div>
      <h3>Konum Seçin:</h3>
      <select
        onChange={(e) => setSelectedLocation(e.target.value)}
        value={selectedLocation}
      >
        <option value="">Tüm Konumlar</option>
        {[...new Set(workers.map((worker) => worker.location))].map((location, index) => (
          <option key={index} value={location}>
            {location}
          </option>
        ))}
      </select>

      <div>
        <h3>Çalışanlar:</h3>
        <ul>
          {filteredWorkers.map((worker) => (
            <li key={worker.id}>
              <strong>{worker.username}</strong>
              <br />
              Konum: {worker.location}
              <br />
              Açıklama: {worker.description}
              <br />
              <button
                className="btn btn-primary mt-2"
                onClick={() => {
                  setSelectedWorker(worker);
                  fetchWorkerServices(worker.id);
                }}
                data-bs-toggle="modal"
                data-bs-target="#appointmentModal"
              >
                Randevu Al
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Randevu Modal */}
      <div
        className="modal fade"
        id="appointmentModal"
        aria-hidden="true"
        aria-labelledby="appointmentModalLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="appointmentModalLabel">
                Randevu Sistemi
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h6>Tarih Seçin:</h6>
              <select
                onChange={(e) => setSelectedDate(e.target.value)}
                value={selectedDate}
              >
                <option value="">Tarih Seçin</option>
                {availableDates.map((date, index) => (
                  <option key={index} value={date}>
                    {date}
                  </option>
                ))}
              </select>

              <h6>Saat Seçin:</h6>
              <select
                onChange={(e) => setSelectedTime(e.target.value)}
                value={selectedTime}
              >
                <option value="">Saat Seçin</option>
                {getAvailableTimes().map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>

              <h6>Hizmet Seçin:</h6>
              <select
                onChange={(e) => setSelectedService(e.target.value)}
                value={selectedService}
              >
                <option value="">Hizmet Türü Seçin</option>
                {availableServices.map((service, index) => (
                  <option key={index} value={service.serviceName}>
                    {service.serviceName}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={handleAppointment}
                data-bs-dismiss="modal"
              >
                Onayla
              </button>
            </div>
          </div>
        </div>
      </div>

      {appointmentStatus && (
        <div className="alert alert-info mt-3">{appointmentStatus}</div>
      )}
    </div>
  );
}

export default UserHomePage;
