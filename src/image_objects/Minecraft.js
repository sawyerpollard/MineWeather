import getStorageItem from '../lib/storageUtils.js';

const { language } = await getStorageItem('language');

var loc = JSON.parse($.getJSON({'url': "../localization/localization.json", 'async': false}).responseText);

var tempJson = null;
switch(language){
    case 'english':
        tempJson = loc.english;
        break;
    case 'french':
        tempJson = loc.french;
        break;
    default:
        tempJson = loc.english;
        break;
}
const json = tempJson;

export default {
    name: 'Minecraft',
    basePath: '../images/',
    conditions: {
        snowing: [
            {
                name: 'Snowy Campfire',
                caption: json.image_captions.snowing,
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
                caption: json.image_captions.raining,
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
                caption: json.image_captions.cold,
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
                caption: json.image_captions.chilly,
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
                caption: json.image_captions.humid,
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
                caption: json.image_captions.nice,
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
                caption: json.image_captions.hot_n_dry,
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
                caption: json.image_captions.hot_n_humid,
                attribution: {
                    author: 'FireFlame9842',
                    link: 'https://www.reddit.com/r/Minecraft/comments/eb8unp/was_bored_so_i_made_a_small_jungle_village_any/',
                },
                filename: 'jungle.jpg',
            },
        ],
    },
};
