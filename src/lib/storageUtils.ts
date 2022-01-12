export default async function getStorageItem(key: string){
    const itemObjPromise = new Promise((resolve) => {
        chrome.storage.local.get(key, resolve);
    });

    const itemObj = await itemObjPromise as Record<string, unknown>;
    return itemObj[key];
}