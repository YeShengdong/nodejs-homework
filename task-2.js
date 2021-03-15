const fs = require('fs')
const csvFilePath = './assets/nodejs-hw1-ex1.csv'
const csv = require('csvtojson')

csv()
    .fromFile(csvFilePath)
    .subscribe(
        json => {
            const data = JSON.stringify(json) + '\r\n'

            try {
                fs.appendFileSync('task-2.txt', data, 'utf8')
            } catch (error) {
                console.log('write error')
            }
        },
        () => console.log('error'),
        () => console.log('success')
    )
