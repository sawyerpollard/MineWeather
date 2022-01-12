export default function handleResize(fullscreenImage: HTMLImageElement): void {
    const image = fullscreenImage;

    const aspectRatio = image.naturalWidth / image.naturalHeight;

    if (window.innerWidth < aspectRatio * window.innerHeight) {
        image.style.width = `${aspectRatio * window.innerHeight}px`;
        image.style.height = `${window.innerHeight}px`;
    } else {
        image.style.width = `${window.innerWidth}px`;
        image.style.height = `${window.innerWidth / aspectRatio}px`;
    }
}
