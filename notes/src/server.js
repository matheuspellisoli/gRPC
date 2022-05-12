const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

const protoObject = protoLoader.loadSync(path.resolve(__dirname, '../proto/notes.proto'))
const NotesDefinition = grpc.loadPackageDefinition(protoObject)

const notes = [
    { id: 1, title: 'Note 1', description: 'Content 1' },
    { id: 2, title: 'Note 2', description: 'Content 2' }
  ]


  function List (_, callback) {
    return callback(null, { notes })
  }

//   se simplesmente dermos um return ou um throw fará com que 
//   nosso client não receba as informações corretas, por isso que devemos criar uma
//    estrutura de erro e retorná-la no callback.

function Find ({ request: { id } }, callback) {
    const note = notes.find((note) => note.id === id)
    if (!note) return callback(new Error('Not found'), null)
    return callback(null, { note })
  }  

const server = new grpc.Server()
server.addService(NotesDefinition.NoteService.service, { List, Find })

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => server.start());
console.log('Listening')

