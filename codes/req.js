/*
  ** created by Jarr
  ** join https://whatsapp.com/channel/0029VbBoflt4dTnNWXV4zC09
  ** api https://api.zenzxz.my.id

  #dont delete!
*/

import fetch from 'node-fetch'
const ch = "120363420360528990@newsletter" // ID Saluran / Channel tujuan

function maskNumber(num = '') {
  if (!num) return 'Tidak diketahui'
  if (num.length <= 6) return num.replace(/.(?=.$)/g, '*')
  const start = num.slice(0, 5)
  const end = num.slice(-4)
  return `${start}****${end}`
}

const handler = async (m, sock, { args, isBan, isOwner, command, prefix }) => {
  try {
    if (isBan)
      return await sock.sendMessage(m.chat, { react: { text: '❌', key: m.key } })

    if (!m.isGroup) return m.reply(mess.group)

    const text = (args || []).join(' ').trim()
    if (!text)
      return await sock.sendMessage(
        m.chat,
        { text: `Gunakan: ${prefix + command} <text>` },
        { quoted: m }
      )

    const url = `https://api.zenzxz.my.id/api/maker/ustadz?text=${encodeURIComponent(
      text
    )}`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Node.js) UstadzPlugin/1.0'
      }
    })

    if (!res.ok) {
      const errText = await res.text().catch(() => '')
      return await sock.sendMessage(
        m.chat,
        { text: `Gagal meminta API: ${res.status} ${res.statusText}\n${errText}` },
        { quoted: m }
      )
    }

    const arrayBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const senderName = m.pushName || 'Tanpa Nama' 
    const senderNum = m.sender?.split('@')[0] || ''
    const maskedNum = maskNumber(senderNum)

    let groupSubject = 'Unknown Group'
    let groupId = m.chat
    try {
      const metadata =
        (await sock.groupMetadata?.(m.chat)) ||
        (await sock.groupGet?.(m.chat)) ||
        null
      if (metadata) {
        groupSubject = metadata.subject || metadata.name || groupSubject
        groupId = metadata.id || groupId
      } else if (m.isGroup && m.pushName && m.chat) {
        groupId = m.chat
      }
    } catch (e) {
  }

    const waktu = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })

    const captionToChannel = `*Message Info ⭐*
    
- 🏷️ Dari Group : *${groupSubject}*
- 🔖 Group ID : ${groupId}
- 📛 Nama pengirim : ${senderName}
- 📱 Nomor pengirim : ${maskedNum}
- 🕒 Waktu : ${waktu}`

    await sock.sendMessage(ch, {
      image: buffer,
      caption: captionToChannel
    })

    const confirmText = 'Request berhasil dikirim ke saluran!'
    await sock.sendMessage(m.chat, { text: confirmText }, { quoted: m })

  } catch (err) {
    console.error('error:', err)
    try {
      await sock.sendMessage(
        m.chat,
        { text: `Terjadi error: ${err.message || err}` },
        { quoted: m }
      )
    } catch (_) {}
  }
}

handler.command = ['req', 'kritik', 'reqfitur']

export default handler