import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTruckById, addTrip, deleteTrip } from "../api";
import "./styles/TruckDetails.css";

function TruckDetails() {
  const { id } = useParams();
  const [truck, setTruck] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cargo, setCargo] = useState("мазут"); // По умолчанию "мазут"
  const [destination, setDestination] = useState("Орловка"); // По умолчанию первый город
  const [driver, setDriver] = useState("Акимали"); // По умолчанию первый водитель
  const [payment, setPayment] = useState("");

  // 🔄 Функция загрузки данных о грузовике
  const loadTruckData = async () => {
    try {
      const data = await fetchTruckById(id);
      if (!data.trips) {
        data.trips = [];
      }
      setTruck(data);
    } catch (error) {
      console.error("Ошибка загрузки грузовика:", error);
    }
  };

  useEffect(() => {
    loadTruckData();
  }, [id]);

  if (!truck) return <div>Загрузка...</div>;

  // 🆕 **Добавление рейса**
  const handleAddTrip = async (e) => {
    e.preventDefault();

    if (!truck || !truck.id) {
      console.error("❌ Ошибка: Грузовик не найден.");
      return;
    }

    const newTrip = {
      date: new Date().toISOString().split("T")[0],
      destination,
      cargo,
      driver,
      payment: parseFloat(payment),
      truck: { id: truck.id },
    };

    console.log("📤 Попытка отправить рейс:", newTrip);

    try {
      await addTrip(newTrip);
      await loadTruckData(); // 🔄 Обновление данных после добавления рейса
      setShowModal(false);
      setCargo("мазут");
      setDestination("Орловка");
      setDriver("Акимали");
      setPayment("");
    } catch (error) {
      console.error("❌ Ошибка при добавлении рейса:", error);
    }
  };

  // ❌ **Удаление рейса**
  const handleDeleteTrip = async (tripId) => {
    if (!window.confirm("Вы уверены, что хотите удалить этот рейс?")) return;

    try {
      await deleteTrip(tripId);
      await loadTruckData(); // 🔄 Обновляем после удаления
    } catch (error) {
      console.error("❌ Ошибка при удалении рейса:", error);
    }
  };

  return (
    <div className="details-page">
      <div className="selected-truck-box">
        <div className="truck-info">
          <div className="gridModelCalibra">
            <div className="trackNumber">{truck.number}</div>
            <div className="calibrNum">Калибровка</div>
            <div className="gridgrid">
              <div className="trackMode">{truck.model}</div>
            </div>
            <div className="gridgrid2">
              <div className="trackCali">{truck.calibration}</div>
            </div>
          </div>
        </div>
      </div>

      <button className="add-trip-btn" onClick={() => setShowModal(true)}>
        Добавить рейс
      </button>
      <div className="trips-list">
        {truck.trips.length > 0 ? (
          truck.trips.map((trip) => (
            <div className="trip-card" key={trip.id}>
              <div className="trip-left">
              <div className="datas">дата</div>
                <div className="trip-date">{trip.date}</div>
                <div className="kuda">Куда</div>
                <div className="trip-dest">{trip.destination}</div>
              </div>
              <div className="trip-right">
                <div className="gruz">груз</div>
                <div className="trip-cargo">{trip.cargo}</div>
                <div className="trip-driver">{trip.driver}</div>
                <div className="trip-payment">
                    оплата: {trip.payment} c/л
                    <hr className="hrert"/>
                </div>
                <div className="summa"> сумма: {parseFloat(trip.payment) * parseFloat(truck.calibration)} </div>
                <button className="delete-btn-eert" onClick={() => handleDeleteTrip(trip.id)}>
                   Удалить
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Рейсов пока нет</p>
        )}
      </div>

      {/* 🆕 **Модалка добавления рейса** */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Добавить рейс</h2>
            <form onSubmit={handleAddTrip}>
              {/* Выпадающий список для выбора груза */}
              <label>Груз</label>
              <select value={cargo} onChange={(e) => setCargo(e.target.value)} required>
                <option value="мазут">Мазут</option>
                <option value="нефть">Нефть</option>
                <option value="другое">Другое</option>
              </select>

              {/* Выпадающий список для выбора города */}
              <label>Куда</label>
              <select value={destination} onChange={(e) => setDestination(e.target.value)} required>
                <option value="Орловка">Орловка</option>
                <option value="Беловодский">Беловодский</option>
                <option value="Сосновка">Сосновка</option>
                <option value="Кара-Балта">Кара-Балта</option>
                <option value="Ыссык-Кол">Ыссык-Кол</option>
                <option value="Кочкор-Ата">Кочкор-Ата</option>
              </select>

              {/* Выпадающий список для выбора водителя */}
              <label>Водитель</label>
              <select value={driver} onChange={(e) => setDriver(e.target.value)} required>
                <option value="Акимали">Акимали</option>
                <option value="Мирлан">Мирлан</option>
                <option value="Эльнур">Эльнур</option>
                <option value="Улан">Улан</option>
                <option value="Алтын">Алтын</option>
                <option value="Шухрат">Шухрат</option>
                <option value="Рысбек">Рысбек</option>
                <option value="Назан">Назан</option>
              </select>

              {/* Поле для ввода оплаты */}
              <label>Оплата (c/кг)</label>
              <input
                type="number"
                step="0.01"
                placeholder="Оплата (c/кг)"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                required
              />

              {/* Кнопки */}
              <button type="submit">Сохранить</button>
              <button type="button" onClick={() => setShowModal(false)}>Отмена</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TruckDetails;
