
const colors = require("colors/safe");

let [firstPrime, secondPrime] = process.argv.slice(2)

function simpleNum(num1 , num2 ) {
    let count = 0

    const colorList = [colors.green, colors.yellow, colors.red]

    if (!num1 || !num2) {
        console.log(colors.red('Ошибка! Введите два простых числа'))

    } else {
        if (num1 < 2) {
            num1 = 2
        }

        for (let i = num1; i <= num2; i++) {
            let isPrime = true

            for (let j = 2; j < i; j++) {
                if (i % j === 0) {
                    isPrime = false
                }
            }

            if (isPrime) {
                console.log(colorList[count % 3](i))
                count++
            }
        }

        if (!count) {
            console.log(colors.red('Не найдено простых чисел в диапазоне'))
            process.exit ()
        }
    }
}

simpleNum(Number(firstPrime), Number(secondPrime))

