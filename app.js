const fetch = require("node-fetch");

class DataSource {

    testString = "Стрка для теста на малых данных"
    string;
    dataUrl = "https://bmstu.ru/mstu/news/?newsid=7210";
     fillString = (number, passTo = new Coder())=>{
		 passTo.code("Стрка для теста на малых данных")
    }

}
class Coder {
    code(codeSstring){
        console.log("Данные получены кодировщиком:")
        console.log(codeSstring);
        let set = new Set();
        for (let i of codeSstring.split("")){
            set.add(i);
        }
        let countLetters = new Map();
        for (let i of set)
        {
            let count = 0;
           for (let j of codeSstring){
               if (i===j)
                   count++;
           }
           countLetters.set(i, count);
        }


        let withChances = new Map();
        for (let i of countLetters.keys())
            withChances.set(i, countLetters.get(i)*1.0/codeSstring.length)
        let arrayToSort = [];
        for (let i of withChances.keys()){
            let object = {};
            object.letter = i;
            object.chance = withChances.get(i);
            object.code = '';
            arrayToSort.push(object)
        }
        arrayToSort.sort((o1, o2)=>{
            return o2.chance - o1.chance;
        })
        this.codeArray(arrayToSort, 0, arrayToSort.length)
        for (let i =0; i<arrayToSort.length-1; i++){
            if (arrayToSort[i].code===arrayToSort[i+1].code){
                arrayToSort[i].code+=1;
                arrayToSort[i+1].code+=0;
            }
        }

        let codeMap = new Map();
        arrayToSort.forEach((item)=>{
            codeMap.set(item.letter, item.code)
        })
        let encodedString=codeSstring;
        for (let i of codeMap.keys()){
            encodedString = encodedString.split(i).join(codeMap.get(i));
        }
        (new Passer()).pass(encodedString, codeMap);
    }

    codeArray(array, startIndex, endIndex){
        if (startIndex===endIndex)
            return ;
        let totalChance = 0;
        for (let i = startIndex; i<endIndex; i++)
            totalChance+=array[i].chance;
        let currentChance = 0;
        let nextBorder =0;
        for (let i =startIndex; i<endIndex; i++)
        {
            currentChance+=array[i].chance;
            if (currentChance>totalChance/2.0)
                array[i].code+=0
            else {
                array[i].code+=1;
                nextBorder = i+1;
            }
        }
        if (nextBorder - startIndex>2)
            this.codeArray(array,  startIndex, nextBorder);
        if (endIndex - nextBorder >2)
            this.codeArray(array, nextBorder, endIndex);
    }

}
class Passer{
    addNoise(text, P){
        let letters = text.split("");
        letters = letters.map((value, index, array)=>{
            if (Math.random()>P)
                return value;
            else
                return value==="1"?"0":"1";
        })
        return letters.join("");
    }
    pass(codeString, decodeMap){
        console.log("Данные передаются:");
        console.log(codeString);
        console.log(this.addNoise(codeString, 0.1));
        console.log("Noise")
        //(new Decoder()).decode(codeString, decodeMap);
    }
}
class Decoder{
    decode(codeString, decodeMap){
        let reverseMap = new Map();
        for (let i of decodeMap.keys()) {
            reverseMap.set(decodeMap.get(i), i);
        }
        let letters = new Array();
        for (let i =0; i<codeString.length; i++){
            let replaceMe = codeString[i];
            while (reverseMap.get(replaceMe)===undefined) {
                replaceMe+=codeString[++i];
            }
            letters.push(replaceMe)
        }
        letters = letters.map((item)=>{
            return reverseMap.get(item);
        })
        let rezultString = letters.join("");
		
        (new DataTarget()).getData(rezultString);
    }
}
class DataTarget {
    getData(string)
    {
        console.log("Данные были получены получателем:")
        console.log(string);

    }
}

let dataSource = new DataSource();

dataSource.fillString(410);