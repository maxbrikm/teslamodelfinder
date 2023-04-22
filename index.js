(async()=>{
    // default imports
    const events = require('events');
    const { exec } = require("child_process")
    const logs = require("discord-logs")
    const Discord = require("discord.js")
    const { 
        MessageEmbed, 
        MessageButton, 
        MessageActionRow, 
        Intents, 
        Permissions, 
        MessageSelectMenu 
    }= require("discord.js")
    const fs = require('fs');
    let process = require('process');
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // block imports
    const os = require("os-utils");
    let https = require("https")
    const paginationEmbed = require('discord-pagination-fixed');
    
    // define s4d components (pretty sure 90% of these arnt even used/required)
    let s4d = {
        Discord,
        fire:null,
        joiningMember:null,
        reply:null,
        player:null,
        manager:null,
        Inviter:null,
        message:null,
        notifer:null,
        checkMessageExists() {
            if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
            if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
        }
    };

    // check if d.js is v13
    if (!require('./package.json').dependencies['discord.js'].startsWith("^13.")) {
      let file = JSON.parse(fs.readFileSync('package.json'))
      file.dependencies['discord.js'] = '^13.12.0'
      fs.writeFileSync('package.json', JSON.stringify(file))
      exec('npm i')
      throw new Error("Seems you arent using v13 please re-run or run `npm i discord.js@13.12.0`");
    }

    // check if discord-logs is v2
    if (!require('./package.json').dependencies['discord-logs'].startsWith("^2.")) {
      let file = JSON.parse(fs.readFileSync('package.json'))
      file.dependencies['discord-logs'] = '^2.0.0'
      fs.writeFileSync('package.json', JSON.stringify(file))
      exec('npm i')
      throw new Error("discord-logs must be 2.0.0. please re-run or if that fails run `npm i discord-logs@2.0.0` then re-run");
    }

    // create a new discord client
    s4d.client = new s4d.Discord.Client({
        intents: [
            Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)
        ],
        partials: [
            "REACTION", 
            "CHANNEL"
        ]
    });

    // when the bot is connected say so
    s4d.client.on('ready', () => {
        console.log(s4d.client.user.tag + " is alive!")
    })

    // upon error print "Error!" and the error
    process.on('uncaughtException', function (err) {
        console.log('Error!');
        console.log(err);
    });

    // give the new client to discord-logs
    logs(s4d.client);

    // pre blockly code
    

    // blockly code
    function colourRgb(r, g, b) {
      r = Math.max(Math.min(Number(r), 100), 0) * 2.55;
      g = Math.max(Math.min(Number(g), 100), 0) * 2.55;
      b = Math.max(Math.min(Number(b), 100), 0) * 2.55;
      r = ('0' + (Math.round(r) || 0).toString(16)).slice(-2);
      g = ('0' + (Math.round(g) || 0).toString(16)).slice(-2);
      b = ('0' + (Math.round(b) || 0).toString(16)).slice(-2);
      return '#' + r + g + b;
    }
    
    
    await s4d.client.login((process.env[String('TOKEN')])).catch((e) => {
            const tokenInvalid = true;
            const tokenError = e;
            if (e.toString().toLowerCase().includes("token")) {
                throw new Error("An invalid bot token was provided!")
            } else {
                throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
            }
        });
    
    const http = require('http');
    const server = http.createServer((req, res) => {
        res.writeHead(200);
        res.end('Replit Hosting Webserver Link');
    });
    server.listen(3000);
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == '-teslacommand') {
        (s4dmessage.channel).send({ content: String('Select a Option: '),
        components:[(new MessageActionRow()
            .addComponents(
            new MessageSelectMenu()
            .setCustomId('main-menu')
            .setPlaceholder('Make a Choose: ')
            .setMaxValues(1)
            .setMinValues(1)
            .setDisabled()
    
    
            .addOptions(  {
          value:'tesla-model-s-button',
          label:'Model S',
          emoji:'<:letter_s:879733517418897419>',
          description:'Tesla',
          default:false,},
          {
          value:'tesla-model-3-button',
          label:'Model 3',
          emoji:'<:number_3:879733517506977862>',
          description:'Tesla',
          default:false,},
          {
          value:'tesla-model-x-button',
          label:'Model X',
          emoji:'<:letter_x:879733517490221066>',
          description:'Tesla',
          default:false,},
          {
          value:'tesla-model-y-button',
          label:'Model Y',
          emoji:'<:letter_y:879733517012070411>',
          description:'Tesla',
          default:false,},
        ))
        )]}).then(async m=>{
                          let collector = m.createMessageComponentCollector({filter: i=>i.user.id === (s4dmessage.author).id ,time:60000});
              collector.on('collect',async i=>{
                    if ((i.customId) == 'main-menu' && (i.values[0]) == 'tesla-model-s-button') {
              await i.update({ content: String('Select a Option: '),components:[(new MessageActionRow()
                  .addComponents(
                  new MessageSelectMenu()
                  .setCustomId('main-menu')
                  .setPlaceholder('Make a Choose: ')
                  .setMaxValues(1)
                  .setMinValues(1)
                  .setDisabled()
    
    
                  .addOptions(  {
                value:'tesla-model-s-button',
                label:'Model S',
                emoji:'<:letter_s:879733517418897419>',
                description:'Tesla',
                default:false,},
                {
                value:'tesla-model-3-button',
                label:'Model 3',
                emoji:'<:number_3:879733517506977862>',
                description:'Tesla',
                default:false,},
                {
                value:'tesla-model-x-button',
                label:'Model X',
                emoji:'<:letter_x:879733517490221066>',
                description:'Tesla',
                default:false,},
                {
                value:'tesla-model-y-button',
                label:'Model Y',
                emoji:'<:letter_y:879733517012070411>',
                description:'Tesla',
                default:false,},
              ))
              )]}).then(async m=>{
                                paginationEmbed((s4dmessage), (
                            embeds: [new MessageEmbed()
                .setTitle(String('__**Powered by Tesla Model Finder**__'))
                .setColor(String((colourRgb(100, 0, 0))))
                .setImage(String('https://media.discordapp.net/attachments/848483779865739344/884855825720565801/PSX_20210907_193931.jpg'))
                .setDescription(String(('Specifications:' + '\n' +
                '' + '\n' +
                'Long Range:' + '\n' +
                'Acceleration 3,2s Weight 2.069 kg Price 86.990€ Dimensions 4.970 mm L x 1.964 mm B x 1.445 mm H Range 652km Top Speed 250kph' + '\n' +
                '' + '\n' +
                'Plaid:' + '\n' +
                'Acceleration 2,1s Weight 2.162 kg Price 126.990€ Dimensions 4.970 mm L x 1.964 mm B x 1.445 mm H Range 628km Top Speed 322kph')))
                .setFooter(String((String(new Date()))))
                .setThumbnail(String('https://media.discordapp.net/attachments/848483779865739344/868411639362375720/left-pointing-magnifying-glass_1f50d.png'))
                            ]
                    ,
                            embeds: [new MessageEmbed()
                .setTitle(String('__**Powered by Tesla Model Finder**__'))
                .setColor(String((colourRgb(100, 0, 0))))
                .setImage(String('https://media.discordapp.net/attachments/848483779865739344/884855825720565801/PSX_20210907_193931.jpg'))
                .setDescription(String(('General Stuff:' + '\n' +
                'Outside Color: White,Black,Gray,Blue,Red Inside Color: Black or White or Beige Autopilot: Full Self Driving or Enhanced Autopilot or Standard Trailer hitch: Canceled (Not Available anymore) Trunk Volume: 793 Liters Seats: 5 CW value: 0.208 Cd Peak Charging Rate: DC=250KW / AC= 22KW')))
                .setFooter(String((String(new Date()))))
                .setThumbnail(String('https://media.discordapp.net/attachments/848483779865739344/868411639362375720/left-pointing-magnifying-glass_1f50d.png'))
                            ]
                    ), [''<:icons_leftarrow:860123643816312852>'', ''<:icons_rightarrow:859388126653186058>''],0);
    
                          });
            }
            if ((i.customId) == 'main-menu' && (i.values[0]) == 'tesla-model-3-button') {
              await i.update({ content: String('Select a Option:'),components:[(new MessageActionRow()
                  .addComponents(
                  new MessageSelectMenu()
                  .setCustomId('main-menu')
                  .setPlaceholder('Make a Choose: ')
                  .setMaxValues(1)
                  .setMinValues(1)
                  .setDisabled()
    
    
                  .addOptions(  {
                value:'tesla-model-s-button',
                label:'Model S',
                emoji:'<:letter_s:879733517418897419>',
                description:'Tesla',
                default:false,},
                {
                value:'tesla-model-3-button',
                label:'Model 3',
                emoji:'<:number_3:879733517506977862>',
                description:'Tesla',
                default:false,},
                {
                value:'tesla-model-x-button',
                label:'Model X',
                emoji:'<:letter_x:879733517490221066>',
                description:'Tesla',
                default:false,},
                {
                value:'tesla-model-y-button',
                label:'Model Y',
                emoji:'<:letter_y:879733517012070411>',
                description:'Tesla',
                default:false,},
              ))
              )]}).then(async m=>{
                                paginationEmbed((s4dmessage), (
                            embeds: [new MessageEmbed()
                .setTitle(String('__**Powered by Tesla Model Finder**__'))
                .setColor(String((colourRgb(0, 0, 0))))
                .setImage(String('https://media.discordapp.net/attachments/848483779865739344/884855826093862932/PSX_20210907_193837.jpg'))
                .setDescription(String(('Specifications:' + '\n' +
                '' + '\n' +
                'Standard Range Plus:' + '\n' +
                'Acceleration 5,6s Weight 1.745 kg Price 39.990€ Dimensions 4.694 mm L x 1.849 mm W x 1.443 mm H Range 448km Top Speed 225kph' + '\n' +
                '' + '\n' +
                'Long Range:' + '\n' +
                'Acceleration 4,4s Weight 1.844 kg Price 49.990€ Dimensions 4.694 mm L x 1.849 mm W x 1.443 mm H Range 614km Top Speed 233kph' + '\n' +
                '' + '\n' +
                'Performance:' + '\n' +
                'Acceleration 3,2s Weight 1.844 kg Price 54.990€ Dimensions 4.694 mm L x 1.849 mm W x 1.443 mm H Range 567km Top Speed 261kph')))
                .setFooter(String((String(new Date()))))
                .setThumbnail(String('https://media.discordapp.net/attachments/848483779865739344/868411639362375720/left-pointing-magnifying-glass_1f50d.png'))
                            ]
                    ,
                            embeds: [new MessageEmbed()
                .setTitle(String('__**Powered by Tesla Model Finder**__'))
                .setColor(String((colourRgb(0, 0, 0))))
                .setImage(String('https://media.discordapp.net/attachments/848483779865739344/884855826093862932/PSX_20210907_193837.jpg'))
                .setDescription(String(('General Stuff:' + '\n' +
                'Outside Color: White,Black,Gray,Blue,Red Inside Color: Black or White Autopilot: Full Self Driving or Enhanced Autopilot or Standard Trailer hitch: Canceled (Not Available anymore) Trunk Volume: 542 Liters Seats: 5')))
                .setFooter(String((String(new Date()))))
                .setThumbnail(String('https://media.discordapp.net/attachments/848483779865739344/868411639362375720/left-pointing-magnifying-glass_1f50d.png'))
                            ]
                    ), [''<:icons_leftarrow:860123643816312852>'', ''<:icons_rightarrow:859388126653186058>''],0);
    
                          });
            }
            if ((i.customId) == 'main-menu' && (i.values[0]) == 'tesla-model-x-button') {
              await i.update({ content: String('Select a Option:'),components:[(new MessageActionRow()
                  .addComponents(
                  new MessageSelectMenu()
                  .setCustomId('main-menu')
                  .setPlaceholder('Make a Choose: ')
                  .setMaxValues(1)
                  .setMinValues(1)
                  .setDisabled()
    
    
                  .addOptions(  {
                value:'tesla-model-s-button',
                label:'Model S',
                emoji:'<:letter_s:879733517418897419>',
                description:'Tesla',
                default:false,},
                {
                value:'tesla-model-3-button',
                label:'Model 3',
                emoji:'<:number_3:879733517506977862>',
                description:'Tesla',
                default:false,},
                {
                value:'tesla-model-x-button',
                label:'Model X',
                emoji:'<:letter_x:879733517490221066>',
                description:'Tesla',
                default:false,},
                {
                value:'tesla-model-y-button',
                label:'Model Y',
                emoji:'<:letter_y:879733517012070411>',
                description:'Tesla',
                default:false,},
              ))
              )]}).then(async m=>{
                                paginationEmbed((s4dmessage), (
                            embeds: [new MessageEmbed()
                .setTitle(String('__**Powered by Tesla Model Finder**__'))
                .setColor(String((colourRgb(100, 100, 100))))
                .setImage(String('https://media.discordapp.net/attachments/848483779865739344/884855826534236200/PSX_20210907_193723.jpg'))
                .setDescription(String(('Specifications:' + '\n' +
                '' + '\n' +
                'Long Range:' + '\n' +
                'Acceleration 3,9s Weight 2.352 kg Price 95.990€ Dimensions 5.052 mm L x 1.999 mm B x 1.684 mm H Range 580km Top Speed 250kph' + '\n' +
                '' + '\n' +
                'Plaid:' + '\n' +
                'Acceleration 2,6s Weight 2.455 kg Price 116.990€ Dimensions 4.970 mm L x 1.964 mm B x 1.445 mm H Range 547km Top Speed 262kph')))
                .setFooter(String((String(new Date()))))
                .setThumbnail(String('https://media.discordapp.net/attachments/848483779865739344/868411639362375720/left-pointing-magnifying-glass_1f50d.png'))
                            ]
                    ,
                            embeds: [new MessageEmbed()
                .setTitle(String('__**Powered by Tesla Model Finder**__'))
                .setColor(String((colourRgb(100, 100, 100))))
                .setImage(String('https://media.discordapp.net/attachments/848483779865739344/884855826534236200/PSX_20210907_193723.jpg'))
                .setDescription(String(('General Stuff:' + '\n' +
                'Outside Color: White,Black,Gray,Blue,Red Inside Color: Black or White or Beige Autopilot: Full Self Driving or Enhanced Autopilot or Standard Trailer hitch: Canceled (Not Available anymore) Seats: 5 or 6 or 7 CW value: 0.24 Cd Peak Charging Rate: DC=250KW / AC= 16,5KW')))
                .setFooter(String((String(new Date()))))
                .setThumbnail(String('https://media.discordapp.net/attachments/848483779865739344/868411639362375720/left-pointing-magnifying-glass_1f50d.png'))
                            ]
                    ), [''<:icons_leftarrow:860123643816312852>'', ''<:icons_rightarrow:859388126653186058>''],0);
    
                          });
            }
            if ((i.customId) == 'main-menu' && (i.values[0]) == 'tesla-model-y-button') {
              await i.update({ content: String('Select a Option:'),components:[(new MessageActionRow()
                  .addComponents(
                  new MessageSelectMenu()
                  .setCustomId('main-menu')
                  .setPlaceholder('Make a Choose: ')
                  .setMaxValues(1)
                  .setMinValues(1)
                  .setDisabled()
    
    
                  .addOptions(  {
                value:'tesla-model-s-button',
                label:'Model S',
                emoji:'<:letter_s:879733517418897419>',
                description:'Tesla',
                default:false,},
                {
                value:'tesla-model-3-button',
                label:'Model 3',
                emoji:'<:number_3:879733517506977862>',
                description:'Tesla',
                default:false,},
                {
                value:'tesla-model-x-button',
                label:'Model X',
                emoji:'<:letter_x:879733517490221066>',
                description:'Tesla',
                default:false,},
                {
                value:'tesla-model-y-button',
                label:'Model Y',
                emoji:'<:letter_y:879733517012070411>',
                description:'Tesla',
                default:false,},
              ))
              )]}).then(async m=>{
                                paginationEmbed((s4dmessage), (
                            embeds: [new MessageEmbed()
                .setTitle(String('__**Powered by Tesla Model Finder**__'))
                .setColor(String((colourRgb(0, 0, 100))))
                .setImage(String('https://media.discordapp.net/attachments/848483779865739344/884855825426944033/PSX_20210907_194026.jpg'))
                .setDescription(String(('Specifications:' + '\n' +
                '' + '\n' +
                'Long Range:' + '\n' +
                'Acceleration 5,1s Weight 2.003 kg Price 58.620€ Dimensions 4.775 mm L x 1.850 mm B x 1.600 mm H Range 505km Top Speed 217kph' + '\n' +
                '' + '\n' +
                'Performance:' + '\n' +
                'Acceleration 3,7s Weight 2.003 kg Price 65.620€ Dimensions 4.775 mm L x 1.850 mm B x 1.600 mm H Range 480km Top Speed 241kph')))
                .setFooter(String((String(new Date()))))
                .setThumbnail(String('https://media.discordapp.net/attachments/848483779865739344/868411639362375720/left-pointing-magnifying-glass_1f50d.png'))
                            ]
                    ,
                            embeds: [new MessageEmbed()
                .setTitle(String('__**Powered by Tesla Model Finder**__'))
                .setColor(String((colourRgb(0, 0, 100))))
                .setImage(String('https://media.discordapp.net/attachments/848483779865739344/884855825426944033/PSX_20210907_194026.jpg'))
                .setDescription(String(('General Stuff:' + '\n' +
                'Outside Color: White,Black,Gray,Blue,Red Inside Color: Black or White Autopilot: Full Self Driving or Enhanced Autopilot or Standard Trailer hitch: Available for 1.350€ Seats: 5 or (7 coming soon) (there is a Image Link below to see how each configuration looks) Peak Charging Rate: DC=250KW / AC= 11KW')))
                .setFooter(String((String(new Date()))))
                .setThumbnail(String('https://media.discordapp.net/attachments/848483779865739344/868411639362375720/left-pointing-magnifying-glass_1f50d.png'))
                            ]
                    ), [''<:icons_leftarrow:860123643816312852>'', ''<:icons_rightarrow:859388126653186058>''],0);
    
                          });
            }
    
              })
    
                    });
      }
    
    });
    
    return s4d
})();