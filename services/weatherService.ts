import axios from 'axios';

// Replace with your actual API key from weatherapi.com
const WEATHER_API_KEY = '4e2aa4d0aedc47d2a0912516251106';
const WEATHER_BASE_URL = 'https://api.weatherapi.com/v1';

export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
  };
}

export interface ForecastData {
  current: WeatherData['current'];
  location: WeatherData['location'];
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
        daily_chance_of_rain: number;
      };
      hour: Array<{
        time: string;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
        };
        chance_of_rain: number;
        humidity: number;
        wind_kph: number;
      }>;
    }>;
  };
}

class WeatherService {
  private apiKey: string;

  constructor() {
    this.apiKey = WEATHER_API_KEY;
  }
  // Get current weather by coordinates
  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await axios.get(
        `${WEATHER_BASE_URL}/current.json?key=${this.apiKey}&q=${lat},${lon}&aqi=no`,
      );
      console.log('Current weather response:', response.data);

      return response.data;
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  }  // Get weather forecast by coordinates
  async getWeatherForecast(
    lat: number,
    lon: number,
    days: number = 7,
  ): Promise<ForecastData> {
    try {      const response = await axios.get(
        `${WEATHER_BASE_URL}/forecast.json?key=${this.apiKey}&q=${lat},${lon}&days=${days}&aqi=no&alerts=no`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      throw error;
    }
  }
  // Get hourly weather forecast by coordinates
  async getHourlyForecast(
    lat: number,
    lon: number,
    hours: number = 24,
  ): Promise<ForecastData> {
    try {
      const response = await axios.get(
        `${WEATHER_BASE_URL}/forecast.json?key=${this.apiKey}&q=${lat},${lon}&hours=${hours}&aqi=no&alerts=no`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching hourly weather forecast:', error);
      throw error;
    }
  }
  // Search location by name
  async searchLocation(query: string) {
    try {
      const response = await axios.get(
        `${WEATHER_BASE_URL}/search.json?key=${this.apiKey}&q=${query}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error searching location:', error);
      throw error;
    }
  }
}

export default new WeatherService();
