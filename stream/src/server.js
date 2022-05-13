const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')
const notes = require('../notes.json')
const protoObject = protoLoader.loadSync(path.resolve(__dirname, '../proto/notes.proto'))
const NotesDefinition = grpc.loadPackageDefinition(protoObject)

function List (call) {
  for (const note of notes) {
    call.write(note)
  }
  call.end()
}

function Find(call, callback){
  let note = null;
  call.on('data',function(request){
    note = notes.find((note) => note.id === request.id)
  });

  call.on('end',function(){
      callback(null,{note})
  })
}

const server = new grpc.Server()
server.addService(NotesDefinition.NoteService.service, { List, Find })

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => server.start());
console.log('Listening')

