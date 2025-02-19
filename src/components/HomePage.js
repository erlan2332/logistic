// src/components/HomePage.jsx
import React from 'react';
import './styles/HomePage.css';

function HomePage() {
  // Пример данных для демонстрации
  // height: высота столбца (px)
  // brand: надпись внутри (volvo, renault, man, ...)
  // color: фоновый цвет (green, black, grey)
  const barsData = [
    { brand: 'volvo', color: 'green', height: 120 },
    { brand: 'volvo', color: 'green', height: 160 },
    { brand: 'volvo', color: 'green', height: 100 },
    { brand: 'volvo', color: 'green', height: 180 },
    { brand: 'volvo', color: 'green', height: 130 },
    { brand: 'volvo', color: 'green', height: 110 },
    { brand: 'RENAULT', color: 'grey', height: 90 },
    { brand: 'MAN', color: 'black', height: 130 },
    { brand: 'MAN', color: 'black', height: 130 }
  ];

  // Пример общего числа рейсов (50)
  const totalTrips = 50;

  return (
    <div className="home-container">
      {/* Чёрная "кнопка" с надписью "Главная" и стрелкой */}
      <div className="home-header">
        <div className="home-dropdown">
          Главная <span className="arrow">▼</span>
        </div>
      </div>

      {/* Текст "график kpa" */}
      <p className="chart-title">график kpa</p>

      {/* Контейнер со столбцами */}
      <div className="bars-chart">
        {barsData.map((bar, index) => (
          <div
            key={index}
            className="bar"
            style={{
              height: bar.height + 'px',
              backgroundColor: bar.color === 'grey' ? '#ccc' :
                              bar.color === 'black' ? '#000' : '#4caf50'
            }}
          >
            <span className="bar-text">{bar.brand}</span>
          </div>
        ))}
      </div>

      {/* "рейсов совершено..." */}
      <p className="trips-count">
        рейсов совершено за этот месяц <span>{totalTrips}</span>
      </p>
    </div>
  );
}

export default HomePage;
