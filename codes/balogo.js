/*
  ** Sumber: https://whatsapp.com/channel/0029VbBoflt4dTnNWXV4zC09

  ** jngn lupa npm install ba-logo

  Jangan hps sumber yah ajng 🥰 
*/

import fs from "fs";
import baLogo from "ba-logo";

const handler = async (m, sock, { text, command, reply, example, args, isBan }) => {
  try {
    if (isBan) return await sock.sendMessage(m.chat, { react: { text: "❌", key: m.key } });

    if (!args[0])
      return reply(`*Cara Penggunaan :*\n.${command} JarrOfficial`);

    const input = args.join(" ").trim();

    await reply("Wait. . .");

    const image = await baLogo(input);
    const buffer = await image.toBuffer(); 

    await sock.sendMessage(
      m.chat,
      {
        image: buffer,
        caption: `Berhasil membuat logo dengan tulisan: *${input}*`,
      },
      { quoted: m }
    );
  } catch (e) {
    console.error("[ba-logo Handler Error]", e);
    reply(`❌ *Ups, gagal membuat logo!*\n\nDetail: ${e.message || e}`);
  }
};

handler.command = ["balogo", "logo","buatlogo"];
export default handler;