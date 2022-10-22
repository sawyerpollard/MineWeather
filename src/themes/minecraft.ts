import { Theme } from '../lib/theme';
import { Condition } from '../lib/condition';
import { Time } from '../lib/time';

const minecraft: Theme = {
    name: 'Minecraft',
    basePath: '../images/',
    conditions: {
        [Condition.SNOWING]: {
            [Time.DAY]: [
                {
                    name: 'Snowing',
                    caption: chrome.i18n.getMessage('snowingDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'snowing/day.jpg',
                },
            ],
            [Time.TWILIGHT]: [
                {
                    name: 'Snowing',
                    caption: chrome.i18n.getMessage('snowingDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'snowing/sunset.jpg',
                },
            ],
            [Time.NIGHT]: [
                {
                    name: 'Snowing',
                    caption: chrome.i18n.getMessage('snowingDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'snowing/night.jpg',
                },
            ],
        },
        [Condition.RAINING]: {
            [Time.DAY]: [
                {
                    name: 'Raining',
                    caption: chrome.i18n.getMessage('rainingDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'raining/day.jpg',
                },
            ],
            [Time.TWILIGHT]: [
                {
                    name: 'Raining',
                    caption: chrome.i18n.getMessage('rainingDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'raining/sunset.jpg',
                },
            ],
            [Time.NIGHT]: [
                {
                    name: 'Raining',
                    caption: chrome.i18n.getMessage('rainingDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'snowing/night.jpg',
                },
            ],
        },
        [Condition.COLD]: {
            [Time.DAY]: [
                {
                    name: 'Cold',
                    caption: chrome.i18n.getMessage('coldDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'cold/day.jpg',
                },
            ],
            [Time.TWILIGHT]: [
                {
                    name: 'Cold',
                    caption: chrome.i18n.getMessage('coldDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'cold/sunset.jpg',
                },
            ],
            [Time.NIGHT]: [
                {
                    name: 'Cold',
                    caption: chrome.i18n.getMessage('coldDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'cold/night.jpg',
                },
            ],
        },
        [Condition.CHILLY]: {
            [Time.DAY]: [
                {
                    name: 'Chilly',
                    caption: chrome.i18n.getMessage('chillyDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'chilly/day.jpg',
                },
            ],
            [Time.TWILIGHT]: [
                {
                    name: 'Chilly',
                    caption: chrome.i18n.getMessage('chillyDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'chilly/sunset.jpg',
                },
            ],
            [Time.NIGHT]: [
                {
                    name: 'Chilly',
                    caption: chrome.i18n.getMessage('chillyDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'chilly/night.jpg',
                },
            ],
        },
        [Condition.HUMID]: {
            [Time.DAY]: [
                {
                    name: 'Humid',
                    caption: chrome.i18n.getMessage('humidDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'humid/day.jpg',
                },
            ],
            [Time.TWILIGHT]: [
                {
                    name: 'Humid',
                    caption: chrome.i18n.getMessage('humidDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'humid/sunset.jpg',
                },
            ],
            [Time.NIGHT]: [
                {
                    name: 'Humid',
                    caption: chrome.i18n.getMessage('humidDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'humid/night.jpg',
                },
            ],
        },
        [Condition.MEDITERRANEAN]: {
            [Time.DAY]: [
                {
                    name: 'Mediterranean',
                    caption: chrome.i18n.getMessage('mediterraneanDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'mediterranean/day.jpg',
                },
            ],
            [Time.TWILIGHT]: [
                {
                    name: 'Mediterranean',
                    caption: chrome.i18n.getMessage('mediterraneanDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'mediterranean/sunset.jpg',
                },
            ],
            [Time.NIGHT]: [
                {
                    name: 'Mediterranean',
                    caption: chrome.i18n.getMessage('mediterraneanDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'mediterranean/night.jpg',
                },
            ],
        },
        [Condition.DESERT]: {
            [Time.DAY]: [
                {
                    name: 'Desert',
                    caption: chrome.i18n.getMessage('desertDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'desert/day.jpg',
                },
            ],
            [Time.TWILIGHT]: [
                {
                    name: 'Desert',
                    caption: chrome.i18n.getMessage('desertDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'desert/sunset.jpg',
                },
            ],
            [Time.NIGHT]: [
                {
                    name: 'Desert',
                    caption: chrome.i18n.getMessage('desertDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'desert/night.jpg',
                },
            ],
        },
        [Condition.TROPICAL]: {
            [Time.DAY]: [
                {
                    name: 'Tropical',
                    caption: chrome.i18n.getMessage('tropicalDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'tropical/day.jpg',
                },
            ],
            [Time.TWILIGHT]: [
                {
                    name: 'Tropical',
                    caption: chrome.i18n.getMessage('tropicalDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'tropical/sunset.jpg',
                },
            ],
            [Time.NIGHT]: [
                {
                    name: 'Tropical',
                    caption: chrome.i18n.getMessage('tropicalDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'tropical/night.jpg',
                },
            ],
        },
        [Condition.UNKNOWN]: {
            [Time.DAY]: [
                {
                    name: 'Mediterranean',
                    caption: chrome.i18n.getMessage('mediterraneanDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'mediterranean/day.jpg',
                },
            ],
            [Time.TWILIGHT]: [
                {
                    name: 'Mediterranean',
                    caption: chrome.i18n.getMessage('mediterraneanDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'mediterranean/sunset.jpg',
                },
            ],
            [Time.NIGHT]: [
                {
                    name: 'Mediterranean',
                    caption: chrome.i18n.getMessage('mediterraneanDescription'),
                    attribution: {
                        author: 'James Stone and Sonic Ether',
                        link: '#',
                    },
                    filePath: 'mediterranean/night.jpg',
                },
            ],
        },
    },
};

export default minecraft;
