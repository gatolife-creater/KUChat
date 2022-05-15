const path = require('path');
const kuromoji = require('kuromoji');

class Morphology {
    constructor(sentence) {
        this.sentence = sentence;
    }

    getWordsByRole(role) {
        let words = [];
        return new Promise((resolve, reject) => {
            kuromoji.builder({
                    dicPath: path.resolve(__dirname, '../node_modules/kuromoji/dict')
                })
                .build((error, tokenizer) => {
                    const parsedWords = tokenizer.tokenize(this.sentence);
                    for (let parsedWord of parsedWords) {
                        if (parsedWord.pos === role |
                            parsedWord.pos_detail_1 === role |
                            parsedWord.pos_detail_2 === role |
                            parsedWord.pos_detail_3 === role) {
                            words.push(parsedWord.basic_form);
                        }
                    }
                    return resolve(words);
                });
        })
    }
}

module.exports.Morphology = Morphology;