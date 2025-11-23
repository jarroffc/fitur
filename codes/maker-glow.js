/*

› Sumber Fitur:
https://whatsapp.com/channel/0029VbBoflt4dTnNWXV4zC09

› Api: https://api.nekolabs.web.id

Jangan di hapus!

*/

import fetch from "node-fetch";

const handler = async (m, sock, { text }) => {
  if (!text) return m.reply(`Ex:.ephoto jarr sigma`);
 m.reply("wait. . .")

  try {
    const api = `https://api.nekolabs.web.id/ephoto/advanced-glow?text=${encodeURIComponent(text)}`;
    const res = await fetch(api);

    if (!res.ok) throw await res.text();

    const buffer = await res.arrayBuffer();
    await sock.sendMessage(m.chat, { image: Buffer.from(buffer), caption: `Results\n› Text: ${text}` }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply("Error bang, API nya mungkin down.");
  }
};


handler.command = ["ephoto", "glow", "ephotoglow"];

export default handler;