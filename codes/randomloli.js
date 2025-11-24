/*

 Sumber Fitur:
https://whatsapp.com/channel/0029VbBoflt4dTnNWXV4zC09

Api:
https://api-faa.my.id

Jangan di hapus 
*/

import fetch from "node-fetch"

const handler = async (m, sock, { reply, isBan, command, prefix }) => {

  if (isBan) return await sock.sendMessage(m.chat, { react: { text: '❌', key: m.key } })

  const api = "https://api-faa.my.id/faa/loli"

  try {
    let res = await fetch(api)
    let buffer = Buffer.from(await res.arrayBuffer())

    await sock.sendMessage(
      m.chat,
      {
        image: buffer,
        caption: `Result!\nKlik *next* untuk melihat lainya!`,
        buttons: [
          {
            buttonId: `${prefix}${command}`,
            buttonText: { displayText: "Next" },
            type: 1,
          }
        ],
        headerType: 4
      },
      { quoted: m }
    )

  } catch (e) {
    reply("❌ Error: " + e.message)
  }
}

handler.command = ["randomloli", "loli", "lol"]
export default handler