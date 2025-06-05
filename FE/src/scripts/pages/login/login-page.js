import api from "../../data/api"; // pastikan ini sudah mengarah ke file api.js

export default class LoginPage {
  async render() {
    return `
      <section class="auth-container">
        <h2 class="auth-title">Masuk ke Akunmu</h2>
        <form id="loginForm" class="auth-form">
          <label for="login-email">Email</label>
          <input type="email" id="login-email" name="email" required />

          <label for="login-password">Password</label>
          <input type="password" id="login-password" name="password" required />

          <button type="submit" class="btn-filled blue">Login</button>
        </form>
        <p class="auth-switch">
          Belum punya akun? <a href="#/register">Daftar di sini</a>
        </p>
      </section>
    `;
  }

  async afterRender() {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = form.email.value;
      const password = form.password.value;

      try {
        const response = await api.login(email, password);
        localStorage.setItem("token", response.token); // simpan token
        alert("Login berhasil!");
        window.location.href = "#/home"; // ganti sesuai halaman setelah login
      } catch (error) {
        alert("Login gagal: " + error.message);
        console.error("Login error:", error);
      }
    });
  }
}
