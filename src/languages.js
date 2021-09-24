import React from "react";

export default function Languages () {
    return ({
        en : {
            fDropDown: "English",
            secDropDown:"Ukrainian",
            tranlsation:"Translations",
            synonims :"Synonims",
            placeholder: "Enter your text",
            contextTranslation :"Translation in context",
            err1:"You forgot to put words in here",
            err2:"You did not choose the language"
        },
        ua : {
            fDropDown: "Англійська",
            secDropDown:"Українська",
            tranlsation:"Переклади",
            synonims :"Синоніми",
            placeholder: "Введіть текст",
            contextTranslation :"Переклад в контексті",
            err1:"Ви не написали слово",
            err2:"Ви не обрали мову"
        }
    })
}