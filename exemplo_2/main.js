const {Data} = require('./data_pb')
var {Struct} = require('google-protobuf/google/protobuf/struct_pb.js');

const data = new Data()
data.setId(1)
data.setPayload(Struct.fromJavaScript({id:1, nome: "teste"}))

const serialized = data.serializeBinary()
console.log(serialized)

const deserialized = Data.deserializeBinary(serialized)
console.log("Id: ",deserialized.getId())
console.log("Payload 1: ", deserialized.getPayload())

const payload = deserialized.getPayload().toJavaScript()

console.log("Payload 2: ", payload)


const data2 = new Data()
data2.setId(2)
data2.setPayload(Struct.fromJavaScript({
    id: 1,
    title: "Note by Brandon Tran",
    description: "Content http://ki.bo/kuwokal"
  }))

const serialized2 = data2.serializeBinary()
console.log(serialized2)

const deserialized2 = Data.deserializeBinary(serialized2)
console.log("Id: ",deserialized2.getId())
console.log("Payload 1: ", deserialized2.getPayload())

const payload2 = deserialized2.getPayload().toJavaScript()

console.log("Payload 2: ", payload2)

