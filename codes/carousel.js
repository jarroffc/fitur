/*

Buttons Carousel 🗿
Join La https://whatsapp.com/channel/0029VbBoflt4dTnNWXV4zC09

Itu url foto nya tinggal ganti aja brok sama itu button interactive message juga bisa di ganti ganti kalian kreasi kan aja udah

*/
import { generateWAMessageFromContent, proto, prepareWAMessageMedia } from "@whiskeysockets/baileys";

async function createCard(text, imageUrl) {
  return {
    header: proto.Message.InteractiveMessage.Header.create({
      ...(await prepareWAMessageMedia(
        { image: { url: imageUrl } },
        { upload: sock.waUploadToServer }
      )),
      gifPlayback: false, //kalo true jadi gif
      hasMediaAttachment: false
    }),

    body: { text },

    nativeFlowMessage: {
      buttons: [
        {
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            display_text: "Kirim pesan",
            url: `https://wa.me/${global.owner}?text=Hai+Owner`,
            merchant_url: "https://whatsapp.com"
          })
        }
      ]
    }
  };
}

let msg = generateWAMessageFromContent(
  m.chat,
  {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          body: { text: "salam kenal aku gue" },

          carouselMessage: {
            cards: [
              await createCard(`Iki siji`, `${global.fotoBot}`),
              await createCard(`iki loro`, `${global.fotoBot}`),
              await createCard(`iki telu`, `${global.fotoBot}`),
            ],
            messageVersion: 1
          }
        }
      }
    }
  },
  {}
);

await sock.relayMessage(msg.key.remoteJid, msg.message, {
  messageId: msg.key.id
});