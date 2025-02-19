import React, { useState } from "react";
import "./styles/HistoryPage.css";

function HistoryPage({ trucks = [] }) {
  const [filterDate, setFilterDate] = useState("");
  const [filterNumber, setFilterNumber] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" (по возрастанию), "desc" (по убыванию)

  // Получаем все рейсы с добавленной информацией о номере грузовика и оплате
  const allTrips =
    trucks.length > 0
      ? trucks.flatMap((truck) =>
          truck.trips
            ? truck.trips.map((trip) => ({
                ...trip,
                truckNumber: truck.number,
                totalPayment: (parseFloat(trip.payment) * parseFloat(truck.calibration)).toFixed(2), // Вычисляем оплату
              }))
            : []
        )
      : [];

  // Фильтрация данных
  const filteredTrips = allTrips.filter((trip) => {
    if (filterDate && trip.date !== filterDate) return false;
    if (filterNumber && !trip.truckNumber.includes(filterNumber)) return false;
    return true;
  });

  // Сортировка по дате
  const sortedTrips = [...filteredTrips].sort((a, b) => {
    return sortOrder === "asc"
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="history-page-container">
      <h2 className="history-title">История рейсов</h2>

      {/* Фильтры */}
      <div className="filters-container">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="filter-input"
        />
        <input
          type="text"
          placeholder="Номер авто"
          value={filterNumber}
          onChange={(e) => setFilterNumber(e.target.value)}
          className="filter-input"
        />
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="sort-button"
        >
          {sortOrder === "asc" ? "🔼 По дате ↑" : "🔽 По дате ↓"}
        </button>
      </div>

      {/* Список рейсов */}
      {sortedTrips.length > 0 ? (
        sortedTrips.map((trip, idx) => (
          <div key={idx} className="trip-card">
            <div><strong>Дата:</strong> {trip.date}</div>
            <div><strong>Куда:</strong> {trip.destination}</div>
            <div><strong>№ Авто:</strong> {trip.truckNumber}</div>
            <div><strong>Груз:</strong> {trip.cargo}</div>
            <div><strong>Водитель:</strong> {trip.driver}</div>
            <div><strong>Оплата за рейс:</strong> {trip.totalPayment} $</div>
          </div>
        ))
      ) : (
        <p className="no-trips-message">Нет рейсов для отображения 🚚</p>
      )}
    </div>
  );
}

export default HistoryPage;
