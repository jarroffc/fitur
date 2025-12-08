//Serba Serbi Buttons Interactive Message

 await sock.sendMessage(m.chat, {
 text: "cuma coba aja",
 footer: `baten ygy`,
 interactiveButtons: [
             {
                name: 'cta_copy',
                buttonParamsJson: JSON.stringify({
                    display_text: 'copy',
                    copy_code: 'aku jawa'
                })
              },
            {
                name: 'cta_catalog',
                buttonParamsJson: JSON.stringify({
                    business_phone_number: '6285700158613'
                })
              },
              {
                name: 'cta_call',
                buttonParamsJson: JSON.stringify({
                    display_text: 'call',
                    phone_number: '6285700158613'
                })
               },
            {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                    display_text: 'klik',
                    url: 'https://whatsapp.com/channel/0029VbBoflt4dTnNWXV4zC09',
                    merchant_url: 'https://whatsapp.com/channel/0029VbBoflt4dTnNWXV4zC09'
                })
            },
             {
                name: 'cta_reminder',
                buttonParamsJson: JSON.stringify({
                    display_text: 'https://whatsapp.com/channel/0029VbBoflt4dTnNWXV4zC09'
                })
            },
                        {
                name: 'address_message',
                buttonParamsJson: JSON.stringify({
                    display_text: '...'
                })
            },
            {
                name: 'send_location',
                buttonParamsJson: JSON.stringify({
                    display_text: '...'
                })
            },
            {
                name: 'open_webview',
                buttonParamsJson: JSON.stringify({
                    title: 'Follow Me!',
                    link: {
                        in_app_webview: true, // or false
                        url: 'https://whatsapp.com/channel/0029VbBoflt4dTnNWXV4zC09'
                    }
                })
            },
                        {
                name: 'cta_cancel_reminder',
                buttonParamsJson: JSON.stringify({
                    display_text: '...'
                })
            },

            {
               name: 'mpm',
               buttonParamsJson: JSON.stringify({
                  product_id: '8816262248471474'
               })
            },
            {
               name: 'wa_payment_transaction_details',
               buttonParamsJson: JSON.stringify({
                  transaction_id: '12345848'
               })
            },
            {
               name: 'automated_greeting_message_view_catalog',
               buttonParamsJson: JSON.stringify({
                   business_phone_number: '62000', 
                   catalog_product_id: '12345'
               })
            },
            ],
        }, 
     { quoted: m }
   )