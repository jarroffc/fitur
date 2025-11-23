/*
  
  Sumber Fitur:
  https://whatsapp.com/channel/0029VbBoflt4dTnNWXV4zC09
  
  Api:
  https://api.elrayyxml.web.id
  
  Jangan hapus!
  
*/

import fetch from "node-fetch"
import FormData from "form-data"

async function uploadUguu(buffer, filename) {
  const form = new FormData()
  form.append("files[]", buffer, filename)
  const res = await fetch("https://uguu.se/upload.php", { method: "POST", body: form })
  const json = await res.json()
  return json.files?.[0]?.url || null
}

const handler = async (m, sock, { text, command, isBan }) => {
  if (isBan) return m.reply("kamu di ban")
  if (!text) return m.reply(`Example:\n.${command} username|text|like (reply foto)`)

  const [username, teks, like] = text.split("|")
  if (!username || !teks || !like)
    return m.reply(`Example:\n.${command} username|text|like (reply foto)`)

  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ""

  if (!/image/.test(mime))
    return m.reply("Kirim/Reply foto sebagai profil!")

  let buffer = await q.download()

  let avatarURL = await uploadUguu(buffer, "avatar.jpg")
  if (!avatarURL) return m.reply("Gagal upload foto ke Uguu!")

  await m.reply("Wait...")

  const link = `https://api.elrayyxml.web.id/api/maker/fakethreads?username=${encodeURIComponent(
    username
  )}&avatar=${encodeURIComponent(avatarURL)}&text=${encodeURIComponent(teks)}&count_like=${encodeURIComponent(
    like
  )}`

  let res = await fetch(link)
  let resultBuffer = Buffer.from(await res.arrayBuffer())

  await sock.sendMessage(
    m.chat,
    {
      image: resultBuffer,
      caption: `Result fake threads`
    },
    { quoted: m }
  )
}

handler.command = ["faketh", "fakethereads", "fth"]
export default handler