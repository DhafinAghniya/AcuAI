// src/scripts/data/api.js
import CONFIG from "../config";

class ApiClient {
  constructor() {
    this.baseUrl = CONFIG.BASE_URL;
  }

  async _fetch(method, endpoint, data = null, includeAuth = true) {
    const url = this.baseUrl + endpoint;
    const headers = { ...CONFIG.DEFAULT_HEADERS };

    if (includeAuth) {
      const token = localStorage.getItem("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const config = {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    };

    try {
      const response = await fetch(url, config);
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Request failed");
      }

      return responseData;
    } catch (error) {
      console.error(`API Error [${method} ${endpoint}]:`, error);
      throw error;
    }
  }

  // Auth Endpoints
  async register(username, email, password) {
    return this._fetch("POST", "/api/auth/register", { username, email, password }, false);
  }

  async login(email, password) {
    return this._fetch("POST", "/api/auth/login", { email, password }, false);
  }

  // Skin Analysis Endpoints
  async analyzeSkin(imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile);

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const response = await fetch(this.baseUrl + "/analysis", {
      method: "POST",
      headers,
      body: formData,
    });

    return this._handleResponse(response);
  }

  // Forum Endpoints
  async createPost(content) {
    return this._fetch("POST", "/forum/posts", { content });
  }

  async getPosts() {
    return this._fetch("GET", "/forum/posts");
  }

  // Helper untuk handling FormData
  async _handleResponse(response) {
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || "Request failed");
      error.response = data;
      throw error;
    }

    return data;
  }
}

export default new ApiClient();
