const { Client, REST, Routes, GatewayIntentBits, Events } = require("discord.js")
const client = new Client({ intents: [GatewayIntentBits.Guilds] })

//feito!
const TOKEN = ""

// Servidor onde será registrado os comandos, para teste deles
const GUILD_ID = ""

// Cria uma comunicação REST com o discord
const rest = new REST({ version: '10' }).setToken(TOKEN)

// aqui não tem async?          \/ 
client.on(Events.ClientReady, async () => {
    console.log(`Entrou krl ${client.user.tag}!`)

    // Array de comandos disponíveis
    const commands = [
        {
            name: 'ping',
            description: 'responde com pong né porra',
        },
        {
            name: 'pipi',
            description: 'pipi, apenas.'
        }
    ];

    // Faz uma request PUT para o Discord
    await rest.put(
        // Comunica que vai alterar os comandos do CLIENT_ID, no caso, nosso bot
        Routes.applicationGuildCommands(client.user.id, GUILD_ID),
        {
            // Coloca no body da request, o array com os comandos
            body: commands
        }
    );

    // Após isso, deixar o evento de comandos detectar as mensagens
})

client.on(Events.InteractionCreate, async interaction => {
    // Ignora se for outra coisa além de SLASH COMMAND.
    if (!interaction.isChatInputCommand()) return;

    switch (interaction.commandName) {
        case "ping":
            interaction.reply({ content: "pong fdp" })
            break;

        case "pipi":
            const [mole, duro] = [getRandomNumber(1, 40), getRandomNumber(1, 40)]

            // o `User.toString()` já converte para "<@USER ID>" automaticamente
            // isso vale também para `${interaction.user}`
            interaction.reply({ content: `O ${interaction.user} tem ${mole}cm de pipi mole e ${duro}cm de pipi duro` })
            break;
    }
})

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

client.login(TOKEN)
