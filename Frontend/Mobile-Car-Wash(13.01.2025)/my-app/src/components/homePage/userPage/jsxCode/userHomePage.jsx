
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../cssCode/userHomePage.css';
import axios from 'axios';

function UserHomePage() {
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [workerAppointments, setWorkerAppointments] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [appointmentStatus, setAppointmentStatus] = useState('');
  const [workerFeedbacks, setWorkerFeedbacks] = useState([]); // Çalışanın yorumları

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get('/api/CwWorkers');
        setWorkers(response.data);
        setFilteredWorkers(response.data);
      } catch (error) {
        console.error('Çalışanlar yüklenirken hata oluştu:', error);
      }
    };

    fetchWorkers();
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      setFilteredWorkers(
        workers.filter((worker) => worker.location === selectedLocation)
      );
    } else {
      setFilteredWorkers(workers);
    }
  }, [selectedLocation, workers]);

  const fetchWorkerServices = async (workerId) => {
    try {
      const response = await axios.get('/api/CwWorkerServices');
      const workerServices = response.data.filter((ws) => ws.workerId === workerId);

      const servicePromises = workerServices.map((ws) =>
        axios.get(`/api/CwServices/${ws.serviceId}`)
      );
      const servicesResponses = await Promise.all(servicePromises);
      setAvailableServices(servicesResponses.map((res) => res.data));

      const appointmentResponse = await axios.get(`/api/CwAppointments?workerId=${workerId}`);
      setWorkerAppointments(appointmentResponse.data);
    } catch (error) {
      console.error('Hizmetler veya randevular çekilirken hata oluştu:', error.message);
    }
  };

  const fetchWorkerFeedbacks = async (workerId) => {
    try {
      const response = await axios.get(`/api/CwFeedbacks/worker/${workerId}`);
      setWorkerFeedbacks(response.data);
    } catch (error) {
      console.error('Çalışan yorumları alınırken hata oluştu:', error.message);
    }
  };

  const updateAvailableTimes = () => {
    if (!selectedDate) {
      setAvailableTimes([]);
      return;
    }

    const reservedTimes = workerAppointments
      .filter(
        (appointment) =>
          appointment.appointmentDate.startsWith(selectedDate) &&
          appointment.status !== 'Reddedildi'
      )
      .map((appointment) => new Date(appointment.appointmentDate).getHours());

    const times = [];
    for (let hour = 10; hour <= 20; hour++) {
      if (!reservedTimes.includes(hour)) {
        times.push(`${hour}:00`);
      }
    }
    setAvailableTimes(times);
  };

  useEffect(() => {
    updateAvailableTimes();
  }, [selectedDate, workerAppointments]);

  useEffect(() => {
    const generateNext7Days = () => {
      const dates = [];
      const today = new Date();
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(date.toISOString().split('T')[0]);
      }
      setAvailableDates(dates);
    };
    generateNext7Days();
  }, []);

  const handleAppointment = async () => {
    if (!selectedWorker || !selectedDate || !selectedTime || !selectedService) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }

    const [hour, minute] = selectedTime.split(':');
    const appointmentDate = new Date(selectedDate);
    appointmentDate.setHours(parseInt(hour), parseInt(minute), 0);

    const timezoneOffset = appointmentDate.getTimezoneOffset() * 60000;
    const localDateTime = new Date(appointmentDate.getTime() - timezoneOffset).toISOString();

    const requestData = {
      workerId: selectedWorker.id,
      userId: userId,
      appointmentDate: localDateTime,
      status: 'Beklemede',
      isActive: true,
    };

    try {
      await axios.post('/api/CwAppointments', requestData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setAppointmentStatus('Randevu başarıyla oluşturuldu.');
      setSelectedDate('');
      setSelectedTime('');
      setSelectedService('');
      fetchWorkerServices(selectedWorker.id);
    } catch (error) {
      console.error('Randevu oluşturulurken hata oluştu:', error.response?.data || error.message);
      setAppointmentStatus('Randevu oluşturulamadı. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="user-homepage-container">
      <h3>Konum Seçin:</h3>
      <select
        onChange={(e) => setSelectedLocation(e.target.value)}
        value={selectedLocation}
        className="form-select"
      >
        <option value="">Tüm Konumlar</option>
        {[...new Set(workers.map((worker) => worker.location))].map((location, index) => (
          <option key={index} value={location}>
            {location}
          </option>
        ))}
      </select>

      <h3>Çalışanlar:</h3>
      <ul>
        {filteredWorkers.map((worker) => (
          <li key={worker.id}>
            Worker name: <strong>{worker.username}</strong>
            <br />
            Location: {worker.location}
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
            <button
              className="btn btn-info mt-2 "
              onClick={() => fetchWorkerFeedbacks(worker.id)}
              data-bs-toggle="modal"
              data-bs-target="#feedbackModal"
            >
              Yorumları Gör
            </button>
          </li>
        ))}
      </ul>

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
                className="form-select"
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
                className="form-select"
              >
                <option value="">Saat Seçin</option>
                {availableTimes.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>

              <h6>Hizmet Seçin:</h6>
              <select
                onChange={(e) => setSelectedService(e.target.value)}
                value={selectedService}
                className="form-select"
              >
                <option value="">Hizmet Türü Seçin</option>
                {availableServices.map((service, index) => (
                  <option key={index} value={service.serviceName}>
                    {`${service.serviceName}-${service.price} ₺`}
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

      {/* Feedback Modal */}
      <div
        className="modal fade"
        id="feedbackModal"
        aria-hidden="true"
        aria-labelledby="feedbackModalLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="feedbackModalLabel">
                Çalışan Yorumları
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {workerFeedbacks.length > 0 ? (
                <ul>
                  {workerFeedbacks.map((feedback, index) => (
                    <li key={index}>
                      <strong>Puan:</strong> {feedback.rating}
                      <br />
                      <strong>Yorum:</strong> {feedback.feedbackText}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Bu çalışana ait yorum bulunmamaktadır.</p>
              )}
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
