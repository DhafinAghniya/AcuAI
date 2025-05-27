export default class RegisterPage {
  async render() {
    return `
      <section class="auth-container">
        <h2 class="auth-title">Buat Akun Baru</h2>
        <form id="registerForm" class="auth-form">
          <label for="register-username">Username</label>
          <input type="text" id="register-username" name="username" required />

          <label for="register-email">Email</label>
          <input type="email" id="register-email" name="email" required />

          <label for="register-password">Password</label>
          <input type="password" id="register-password" name="password" required />

          <button type="submit" class="btn-filled blue">Daftar</button>
        </form>
        <p class="auth-switch">
          Sudah punya akun? <a href="#/">Masuk di sini</a>
        </p>
      </section>
    `;
  }

  async afterRender() {
    const form = document.getElementById('registerForm');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = form.username.value;
      const email = form.email.value;
      const password = form.password.value;
      alert(`Daftar dengan:\nUsername: ${username}\nEmail: ${email}\nPassword: ${password}`);
      // Tambahkan logic penyimpanan user di sini
    });
  }
}
