export default (req, res, next) => {
    const { originalUrl, method, body } = req
    const bodyString =  JSON.stringify(body)
    const message = `
Method: ${method}
URL: ${originalUrl}
Body: ${bodyString}`
    console.log(message)
    next()
}
