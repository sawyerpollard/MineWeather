export default class WeatherImage {
    constructor(imageObject, condition, time) {
        const { basePath } = imageObject;

        const {
            name, caption, attribution, filename,
        } = imageObject.conditions[condition][time][0];

        const { author, link } = attribution;

        this.name = name;
        this.caption = caption;
        this.author = author;
        this.link = link;
        this.path = basePath + filename;
    }
}
