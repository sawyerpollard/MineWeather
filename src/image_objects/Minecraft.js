export default {
    name: 'Minecraft',
    basePath: '../images/',
    conditions: {
        snowing: [
            {
                name: 'Snowy Campfire',
                caption: chrome.i18n.getMessage('snowingDescription'),
                attribution: {
                    author: 'Futureazoo',
                    link: 'https://www.curseforge.com/minecraft/texture-packs/default-style-winter-pack',
                },
                filename: 'snowing.jpg',
            },
        ],
        raining: [
            {
                name: 'Rainy Bridge',
                caption: chrome.i18n.getMessage('rainingDescription'),
                attribution: {
                    author: 'MoritzkoLP',
                    link: 'https://www.reddit.com/r/Minecraft/comments/cb62yl/even_rain_can_look_good_with_shaders/',
                },
                filename: 'raining.jpg',
            },
        ],
        cold: [
            {
                name: 'Snow Plains',
                caption: chrome.i18n.getMessage('coldDescription'),
                attribution: {
                    author: 'Lxazl5770',
                    link: 'https://minecraft.gamepedia.com/File:Snowy_Tundra.png',
                },
                filename: 'cold.jpg',
            },
        ],
        chilly: [
            {
                name: 'Foggy Mountains',
                caption: chrome.i18n.getMessage('chillyDescription'),
                attribution: {
                    author: 'Thebloxgamer',
                    link: 'https://www.deviantart.com/thebloxgamer/art/Snow-River-New-Shaders-Rain-Edition-640850501',
                },
                filename: 'chilly.jpg',
            },
        ],
        humid: [
            {
                name: 'Swamp',
                caption: chrome.i18n.getMessage('humidDescription'),
                attribution: {
                    author: 'Equeon',
                    link: 'https://www.minecraftforum.net/forums/minecraft-java-edition/suggestions/47019-complete-biome-overhaul-the-swamp',
                },
                filename: 'swamp.jpg',
            },
        ],
        mediterranean: [
            {
                name: 'Village',
                caption: chrome.i18n.getMessage('mediterraneanDescription'),
                attribution: {
                    author: 'Chocapic13',
                    link: 'https://www.curseforge.com/minecraft/customization/chocapic13-shaders',
                },
                filename: 'village.jpg',
            },
        ],
        desert: [
            {
                name: 'Desert',
                caption: chrome.i18n.getMessage('desertDescription'),
                attribution: {
                    author: 'Bric3d',
                    link: 'https://www.reddit.com/r/MinecraftWallpapers/comments/17expy/some_temple_in_the_desert_38402160/',
                },
                filename: 'desert.jpg',
            },
        ],
        tropical: [
            {
                name: 'Jungle',
                caption: chrome.i18n.getMessage('tropicalDescription'),
                attribution: {
                    author: 'FireFlame9842',
                    link: 'https://www.reddit.com/r/Minecraft/comments/eb8unp/was_bored_so_i_made_a_small_jungle_village_any/',
                },
                filename: 'jungle.jpg',
            },
        ],
    },
};
