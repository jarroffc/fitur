/*
Sumber Fitur 
- https://whatsapp.com/channel/0029VbBoflt4dTnNWXV4zC09
Api
- https://api.elrayyxml.web.id

Jangan hps bng
*/

import fetch from "node-fetch";
import FormData from "form-data";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

async function uploadUguu(fileOrBuffer, filename) {
  const form = new FormData();
  if (typeof fileOrBuffer === "string" && fs.existsSync(fileOrBuffer)) {
    form.append("files[]", fs.createReadStream(fileOrBuffer), { filename });
  } else {
    form.append("files[]", fileOrBuffer, { filename });
  }

  const res = await fetch("https://uguu.se/upload.php", { method: "POST", body: form });
  if (!res.ok) throw new Error(`Uguu upload failed: ${res.status} ${res.statusText}`);
  const json = await res.json();
  return json.files?.[0]?.url || null;
}

let handler = async (m, { sock, reply, usedPrefix, command, isBan }) => {
  try {
    if (isBan) return m.reply("lu di ban");

    const q = m.quoted ? m.quoted : m;
    const mime = q?.mimetype || "";
    if (!mime.startsWith("image")) return reply(`Ex: ${usedPrefix + command} reply/kirim foto nya`);

    const mediaPath = await sock.downloadAndSaveMediaMessage(q);

    if (!mediaPath || typeof mediaPath !== "string") {
      return reply("❌ Gagal download media.");
    }

    let uploadUrl;
    try {
      uploadUrl = await uploadUguu(mediaPath, "image.jpg");
    } catch (err) {
      console.error("Uguu upload error:", err);
      try { fs.unlinkSync(mediaPath); } catch (e) {}
      return reply("❌ Upload ke Uguu gagal: " + (err.message || "unknown"));
    }

    if (!uploadUrl) {
      try { fs.unlinkSync(mediaPath); } catch (e) {}
      return reply("❌ Upload ke Uguu gagal: tidak ada URL kembali.");
    }

    reply("Wait. . .");

    const apiRes = await fetch(`https://api.elrayyxml.web.id/api/tools/removebg?url=${encodeURIComponent(uploadUrl)}`, {
      method: "GET",
      headers: { "User-Agent": "WhatsAppBot/1.0" }
    });

    if (!apiRes.ok) {
      const txt = await apiRes.text().catch(()=>"<no body>");
      console.error("removebg api error:", apiRes.status, apiRes.statusText, txt);
      try { fs.unlinkSync(mediaPath); } catch (e) {}
      return reply(`❌ API removebg gagal: ${apiRes.status} ${apiRes.statusText}\n${txt}`);
    }
    const ct = apiRes.headers.get("content-type") || "";
    const arrBuf = await apiRes.arrayBuffer();
    const buffer = Buffer.from(arrBuf);

    // hapus file sementara
    try { fs.unlinkSync(mediaPath); } catch (e) {}

    if (ct.startsWith("image/")) {
      await sock.sendMessage(
        m.chat,
        { image: buffer, caption: "*Background* successfully removed" },
        { quoted: m }
      );
      return;
    } else {
      const txt = buffer.toString("utf8").slice(0, 1000);
      console.error("removebg non-image response:", txt);
      return reply("❌ API removebg mengembalikan bukan image. Response:\n" + txt);
    }

  } catch (e) {
    console.error(e);
    return reply("❌ Terjadi error internal.");
  }
};

handler.command = ['removebg', 'rmbg', 'rbg'];
export default handler;