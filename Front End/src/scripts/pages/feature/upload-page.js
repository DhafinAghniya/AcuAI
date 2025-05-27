export default class UploadPage {
  async render() {
    return `
      <section class="container upload-page">
        <h1 class="upload-title">Temukan Solusi<br>Jerawatmu Sekarang</h1>
        <p class="upload-subtitle">
          Ambil langkah pertama menuju kulit lebih sehat.<br>
          Aktifkan kamera, ambil foto, dan dapatkan analisis jerawat otomatis<br>
          dari teknologi AcuAI.
        </p>

        <div class="upload-actions">
          <button id="toggleCamera" class="btn-outline">Aktifkan Kamera</button>
          <button id="capturePhoto" class="btn-outline" disabled>Ambil Foto</button>
        </div>

        <div class="camera-preview">
          <video id="cameraVideo" autoplay playsinline hidden></video>
          <canvas id="photoCanvas" width="640" height="480" hidden></canvas>
          <img id="preview" src="images/default-preview.jpg" alt="Preview Kamera" />
        </div>

        <div class="upload-button-wrapper">
          <input type="file" id="photoInput" hidden accept="image/png, image/jpeg" />
          <label for="photoInput" class="btn-filled blue">Upload Foto Manual</label>
        </div>

        <div class="upload-instructions">
          <ul>
            <li><span class="number">1</span> Gambar harus jelas dan tanpa filter</li>
            <li><span class="number">2</span> Wajah menghadap kamera secara langsung</li>
            <li><span class="number">3</span> Format: JPG, JPEG, PNG</li>
            <li><span class="number">4</span> Resolusi minimal 640 × 480 piksel</li>
            <li><span class="number">5</span> Ukuran maksimal 5 MB</li>
          </ul>
        </div>

        <div class="submit-analysis">
          <button class="btn-filled blue">Analisis</button>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const toggleCameraBtn = document.getElementById('toggleCamera');
    const capturePhotoBtn = document.getElementById('capturePhoto');
    const video = document.getElementById('cameraVideo');
    const canvas = document.getElementById('photoCanvas');
    const preview = document.getElementById('preview');
    const photoInput = document.getElementById('photoInput');

    let stream = null;
    let cameraActive = false;

    toggleCameraBtn.addEventListener('click', async () => {
      if (!cameraActive) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          video.srcObject = stream;
          video.hidden = false;
          toggleCameraBtn.textContent = 'Matikan Kamera';
          capturePhotoBtn.disabled = false;
          cameraActive = true;
        } catch (err) {
          alert('Tidak dapat mengakses kamera.');
          console.error(err);
        }
      } else {
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
        video.hidden = true;
        toggleCameraBtn.textContent = 'Aktifkan Kamera';
        capturePhotoBtn.disabled = true;
        cameraActive = false;
      }
    });

    capturePhotoBtn.addEventListener('click', () => {
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/png');
      preview.src = imageData;
      preview.alt = 'Foto dari Kamera';
    });

    photoInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        preview.src = URL.createObjectURL(file);
        preview.alt = 'Foto yang Diunggah';
      }
    });
  }
}
