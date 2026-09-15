const natural = require('natural');

function analyzeSentiment(sentence) {
    try {
        if (!sentence || typeof sentence !== 'string') {
            return 0;
        }
        const Analyzer = natural.SentimentAnalyzer;
        const stemmer = natural.PorterStemmer;
        const analyzer = new Analyzer("English", stemmer, "afinn");
        const tokenizer = new natural.WordTokenizer();
        const tokenized = tokenizer.tokenize(sentence);
        const score = analyzer.getSentiment(tokenized);
        return Math.round(score * 100) / 100;
    } catch (err) {
        console.error("Error analyzing sentiment:", err);
        return 0;
    }
}

module.exports = { analyzeSentiment };
