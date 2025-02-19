import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import "./styles/MainPage.css"; // Подключаем стили

function MainPage({ trucks = [] }) {
  // Группируем количество рейсов по номерам грузовиков
  const tripsCountByTruck =
    trucks.length > 0
      ? trucks.reduce((acc, truck) => {
          const truckNumber = truck.number || "Неизвестно";
          acc[truckNumber] = (acc[truckNumber] || 0) + (truck.trips?.length || 0);
          return acc;
        }, {})
      : {};

  const chartData = Object.entries(tripsCountByTruck).map(([number, count]) => ({
    number,
    shortNumber: number.slice(-4), // Оставляем последние 4 цифры номера
    trips: count,
  }));

  // Вычисляем максимальное количество рейсов
  const maxTrips = Math.max(...chartData.map((d) => d.trips));

  const totalTrips = chartData.reduce((sum, item) => sum + item.trips, 0);

  // Рассчитываем общий доход за месяц
  const totalIncome = trucks.reduce((sum, truck) => {
    return sum + truck.trips.reduce((truckSum, trip) => {
      return truckSum + (parseFloat(trip.payment) * parseFloat(truck.calibration));
    }, 0);
  }, 0);

  return (
    <div className="main-page-container">
      <h1 className="main-titleert">Главная</h1>

      <div className="chart-container">
        <h2 className="chart-title">График KPA</h2>

        <ResponsiveContainer width="100%" height={320}> {/* ✅ Изменил width на 100% */}
  <BarChart data={chartData} barGap={-5} barCategoryGap={2}>  {/* ✅ Уменьшил ещё больше */}
    <XAxis 
      dataKey="shortNumber"
      tick={{ fill: "#000", fontWeight: "bold", fontSize: 14 }}
      axisLine={false} 
      tickLine={false}
    />
    <YAxis hide />
    <Tooltip 
      contentStyle={{ 
        background: "#fff", 
        border: "1px solid #4CAF50", 
        borderRadius: "8px", 
        fontSize: "12px"
      }} 
      formatter={(value, name, props) => [`${value} рейсов`, `Грузовик: ${props.payload.number}`]} 
    />
    <Bar 
      dataKey="trips" 
      radius={[20, 20, 20, 20]} 
      barSize={35}  // ✅ Делаем уже, чтобы влезало больше столбцов
      fill="black"
    >
      <LabelList 
        dataKey="trips" 
        position="insideBottom" 
        fill="white" 
        fontSize={16} 
        fontWeight="bold"
      />
      {chartData.map((entry, index) =>
        entry.trips === maxTrips ? (
          <Bar 
            key={index}
            dataKey="trips"
            radius={[20, 20, 20, 20]} 
            barSize={35}  // ✅ Чтобы максимальный столбец не был шире
            fill="#4CAF50"
          />
        ) : null
      )}
    </Bar>
  </BarChart>
</ResponsiveContainer>



      </div>

      <div className="brand-stats">
        {chartData.map((item) => (
          <div key={item.number} className="brand-card">
            <div className="brand-title">{item.number}</div>
            <div className="brand-trips">{item.trips} рейсов</div>
          </div>
        ))}
      </div>

      <div className="summary-container">
        <p className="summary-text">
          Рейсов совершено за этот месяц: 
          <span className="summary-highlight">
            {new Intl.NumberFormat('ru-RU').format(totalTrips)}
          </span>
        </p>

        <p className="summary-text">
           Общий доход за месяц: 
          <span className="summary-highlight">
            {totalIncome.toFixed(2)} С 
          </span>
        </p>
      </div>
    </div>
  );  
}

export default MainPage;
