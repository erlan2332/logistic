const API_URL = "http://localhost:8080/api"; // URL бэкенда

// 🚚 Получить список всех грузовиков
export const fetchTrucks = async () => {
  try {
    const response = await fetch(`${API_URL}/trucks`);
    if (!response.ok) throw new Error(`Ошибка загрузки грузовиков: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Ошибка при получении списка грузовиков:", error);
    return [];
  }
};

// 🚚 Получить грузовик по ID
export const fetchTruckById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/trucks/${id}`);
    if (!response.ok) throw new Error(`Грузовик не найден: ${response.status}`);
    const data = await response.json();
    if (!data.trips) data.trips = [];
    return data;
  } catch (error) {
    console.error("Ошибка при получении грузовика:", error);
    return null;
  }
};

// 🚚 Добавить новый грузовик
export const addTruck = async (truckData) => {
  try {
    const response = await fetch(`${API_URL}/trucks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(truckData),
    });

    if (!response.ok) throw new Error(`Ошибка при добавлении грузовика: ${response.status}`);

    return response.json();
  } catch (error) {
    console.error("Ошибка при добавлении грузовика:", error);
    throw error;
  }
};

// 🚚 Удалить грузовик по ID
export const deleteTruck = async (id) => {
  try {
    const response = await fetch(`${API_URL}/trucks/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error(`Ошибка при удалении грузовика: ${response.status}`);
    
    return true;
  } catch (error) {
    console.error("Ошибка при удалении грузовика:", error);
    return false;
  }
};

// 🚚 Обновить информацию о грузовике
export const updateTruck = async (id, truckData) => {
  try {
    const response = await fetch(`${API_URL}/trucks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(truckData),
    });

    if (!response.ok) throw new Error(`Ошибка при обновлении грузовика: ${response.status}`);

    return response.json();
  } catch (error) {
    console.error("Ошибка при обновлении грузовика:", error);
    throw error;
  }
};

// 📌 Получить список всех рейсов
export const fetchTrips = async () => {
  try {
    const response = await fetch(`${API_URL}/trips`);
    if (!response.ok) throw new Error(`Ошибка загрузки рейсов: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Ошибка при получении рейсов:", error);
    return [];
  }
};

// 📌 Добавить новый рейс
export const addTrip = async (tripData) => {
    console.log("📤 Отправка запроса на сервер:", JSON.stringify(tripData, null, 2));
  
    const response = await fetch(`${API_URL}/trips`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tripData),
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Ошибка API (Статус ${response.status}):`, errorText);
      throw new Error(`Ошибка API: ${response.status} - ${errorText}`);
    }
  
    return response.json();
  };
  

// 📌 Удалить рейс по ID
export const deleteTrip = async (id) => {
  try {
    const response = await fetch(`${API_URL}/trips/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error(`Ошибка при удалении рейса: ${response.status}`);
    
    return true;
  } catch (error) {
    console.error("Ошибка при удалении рейса:", error);
    return false;
  }
};
