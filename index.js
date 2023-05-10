const inputNumbers = (row = 0) => {
    const arrNumbers = [[]]

    while (arrNumbers.length <= row) {
        const lastArray = arrNumbers.slice(-1)[0]

        arrNumbers.push(lastArray.reduce((result, current, index) => {
            const nextValue = lastArray[index + 1] || 0

            result.push(current + nextValue)
            return result
        }, [1]))
    }

    arrNumbers.shift()
    return arrNumbers
}

const isEven = value => value % 2 == 0

const drawTable = (arrNumbers = []) => {
    const row = arrNumbers.length

    return /* html */ `
        <table>
        ${arrNumbers.map(
        (numbers, trIndex) => {
            const tableRow = []

            let afterSpace = false
            let numberIndex = 0

            for (let i = 0; i < row * 2; i++) {
                if (i === row - trIndex) afterSpace = true

                const print = afterSpace
                    && numberIndex < numbers.length
                    && isEven(i) === isEven(row - trIndex)

                tableRow.push(/* html */ `<td>${print ? numbers[numberIndex++] : ''}</td>`)
            }

            return /* html */ `
                <tr>
                 ${tableRow.join('')}
                </tr>
            `
        }).join('')}
        </table>
    `
}

let generate = document.getElementById('generate')
generate.addEventListener('click', function () {
    const app = document.getElementById('app')
    const row = document.getElementById('row')

    const arrNumbers = inputNumbers(row.value)
    const html = drawTable(arrNumbers)

    app.innerHTML = html
})