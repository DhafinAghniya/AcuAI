export default class ForumPage {
  async render() {
    return `
      <section class="container forum-page">
        <h2 class="center-title">Forum Diskusi</h2>
        <p>Selamat datang di forum diskusi! Di sini kamu bisa berbagi pengalaman, bertanya, atau berdiskusi seputar jerawat dan perawatan kulit bersama komunitas AcuAI.</p>
        
        <div class="forum-placeholder">
          <p><em>Fitur forum interaktif akan segera hadir.</em></p>
        </div>
      </section>
    `;
  }

  async afterRender() {
    // Interaksi tambahan nanti bisa ditambahkan di sini
  }
}
