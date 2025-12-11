/*
 Upload code to Github 
 Share by Jarr 
 
 Sumber share: https://whatsapp.com/channel/0029VbBoflt4dTnNWXV4zC09
 
 Upload code to Github 
 Jangan lupa sesuaikan dengan scrip mu ya
*/

import axios from "axios";

const githubToken = ""; //ubah token Github mu
const owner = ""; //username Github mu 
const repo = "fitur";
const branch = "main";

async function ensureRepoExists() {
  try {
    await axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Authorization: `Bearer ${githubToken}` },
    });
  } catch (e) {
    if (e.response?.status === 404) {
      await axios.post(
        `https://api.github.com/user/repos`,
        { name: repo, private: false },
        { headers: { Authorization: `Bearer ${githubToken}` } }
      );
    } else throw e;
  }
}

async function uploadCode(filename, content) {
  await ensureRepoExists();

  const path = `codes/${filename}`;
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const base64Content = Buffer.from(content, "utf-8").toString("base64");

  let sha = null;
  try {
    const res = await axios.get(apiUrl, {
      headers: { Authorization: `Bearer ${githubToken}` },
    });
    sha = res.data.sha;
  } catch (_) {}

  const body = {
    message: `Upload or update file ${filename}`,
    content: base64Content,
    branch,
  };
  if (sha) body.sha = sha;

  await axios.put(apiUrl, body, {
    headers: { Authorization: `Bearer ${githubToken}` },
  });

  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
}

const handler = async (m, { sock, args, reply, isOwner, command, usedPrefix }) => {
  try {
    if (!isOwner) return reply(mess.owner)
    const text = m.quoted?.text?.trim();  
    
    if (!m.quoted || !text)  
  return reply(`*Penggunaan:*
- ${usedPrefix+command} nama file (reply kode)

*Contoh:*
- ${usedPrefix+command} tess.js (reply kode nya)`);

    if (!args[0])
      return reply(`${usedPrefix+ command} nama file (dengan reply kode)`);

    const filename = args[0].trim();

    if (!/^[\w.\-]+$/.test(filename))
      return reply("Nama file tidak valid (hindari spasi & simbol aneh)");

    reply("Wait. . .")

    const url = await uploadCode(filename, text);

await sock.sendMessage(m.chat, {
text: `*Successfully!*

- File name: *${filename}*
- Raw Url: ${url}`,
interactiveButtons: [
        { 
           name: 'cta_copy', 
               buttonParamsJson: JSON.stringify({
                 display_text: 'Copy URL',
                 copy_code: `${url}`
               })
           }
       ],
 footer: global.namaBot
 }, { quoted: m });
  } catch (err) {
    console.error("UploadCode Error:", err);
    reply("❌ Gagal upload kode: " + err.message);
  }
};

handler.command = ["upcode"];
export default handler;