export default class LoginPage {
  async render() {
    return `
      <section class="auth-container">
        <h2 class="auth-title">Masuk ke Akunmu</h2>
        <form id="loginForm" class="auth-form">
          <label for="login-username">Username</label>
          <input type="text" id="login-username" name="username" required />

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
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = form.username.value;
      const password = form.password.value;
      alert(`Login dengan:\nUsername: ${username}\nPassword: ${password}`);
      // Tambahkan logic autentikasi di sini
    });
  }
  
}
