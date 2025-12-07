/* 

  Sumber Fitur:
- https://whatsapp.com/channel/0029VbBoflt4dTnNWXV4zC09

API:
- https://api.nekolabs.web.id

Jangan hapus!

*/

import fetch from "node-fetch";

let handler = async (m, { sock, args, usedPrefix, isBan }) => {
    if (isBan) return m.reply("lu di ban dek");

    if (args.length < 2) {
        return m.reply(`*How to use:*
› ${usedPrefix}ssweb <device> <url>

*Example:*
› ${usedPrefix}ssweb mobile https://google.com

*Available device:*
› desktop
› mobile
› tablet`);
    }

    const device = args[0].toLowerCase();
    const url = args[1];

    const valid = ["desktop", "mobile", "tablet"];

    if (!valid.includes(device))
        return m.reply(`Device tidak valid!\nPilih: ${valid.join(", ")}`);

    m.reply("Wait...");

    const api = `https://api.nekolabs.web.id/tools/ssweb?url=${encodeURIComponent(
        url
    )}&device=${device}`;

    const r = await fetch(api);
    const json = await r.json().catch(() => null);

    if (!json || !json.success || !json.result) {
        return m.reply("Gagal mengambil screenshot.");
    }

    await sock.sendMessage(
        m.chat,
        {
            image: { url: json.result },
            caption: `*SCREENSHOT WEBSITE 🌐*\n- Device: *${device}*\n- URL: ${url}`,
        },
        { quoted: m }
    );
};

handler.command = ["ssweb"];
export default handler;