/*
 
  Sumber Fitur:
https://whatsapp.com/channel/0029VbBoflt4dTnNWXV4zC09

Api:
https://api.elrayyxml.web.id

Jangan di hapus!

*/

import fetch from "node-fetch"

const handler = async (m, sock, { text, command, reply, isBan }) => {

  if (isBan) return await sock.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
  if (!text) return reply(`Example: *.${command}* teksnya`);
  
  const api = `https://api.elrayyxml.web.id/api/maker/bratanime?text=${encodeURIComponent(text)}`

  try {
    const res = await fetch(api)
    const contentType = res.headers.get("content-type")
    let imgUrl;
    if (contentType.includes("application/json")) {
      const json = await res.json()
      imgUrl = json.result || json.url || json.image
      if (!imgUrl) throw new Error("API tidak memberikan URL gambar")
    } 
    else {
      imgUrl = api
    }
    await sock.sendImageAsSticker(
      m.chat,
      imgUrl,
      m,
      { packname: "jarr", author: "setelah after" }
    )

  } catch (err) {
    reply("❌ Error: " + err.message)
  }

}

handler.command = ["animebrat","bratanim","bratanime"]
export default handler;