'use strict';

const badPatterns = [
	'.*бля(т|д).*', 
	'.*гандо.*',
	'^м(а|о)нд(а|о).*',
	'.*[уеыаоэяию]еб$',
	'^сучк(а|у|и|е|ой|ай).*',
	'^залуп.*',
	'^муд(е|ил|о|а|я|еб).*',
	'.*ху(й|и|я|е|л(и|е)).*',
	'.*п(и|е|ы)зд.*',
	'^пздц.*',
	'^бл(я|е|т|д).*',
	'^еб.*',
	'^(на|вы)еб.*',
	'^в(ъ|ь)еб.*',
	'.*(д(о|а)лб(о|а)|разъ|разь|за|вы|по)ебы*.*',
	'.*пид(а|о|е)р.*'
];

const goodPatterns = [
	'.*еб[0-9].*',
	'.*блендер.*',
	'.*эпидерм.*',
	'.*психу.*',
	'.*бле(з|д|c)н.*',
	'.*бле(ц|ф|й|c|я).*',
	'.*блдате.*',
	'.*блес(т|н|к).*',
	'.*(влю|оскор)бля.*',
	'.*к(о|а)манд.*',
	'.*манд(ол).*',
	'.*истр(е|и)блять.*',
	'.*л(о|а)х(о|а)трон.*',
	'.*(о|а)ск(о|а)рблять.*',
	'хул(е|и)ган',
	'хул(е|и)о',
	'еб(эй|ей|ау)',
	'.*м(а|о)нд(а|о)рин.*',
	'.*р(а|о)ссл(а|о)блять.*',
	'.*п(о|а)тр(е|и)блять.*',
	'.*@.*\\.(ру|сом|нет)$'
];

const goodWords = [
	'блд',
	'блесны',
	'блейд',
	'блект',
	'блендер',
	'блек',
	'блеснуть',
	'мудемнош',
	'мондо',
	'дезмонда',
	'застрахуйте',
	'одномандатный',
	'подстрахуй',
	'психуй'
];

const letters = {
	'a': 'а',
	'b': 'в',
	'c': 'с',
	'e': 'е',
	'f': 'ф',
	'g': 'г',
	'h': 'н',
	'i': 'и',
	'k': 'к',
	'l': 'л',
	'm': 'м',
	'n': 'н',
	'o': 'о',
	'p': 'р',
	'r': 'р',
	's': 'с',
	't': 'т',
	'u': 'у',
	'v': 'в',
	'x': 'х',
	'y': 'у',
	'w': 'ш',
	'z': 'з',
	'ё': 'е',
	'6': 'б',
	'9': 'д'
};

const containsMat = (text) => {
	text = cleanBadSymbols(text.toLowerCase());
	const words = text.split(' ');

	for (let i = 0; i < words.length; i++) {
		const word = convertEngToRus(words[i]);

		if (isInGoodWords(word) || isInGoodPatterns(word))
			continue;

		if (isInBadPatterns(word))
			return true;
	}

	if (containsMatInSpaceWords(words))
		return true;

	return false;
};

const getMats = (text) => {
	text = cleanBadSymbols(text.toLowerCase());

	const words = text.split(' ');
	const result = [];

	for (let i = 0; i < words.length; i++) {
		const word = convertEngToRus(words[i]);

		if (isInGoodWords(word) || isInGoodPatterns(word))
			continue;

		if (isInBadPatterns(word))
			result.push(word);
	}

	return result
		.filter((key, index, array) => array.indexOf(key) === index);;
};

const convertEngToRus = (word) => {
	for (let j = 0; j < word.length; j++) {
		for (let key in letters) {
			if (word.charAt(j) == key)
				word = word.substring(0, j) + letters[key] + word.substring(j + 1, word.length)
		}
	}

	return word;
};

const cleanBadSymbols = (text) => {
	return text
		.replace(/[^a-zA-Zа-яА-Яё0-9\s]/g, '')
		.split('\n')
		.join(' ');
};

const isInGoodWords = (word) => {
	for (let i = 0; i < goodWords.length; i++) {
		if (word == goodWords[i])
			return true;
	}

	return false;
};

const isInGoodPatterns = (word) => {
	for (let i = 0; i < goodPatterns.length; i++) {
		const pattern = new RegExp(goodPatterns[i]);
		if (pattern.test(word)) {
			return true;
		}
	}

	return false;
};

const isInBadPatterns = (word) => {
	for (let i = 0; i < badPatterns.length; i++) {
		const pattern = new RegExp(badPatterns[i]);
		if (pattern.test(word)) {
			return true;
		}
	}

	return false;
};

const containsMatInSpaceWords = (words) => {
	const spaceWords = findSpaceWords(words);

	for (let i = 0; i < spaceWords.length; i++) {
		const word = convertEngToRus(spaceWords[i]);

		if (isInBadPatterns(word))
			return true;
	}

	return false;
};

const findSpaceWords = (words) => {
	const out = [];
	let spaceWord = '';

	for(let i=0; i < words.length; i++ ){
		const word = words[i];

		if(word.length <= 3){
			spaceWord += word;
			continue;
		}

		if(spaceWord.length >= 3){
			out.push(spaceWord);
			spaceWord = '';
		}
	}

	return out;
};

module.exports = {containsMat, getMats};
