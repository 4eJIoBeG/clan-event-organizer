const { token } = require("./config.json");
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (client) => {
  console.log(`✅ ${client.user.tag} is online`);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "test") {
    const testMessage = "This is a test message";

    const channel = client.channels.cache.find(
      (channel) => channel.name === "test",
    );

    const embed = new EmbedBuilder()
      .setTitle(`${testMessage}! :call_me:`)
      .setDescription(`Reported by ${interaction.user}`)
      .setColor("Random");

    channel.send({ embeds: [embed] });
  }

  if (interaction.commandName === "regroup") {
    const bossName = interaction.options.get("boss-name").value;
    const regroupTimer = interaction.options.get("timer").value;

    const channel = client.channels.cache.find(
      (channel) => channel.name === "announcements",
    );

    const embed = new EmbedBuilder()
      .setTitle(
        `${bossName.toUpperCase()} start regrouping in ${regroupTimer}min! :call_me:`,
      )
      .setDescription(`Reported by ${interaction.user}`)
      .setColor("Random");

    channel.send({ embeds: [embed] });
  }

  if (interaction.commandName === "tod") {
    const bossName = interaction.options.get("boss-name").value;
    const whoKill = interaction.options.get("who-killed").value;
    const drop = interaction.options.get("drop").value;
    const additionalTimer = parseInt(
      interaction.options.get("additional-timer").value,
    );
    let basicHour = 0;

    if (bossName === "qa") {
      basicHour = 24;
    }
    if (bossName === "zaken") {
      basicHour = 48;
    }
    if (bossName === "baium") {
      basicHour = 124;
    }
    if (bossName === "antharas") {
      basicHour = 196;
    }
    if (bossName === "valakas") {
      basicHour = 268;
    }
    if (bossName === "tezza") {
      basicHour = 48;
    }

    const raidDay = basicHour * 3600;
    const raidHour = 4 * 3600;
    const additionalTimerMin = additionalTimer * 60;

    const raidTODutc = new Date();
    raidTODutc.setMinutes(raidTODutc.getMinutes() - additionalTimer);
    const raidTODutcView = raidTODutc.toUTCString();
    const raidTODloc = new Date(Date.now()).getTime() / 1000;
    const raidTODlocal = (raidTODloc - additionalTimerMin)
      .toString()
      .slice(0, -4);
    const raidTODlocalStart = (raidTODloc + raidDay - additionalTimerMin)
      .toString()
      .slice(0, -4);
    const raidTODlocalEnd = (
      raidTODloc +
      raidDay +
      raidHour -
      additionalTimerMin
    )
      .toString()
      .slice(0, -4);

    const channel = client.channels.cache.find(
      (channel) => channel.name === bossName,
    );

    const embed = new EmbedBuilder()
      .setTitle(
        `${bossName.toUpperCase()} Killed by ${whoKill} ${
          whoKill === "Main clan" ? ":white_check_mark:" : ":x:"
        }`,
      )
      .setDescription(`Reported by ${interaction.user}`)
      .setColor("Random")
      .addFields(
        {
          name: "TOD UTC (include tod error):",
          value: `${raidTODutcView}`,
          inline: true,
        },
        {
          name: "TOD error:",
          value: `:timer: ${additionalTimer} min`,
          inline: true,
        },
        {
          name: "Local TOD:",
          value: `<t:${raidTODlocal}:F>`,
          inline: false,
        },
        {
          name: "Local Window start at:",
          value: `<t:${raidTODlocalStart}:F>`,
          inline: false,
        },
        {
          name: "Local Window end at:",
          value: `<t:${raidTODlocalEnd}:F>`,
          inline: false,
        },
        {
          name: "Jewelry",
          value: `${drop} ${drop === "dropped" ? ":white_check_mark:" : ":x:"}`,
          inline: false,
        },
      );

    channel.send({ embeds: [embed] });
  }
});

client.login(token);
