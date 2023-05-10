// Fungsi untuk membuat data array
const inputNumbers = (row = 0) => {
    // Membuat nilai default array
    const arrNumbers = [[]]

    // Loop untuk menambahkan baris
    while (arrNumbers.length <= row) {
        // Mengambil array terakhir
        const lastArray = arrNumbers.slice(-1)[0]

        // Menambahkan baris array
        arrNumbers.push(lastArray.reduce((result, current, index) => {
            // Mengambil next value untuk dijumlah jika tidak ada, maka akan diisi dengan angka 0
            const nextValue = lastArray[index + 1] || 0

            // Menambahkan kolom ke dalam array dan ditambahkan dengan next value dari array terakhir
            result.push(current + nextValue)
            return result
        }, [1]))
    }

    // Hapus array 0
    arrNumbers.shift()
    return arrNumbers
}

// Fungsi untuk mengetahui bilangan genap atau tidak
const isEven = value => value % 2 == 0

const drawTable = (arrNumbers = []) => {
    const row = arrNumbers.length
    const color = ['me', 'ji', 'ku', 'hi', 'bi', 'ni', 'u']

    return /* html */ `
        <table>
        ${arrNumbers.map(
        (numbers, trIndex) => {
            const tableRow = []

            let afterSpace = false
            let numberIndex = 0

            for (let i = 0; i < row * 2; i++) {
                if (i === row - trIndex) afterSpace = true

                // Membuat kondisi untuk memasukkan angka ke dalam tag td
                const print = afterSpace
                    && numberIndex < numbers.length
                    && isEven(i) === isEven(row - trIndex)

                tableRow.push(/* html */ `<td>${print ? numbers[numberIndex++] : ''}</td>`)
            }

            // Menjumlahkan semua angka dalam array
            const numbersSum = numbers.reduce((result, current) => result + current, 0)

            return /* html */ `
                <tr class="${color[trIndex % color.length]}">
                    ${tableRow.join('')}
                    <td class="sum">
                        ${numbersSum}
                    </td>
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

    // Print hasil dalam bentuk html di dalam div #app
    app.innerHTML = html
})