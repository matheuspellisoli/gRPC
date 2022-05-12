const {Pessoa} = require('./pessoa_pb')

const p = new Pessoa()
p.setId(1)
p.setEmail('hello@gamil.dev')

const serialized = p.serializeBinary()
console.log(serialized)

const deserialized = Pessoa.deserializeBinary(serialized)
console.table(deserialized.toObject())
console.log(deserialized)