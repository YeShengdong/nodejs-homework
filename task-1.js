process.stdin.resume()
process.stdin.setEncoding('utf-8')
process.stdin.on('data', (input) => {
    const reverses = input.replace(/[\r\n]/g, '').split('').reverse().join('')

    console.log('reverses', reverses)
})
