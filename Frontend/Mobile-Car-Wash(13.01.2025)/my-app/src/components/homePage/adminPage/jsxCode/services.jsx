import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../cssCode/services.css';
 
function Services() {
  const [services, setServices] = useState([]); // All services
  const [newServiceName, setNewServiceName] = useState(''); // New service form data
  const [newPrice , setNewPrice] = useState('');
  const [editingService, setEditingService] = useState(null); // Editing service
  const [updatedServiceName, setUpdatedServiceName] = useState(''); // Updated service name
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Error messages
  const [successMessage, setSuccessMessage] = useState(''); // Success messages
 
  // Fetch all services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/CwServices'); // Fetch all services
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
 
    fetchServices();
  }, []);
 
  // Handle adding a new service
  const handleAddService = async (e) => {
    e.preventDefault();
 
    if (!newServiceName || !newPrice) {
      setErrorMessage('Please fill in the service name');
      return;
    }
 
    try {
      const response = await axios.post('/api/CwServices', {
        serviceName: newServiceName,
        price: newPrice,
        isActive: true,
      });
 
      setServices([...services, response.data]); // Add the new service to the list
      setNewServiceName(''); // Reset the form
      setNewPrice('');
      setSuccessMessage('Service added successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding service:', error);
      setErrorMessage('Failed to add service');
    }
  };
 
  // Handle deleting a service
  const handleDeleteService = async (serviceId) => {
    try {
      await axios.delete(`/api/CwServices/${serviceId}`);
      setServices(services.filter((service) => service.id !== serviceId)); // Remove the deleted service from the list
      setSuccessMessage('Service deleted successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error deleting service:', error);
      setErrorMessage('Failed to delete service');
    }
  };
 
  // Handle editing a service
  const handleEditService = (service) => {
    setEditingService(service);
    setUpdatedServiceName(service.serviceName);
    setUpdatedPrice(service.price);
  };
 
  const handleUpdateService = async () => {
    if (!updatedServiceName || !updatedPrice) {
      setErrorMessage('Service name cannot be empty');
      return;
    }
 
    try {
      const response = await axios.put(`/api/CwServices/${editingService.id}`, {
        ...editingService,
        serviceName: updatedServiceName,
        price: updatedPrice,
      });
      const updatedServices = await axios.get('/api/CwServices/');
      setServices(updatedServices.data)
 
      // setServices(
      //   services.map((service) =>
      //     service.id === editingService.id ? response.data : service
      //   )
      // );
      setEditingService(null);
      setUpdatedServiceName('');
      setUpdatedPrice('');
      setSuccessMessage('Service updated successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating service:', error);
      setErrorMessage('Failed to update service');
    }
  };
 
  return (
<div className="admin-service-container">
<h1>Service Management</h1>
 
      {/* Add new service form */}
<div className="add-service-form">
<form onSubmit={handleAddService}>
<input
            type="text"
            placeholder="Service Name"
            value={newServiceName}
            onChange={(e) => setNewServiceName(e.target.value)}
          />
<input
            type='number'
            placeholder='Service Price'
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
<button type="submit" className="add-service-button">
            Add Service
</button>
</form>
</div>
 
      {/* Display existing services */}
<h2>Available Services</h2>
      {services.length > 0 ? (
<table className="table table-hover">
<thead>
<tr>
<th scope="col">Service Name</th>
<th scope="col">Price</th>
<th scope="col">Actions</th>
</tr>
</thead>
<tbody>
            {services.map((service) => (
<tr key={service.id}>
<td>{service.serviceName}</td>
<td>{service.price} ₺</td>
<td>
<button
                    className="edit-button"
                    onClick={() => handleEditService(service)}
>
                    Edit
</button>
<button
                    className="delete-button"
                    onClick={() => handleDeleteService(service.id)}
>
                    Delete
</button>
</td>
</tr>
            ))}
</tbody>
</table>
      ) : (
<p>No services found</p>
      )}
 
      {/* Edit service form */}
      {editingService && (
<div className="edit-service-form">
<h2>Edit Service</h2>
<input
            type="text"
            value={updatedServiceName}
            onChange={(e) => setUpdatedServiceName(e.target.value)}
          />
<input
            type="number"
            value={updatedPrice}
            onChange={(e) => setUpdatedPrice(e.target.value)}
          />
<button onClick={handleUpdateService} className="save-button">
            Save Changes
</button>
<button onClick={() => setEditingService(null)} className="cancel-button">
            Cancel
</button>
</div>
      )}
 
      {/* Display messages */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
</div>
  );
}
 
export default Services;