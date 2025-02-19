import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTrucks, addTruck, deleteTruck, updateTruck } from "../api";
import "./styles/TrucksList.css";

function TrucksList() {
  const [trucks, setTrucks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTruck, setEditingTruck] = useState(null);

  const [number, setNumber] = useState("");
  const [model, setModel] = useState("");
  const [calibration, setCalibration] = useState("");

  useEffect(() => {
    fetchTrucks().then(setTrucks);
  }, []);

  // 🔵 Функция для добавления/обновления грузовика
  const handleSaveTruck = async (e) => {
    e.preventDefault();
    const truckData = { number, model, calibration };

    try {
      if (editingTruck) {
        // Обновление существующего грузовика
        const updatedTruck = await updateTruck(editingTruck.id, truckData);
        setTrucks((prev) =>
          prev.map((truck) => (truck.id === updatedTruck.id ? updatedTruck : truck))
        );
      } else {
        // Добавление нового грузовика
        const savedTruck = await addTruck(truckData);
        setTrucks((prev) => [...prev, savedTruck]);
      }
      closeModal();
    } catch (error) {
      console.error("Ошибка при сохранении грузовика:", error);
    }
  };

  // 🔴 Функция удаления грузовика
  const handleDeleteTruck = async (id) => {
    if (!window.confirm("Вы уверены, что хотите удалить этот грузовик?")) return;
    
    try {
      await deleteTruck(id);
      setTrucks((prev) => prev.filter((truck) => truck.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении грузовика:", error);
    }
  };

  // ✏ Открытие модального окна для редактирования
  const handleEditTruck = (truck) => {
    setEditingTruck(truck);
    setNumber(truck.number);
    setModel(truck.model);
    setCalibration(truck.calibration);
    setShowModal(true);
  };

  // Закрытие модального окна
  const closeModal = () => {
    setShowModal(false);
    setEditingTruck(null);
    setNumber("");
    setModel("");
    setCalibration("");
  };

  return (
    <div className="trucks-list-container">
      <div className="header-section">
        <div className="bgc-title">
          <h1 className="main-title">Машины-рейсы</h1>
        </div>
        <button className="add-button" onClick={() => setShowModal(true)}>
          + Добавить машину
        </button>
      </div>

      <div className="trucks-grid">
        {trucks.map((truck) => (
          <div key={truck.id} className="truck-card">
            <Link to={`/trucks/${truck.id}`} className="truck-info">
              <div className="truck-number">{truck.number}</div>
              <div className="truck-model">{truck.model}</div>
              <div className="calibration-section">
                <span className="calibration-label"></span>
                <span className="calibration-value">{truck.calibration}</span>
                 
              </div>
            </Link>
            <div className="truck-actions">
              <button className="edit-btn" onClick={() => handleEditTruck(truck)}> Редактировать</button>
              <button className="delete-btn" onClick={() => handleDeleteTruck(truck.id)}> Удалить</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">{editingTruck ? "Редактировать машину" : "Добавить машину"}</h2>
            <form onSubmit={handleSaveTruck} className="truck-form">
              <input type="text" placeholder="Номер" value={number} onChange={(e) => setNumber(e.target.value)} required />
              <input type="text" placeholder="Модель" value={model} onChange={(e) => setModel(e.target.value)} required />
              <input type="text" placeholder="Калибровка" value={calibration} onChange={(e) => setCalibration(e.target.value)} required />
              <button type="submit">{editingTruck ? "Сохранить изменения" : "Сохранить"}</button>
              <button type="button" onClick={closeModal}>Отмена</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrucksList;