<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>About - Jarr 🎧</title>

  <!-- 🌐 Open Graph (Facebook, WhatsApp, LinkedIn) -->
  <meta property="og:title" content="Profil — Jarr Officiall">
  <meta property="og:description" content="Why do I always fail?">
  <meta property="og:image" content="https://raw.githubusercontent.com/Bell575/dat4/main/uploads/4bb17a-1761018845598.jpg">
  <meta property="og:url" content="https://xjarr.vercel.app/">
  <meta property="og:type" content="website">

  <!-- 🐦 Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Profil — Jarr Officiall">
  <meta name="twitter:description" content="Why do I always fail?">
  <meta name="twitter:image" content="https://raw.githubusercontent.com/Bell575/dat4/main/uploads/4bb17a-1761018845598.jpg">

  <!-- 💡 SEO -->
  <meta name="description" content="Why do I always fail?">
  <meta name="author" content="Jarr Officiall">

  <style>
    /* (style kamu tetap sama seperti sebelumnya) */
    body {
      margin: 0;
      font-family: 'Inter', Arial, sans-serif;
      background: url("https://raw.githubusercontent.com/Bell575/dat4/main/uploads/c71550-1761018432236.jpg") no-repeat center center/cover;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-attachment: fixed;
      position: relative;
      overflow: hidden;
    }

    body::before {
      content: "";
      position: absolute;
      inset: 0;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      background-color: rgba(0, 0, 0, 0.25);
      z-index: 0;
    }

    .card {
      position: relative;
      z-index: 1;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 16px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
      max-width: 600px;
      width: 90%;
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 20px;
      backdrop-filter: blur(8px);
    }

    .logo {
      width: 90px;
      height: 90px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
      flex-shrink: 0;
    }

    .logo img { width: 100%; height: 100%; object-fit: cover; }

    h1 { margin: 0 0 6px; color: #0a2544; font-size: 20px; }
    p { margin: 0 0 14px; color: #1a1a1a; }

    .buttons { display: flex; flex-wrap: wrap; gap: 10px; }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      color: white;
      text-decoration: none;
      transition: 0.25s;
      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    }

    .btn:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 6px 14px rgba(0,0,0,0.25); }
    .btn.whatsapp { background: #25D366; }
    .btn.telegram { background: #0088cc; }
    .btn.channel { background: #128C7E; }
    .btn.youtube { background: #FF0000; }
    .btn svg { width: 18px; height: 18px; fill: white; }

    footer {
      position: relative;
      z-index: 1;
      margin-top: 24px;
      color: #fff;
      font-size: 14px;
      opacity: 0.85;
      text-align: center;
      padding-bottom: 12px;
    }

    @media (max-width: 600px) {
      .card { flex-direction: column; text-align: center; }
      .buttons { justify-content: center; }
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">
      <img src="https://raw.githubusercontent.com/Bell575/dat4/main/uploads/4bb17a-1761018845598.jpg" alt="Logo" />
    </div>

    <div class="content">
      <h1>Hii Welcome!</h1>
      <p><strong>My name is Jarr Officiall</strong>, berikut ini adalah beberapa informasi tentang saya:</p>

      <div class="buttons">
        <a href="https://wa.me/6285876485652" target="_blank" class="btn whatsapp">WhatsApp</a>
        <a href="https://t.me/jarroffc2" target="_blank" class="btn telegram">Telegram</a>
        <a href="https://whatsapp.com/channel/0029VbAbEkb5Ejy7jjjG7p3H" target="_blank" class="btn channel">Saluran WA</a>
        <a href="https://youtube.com/@jarroffc" target="_blank" class="btn youtube">YouTube</a>
      </div>
    </div>
  </div>

  <footer>© Powered By <strong>Jarr Officiall</strong></footer>
</body>
</html>