/*
  ** created by Jarr
  ** join https://whatsapp.com/channel/0029VbBoflt4dTnNWXV4zC09
  ** api https://api.zenzxz.my.id

  #dont delete!
*/

import fetch from 'node-fetch'
const ch = "120363420360528990@newsletter" // ID Saluran / Channel tujuan

const handler = async (m, sock, { args, isBan, isOwner, command }) => {
  try {
  
    if (isBan) return await sock.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    if (!m.isGroup) return m.reply("Jika ingin pakai fitur ini join:\nhttps://chat.whatsapp.com/LGbxmgibQ9A4hjqPfsjMQg?mode=wwt")
    const text = (args || []).join(' ').trim()
    if (!text) {
      return await sock.sendMessage(m.chat, { text: `Gunakan: ${prefix + command} <text>` }, { quoted: m })
    }

    const url = `https://api.zenzxz.my.id/api/maker/ustadz?text=${encodeURIComponent(text)}`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Node.js) UstadzPlugin/1.0'
      }
    })

    if (!res.ok) {
      const errText = await res.text().catch(() => '')
      return await sock.sendMessage(m.chat, { text: `Gagal meminta API: ${res.status} ${res.statusText}\n${errText}` }, { quoted: m })
    }

    const arrayBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const senderName = m.pushName || 'Tanpa Nama'
    const senderNum = m.sender?.split('@')[0] || 'Tidak diketahui'

    const caption = `*Message Info 🌻*

- 📛 Nama pengirim: ${senderName}
- 📱 Nomor pengirim: ${senderNum}
- 💬 Pesan: *${text}*

© ${global.namaBot}`

    await sock.sendMessage(ch, { image: buffer, caption })

    await sock.sendMessage(m.chat, { text: 'Pesan berhasil di kirim!' }, { quoted: m })

  } catch (err) {
    console.error('ustadz plugin error:', err)
    try {
      await sock.sendMessage(m.chat, { text: `Terjadi error: ${err.message || err}` }, { quoted: m })
    } catch (_) {}
  }
}

handler.command = ['req', 'kritik', 'reqfitur']

export default handler