/*

   › sumber : https://whatsapp.com/channel/0029VbBoflt4dTnNWXV4zC09
   › API: https://api.elrayyxml.web.id

Jangan di hps

*/

import fetch from "node-fetch";

let handler = async (m, { sock, text, reply, command, usedPrefix, isBan }) => {
  if (isBan) return reply("lu di ban")
  if (!text) return reply(`Ex: ${usedPrefix + command} url`);

  try {
    const api = await fetch(
      `https://api.elrayyxml.web.id/api/downloader/applemusic?url=${encodeURIComponent(text)}`
    );

    if (!api.ok) return reply(`API Error ${api.status}`);

    const json = await api.json();
    if (!json.status || !json.result) return reply("Tidak ada hasil.");

    const { name, album_name, type, artist, thumbnail, duration, url } = json.result;

    const audioRes = await fetch(url);
    if (!audioRes.ok) return reply("Gagal mengambil audio.");

    const buffer = Buffer.from(await audioRes.arrayBuffer());

    await sock.sendMessage(
      m.chat,
      {
        audio: buffer,
        mimetype: "audio/mp4",
        ptt: false,
        contextInfo: {
          externalAdReply: {
            title: name,
            body: artist,
            thumbnailUrl: thumbnail,
            sourceUrl: text,
            mediaUrl: text,
            mediaType: 1,
            renderLargerThumbnail: true,
            showAdAttribution: true,
          }
        }
      },
      { quoted: m }
    );

  } catch (err) {
    console.error(err);
    reply("❌ Terjadi error.");
  }
};

handler.command = ["appledl", "applemusicdl", "appledownload", "apple", "aple"];
export default handler;