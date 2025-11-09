import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import path from 'path'
import { fileTypeFromBuffer } from 'file-type'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function uploadCatbox(buffer, ext) {
    const tempFilePath = path.join(__dirname, `${Math.floor(Math.random() * 10000)}.${ext}`)
    fs.writeFileSync(tempFilePath, buffer)

    const data = new FormData()
    data.append('reqtype', 'fileupload')
    data.append('userhash', '')
    data.append('fileToUpload', fs.createReadStream(tempFilePath))

    try {
        const response = await axios.post('https://catbox.moe/user/api.php', data, {
            headers: {
                ...data.getHeaders(),
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/json'
            }
        })
        fs.unlinkSync(tempFilePath)
        return { status: 'Done', result: response.data.trim() }
    } catch (error) {
        fs.unlinkSync(tempFilePath)
        return { status: 'error', result: 'Gagal mengunggah ke Catbox' }
    }
}

const handler = async (m, { conn, usedPrefix, command }) => {
    const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || m.mimetype || ''
    if (!mime) return m.reply(`Kirim atau reply media dengan caption *${usedPrefix + command}*`)

    m.reply("Tunggu sebentar...")

    try {
        const media = await q.download()
        if (!media) throw 'error download media'

        const type = await fileTypeFromBuffer(media)
        if (!type) throw 'failed'

        const upload = await uploadCatbox(media, type.ext)
        if (upload.status !== 'Done') throw upload.result

        await m.reply(`*Berhasil Upload*\n\nURL: ${upload.result}`)
    } catch (err) {
        console.error(err)
m.reply(`error: ${err?.message || err}`)
    }
}

handler.command = ['tourl']
handler.tags = ['tools']
handler.help = ['tourl <reply media>']
export default handler