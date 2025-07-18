let useLang = "en";
let LocalizedStrings = {
    en: {
        buy: "buy",
        for: "for"
    }
}

function LocalizedString(string) {
    return LocalizedStrings[useLang][string];
}

function LocalizedTextElement(string) {
    return document.createTextNode(LocalizedString(string));
}