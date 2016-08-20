/**
 * Created by garima05 on 14-08-2016.
 */
// Task 1 - all questions are implemented using for loop
// Task 2 = do all questions again by using array functions.
// Task 3 - try all array functions atleast on 3 different scenarions (like simple array of ints, stings and objects ot others as required)
// Task 4 prepare for interview/ test tomorrow - passing criteria 90%

function day2_q1() {


    var upperLimitForNaturalNo = 10;
    var initialLimitForNaturalNo = 1;
    var naturalNo = 0;

    if (typeof upperLimitForNaturalNo === 'number') {
        for (var idx = 0; idx < upperLimitForNaturalNo; idx++) {
            naturalNo = naturalNo + initialLimitForNaturalNo;
            console.log(naturalNo);
        }
    }
    else {
        console.log("Enter valid number");

    }
}

function day2_q2() {


    var upperLimitForOddNo = 10;
    var initialLimitForOddNo = 1;


    if (typeof upperLimitForNaturalNo === 'number') {
        for (var idx = initialLimitForOddNo; idx <= upperLimitForNaturalNo; idx++) {

            if (idx % 2 !== 0) {
                console.log(idx);
            }
        }
    }
    else {
        console.log("Enter valid number");

    }
}

function day2_q3() {


    var upperLimit = 10;
    var initialLimit = 1;
    var sumOfEvenNo = 0;

    if (typeof upperLimit === 'number') {
        for (var idx = initialLimit; idx <= upperLimit; idx++) {

            if (idx % 2 === 0) {
                sumOfEvenNo = sumOfEvenNo + idx;
            }
        }

        console.log("sum of even no::" + sumOfEvenNo);
    }

    else {
        console.log("Enter valid number");

    }
}


function day2_q4() {

    var num = 5;
    var upperLimitForTable = 10;
    var initialLimitForTable = 1;
    var table = 0;


    if (typeof num === 'number') {
        for (var idx = initialLimitForTable; idx <= upperLimitForTable; idx++) {

            table = num * idx;
            console.log(num + "*" + idx + "=" + table);
        }

    }
    else {
        console.log("Enter valid number");

    }
}


function day2_q5() {

    var num = 1234;
    var lastDigit;
    var firstDigit
    if (typeof num === 'number') {

        lastDigit = num % 10;

        for (var idx = num; idx > 0;) {
            firstDigit = idx % 10;
            idx = Math.floor(idx / 10);
        }

        console.log("last digit of a no::" + lastDigit);
        console.log("first digit of a no::" + firstDigit);
    }
    else {
        console.log("Enter valid number");

    }
}

function day2_q6() {

    var num = 1234;
    var sumOfDigits = 0;
    var remainder = 0;
    if (typeof num === 'number') {


        for (var idx = num; idx > 0;) {

            remainder = idx % 10;
            sumOfDigits = sumOfDigits + remainder;
            idx = Math.floor(idx / 10);
        }

        console.log("sum of digit:" + " " + sumOfDigits);
    }
    else {
        console.log("Enter valid number");

    }
}

function day2_q7() {

    var num = 1234;
    var remainder = 0;
    var productOfDigits = 1;
    if (typeof num === 'number') {


        for (var idx = num; idx > 0;) {

            remainder = idx % 10;
            productOfDigits = productOfDigits * remainder;
            idx = Math.floor(idx / 10);
        }

        console.log("product of digit:" + " " + productOfDigits);
    }
    else {
        console.log("Enter valid number");

    }
}


function day2_q8() {

    var num = 121;
    var remainder = 0;
    var reverse = 0;
    var tempNum = num;
    if (typeof num === 'number') {


        for (var idx = tempNum; idx > 0;) {

            remainder = idx % 10;
            reverse = reverse * 10 + remainder;
            idx = Math.floor(tempNum / 10);
        }

        if (reverse === num) {
            console.log("Number" + " " + num + " " + "is palindrome");

        }
        else {

            console.log("Number" + " " + num + " " + "is not palindrome");
        }
    }
    else {
        console.log("Enter valid number");

    }
}


function day2_q9() {
    debugger
    var basse = 2;
    var exponent = 5;
    var result;


    if (typeof basse === 'number' && exponent === 'number') {

        for (var idx = 1; idx <= exponent; idx++) {
            result = base * base;

        }

        console.log("Power of number:" + result);
    }
    else {
        console.log("Enter valid number");

    }
}


function day2_q11() {

    var num = 371;
    var sumOfDigits = 0;
    var remainder = 0;
    var tempNum = num;
    if (typeof num === 'number') {

        debugger
        for (var idx = tempNum; idx > 0;) {

            remainder = idx % 10;
            sumOfDigits = sumOfDigits + Math.pow(remainder, 3);
            idx = Math.floor(idx / 10);

        }

        if (sumOfDigits === num) {
            console.log("Number" + " " + num + " " + "is armstrong");

        }
        else {

            console.log("Number" + " " + num + " " + "is not armstrong");
        }
    }
    else {
        console.log("Enter valid number");

    }
}

function day2_q12() {


    var num = 6;
    var initval = 2;
    var sum = 1;
    for (var idx = 2; idx <= num; idx++) {
        if (num % idx == 0) {
            sum = sum + idx;
        }

    }
    if (sum.isEqual(num)) {
        console.log("Number" + " " + num + " " + "is perfect number");
    }
    else {

        console.log("Number" + " " + num + " " + "is not perfect number");
    }


}


function day2_q13() {

    var upperLimit = 10;
    var fibseries = 0;
    var initialno = 0;
    var secondno = 1;
    var num;
    if (typeof num === 'number') {
        console.log(initialno + " " + secondno + " ");

        for (var idx = 2; idx < 10; idx++) {
            num = initialno + secondno;
            initialno = secondno;
            secondno = num;
            if (typeof upperLimit === 'number') {
                console.log(num);
            }

        }
    }
    else {
        console.log("Enter valid number");

    }
}

function day2_q14() {

    var inputBinaryNo = 0011;
    if (typeof inputBinaryNoinputBinaryNo === 'number') {


    }
}


function day2_q9() {
    var num = 1234;
    var arrNum = [];
    var remainder;

    for (var idx = num; idx > 0;) {
        remainder = num % 10;
        arrNum.push(remainder);
        num = Math.floor(num / 10);

    }
    for (elt of arrNum) {
        console.log(elt);

   }

}



