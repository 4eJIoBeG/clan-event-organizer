const { clientId, guildId, token } = require("./config.json");
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "tod",
    description: "Raid boss TOD",
    options: [
      {
        name: "boss-name",
        description: "Choose boss name",
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: "tezza",
            value: "tezza",
          },
          {
            name: "qa",
            value: "qa",
          },
          {
            name: "zaken",
            value: "zaken",
          },
          {
            name: "baium",
            value: "baium",
          },
          {
            name: "antharas",
            value: "antharas",
          },
          {
            name: "valakas",
            value: "valakas",
          },
        ],
        required: true,
      },
      {
        name: "who-killed",
        description: "Choose who kill",
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: "main-clan",
            value: "Main clan",
          },
          {
            name: "enemies",
            value: "Enemies",
          },
        ],
        required: true,
      },
      {
        name: "drop",
        description: "Choose drop result",
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: "dropped",
            value: "dropped",
          },
          {
            name: "not-dropped",
            value: "not dropped",
          },
        ],
        required: true,
      },
      {
        name: "additional-timer",
        description: "Additional timer [in minutes] (IF NO NEED PUT '0')",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
  {
    name: "regroup",
    description: "Raid boss regroup call",
    options: [
      {
        name: "boss-name",
        description: "Choose boss name",
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: "tezza",
            value: "tezza",
          },
          {
            name: "qa",
            value: "qa",
          },
          {
            name: "zaken",
            value: "zaken",
          },
          {
            name: "baium",
            value: "baium",
          },
          {
            name: "antharas",
            value: "antharas",
          },
          {
            name: "valakas",
            value: "valakas",
          },
          {
            name: "siege",
            value: "siege",
          },
        ],
        required: true,
      },
      {
        name: "timer",
        description: "Choose timer regroup [in minutes]",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "test",
        description: "Sending message to test channel",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("Registering slash commands...");

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });
    console.log("Slash commands were registered successfully!");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
