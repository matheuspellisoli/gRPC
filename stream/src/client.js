const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

function promisify (client) {
  for (let method in client) {
    client[`${method}Async`] = (parameters) => {
      return new Promise((resolve, reject) => {
        client[method](parameters, (err, response) => {
          if (err) reject(err)
          resolve(response)
        })
      })
    }
  }
}

const protoObject = protoLoader.loadSync(path.resolve(__dirname, '../proto/notes.proto'))
const NotesDefinition = grpc.loadPackageDefinition(protoObject)

const client = new NotesDefinition.NoteService('localhost:50051', grpc.credentials.createInsecure())
promisify(client)


// const noteStream = client.list({})
// noteStream.on('data', console.log)

const call = client.find((err, response) => {
  if (err) throw err
  console.log(response)
})

call.write({ id: 5 })
call.end()
