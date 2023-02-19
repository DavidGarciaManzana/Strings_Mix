let mix = (s1: string, s2: string): string => {
    //1.-Create 2 objects to save the strings without spaces and other characters
    let obj1: { [key: string]: number } = {}
    let obj2: { [key: string]: number } = {}
    //2.- A loop to save the letters in the first object 
    for (let letter of s1) {
        //3.-Get rid of spaces and other characters using regex
        if (/^[a-z]+$/.test(letter)) {
            //4.-Insert every letter to the object to know how many of that letters the string has
            //**Using the if just for the first time 
            if (!obj1[letter]) {
                obj1[letter] = 1
            } else {
                obj1[letter] += 1
            }
        }

    }
    //5.-The same for the second string/object
    for (let letter of s2) {
        if (/^[a-z]+$/.test(letter)) {
            if (!obj2[letter]) {
                obj2[letter] = 1
            } else {
                obj2[letter] += 1
            }
        }

    }
    //6.-Get a new object with only the letters with the greater number (do not take numbers equal or below 1)
    let objFusion: { [key: string]: number } = {}

    function getHighestValues(objFusion: any, obj1: any, obj2: any): any {
        //7.-Using the spread operator you can create an objectFusion with all the data 
        //from obj1 and obj2, then you use the Object.keys to obtein only the letters
        const letters = Object.keys({ ...obj1, ...obj2 });
        //8.- For each letter you look into both objects, and save the value in each constant
        //(Only if the value is above 1)
        let value1: number;
        let value2: number;
        letters.forEach((letter) => {
            if (obj1[letter] && obj1[letter] > 1) { value1 = obj1[letter] } else {
                value1 = 0
            }
            if (obj2[letter] && obj2[letter] > 1) { value2 = obj2[letter] } else {
                value2 = 0
            }
            //10.-Using the Math.max you get only the higher value and saved it the objFusion
            objFusion[letter] = Math.max(value1, value2);
        });
        return objFusion
    }
    objFusion = getHighestValues(objFusion, obj1, obj2)
    // 11.-Order the objFusion so the values goes from the highest to the lowest
    function sortObjectByValue(obj: { [key: string]: number }): any {
        //12.-Convert the onbject into an array of arrays
        const entries = Object.entries(obj);
        //13.-Sort the array by the number value "[[0:1],[0:1],...]" 
        entries.sort((a: [string, number], b: [string, number]): number => {
            return (b[1]) - (a[1]);
        });
        //14.-Save the sorted array and return it as an object
        const sortedObj: { [key: string]: number } = {};
        entries.forEach(entry => {
            sortedObj[entry[0]] = entry[1];
        });
        return sortedObj;
    }
    objFusion = sortObjectByValue(objFusion);

    let result: string = "";
    let slashIndex = 0;
    let slash;
    for (let letter of Object.keys(objFusion)) {
        if(slashIndex == 0 ){
            slash = ''
        } else { slash ='/'}
        if (objFusion[letter] > 1) {
            if (obj1[letter] && obj2[letter]) {
                if (obj1[letter] > obj2[letter]) {
                    result += `${slash}1:${letter.repeat(obj1[letter])}`
                } else if (obj1[letter] < obj2[letter]) {
                    result += `${slash}2:${letter.repeat(obj2[letter])}`
                } else if (obj1[letter] == obj2[letter]) {
                    result += `${slash}=:${letter.repeat(obj1[letter])}`
                }
            } else if (!obj1[letter]){
                result += `${slash}2:${letter.repeat(obj2[letter])}`
            }
             else if (!obj2[letter]){
                result += `${slash}1:${letter.repeat(obj1[letter])}`
            }


        }
        slashIndex++
    }
    console.log('result:                      '+result)
    // console.log(objFusion)
    // console.log(obj1, obj2)
    return ""
}
// Testing
mix("Are they here", "yes, they are here")//, "2:eeeee/2:yy/=:hh/=:rr");
mix("looping is fun but dangerous", "less dangerous than coding")//, "1:ooo/1:uuu/2:sss/=:nnn/1:ii/2:aa/2:dd/2:ee/=:gg");
mix(" In many languages", " there's a pair of functions")//, "1:aaa/1:nnn/1:gg/2:ee/2:ff/2:ii/2:oo/2:rr/2:ss/2:tt");