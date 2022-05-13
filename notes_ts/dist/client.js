"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grpc_js_1 = require("@grpc/grpc-js");
var notes_grpc_pb_1 = require("../proto/notes_grpc_pb");
var notes_pb_1 = require("../proto/notes_pb");
var client = new notes_grpc_pb_1.NotesClient('0.0.0.0:50052', grpc_js_1.ChannelCredentials.createInsecure());
client.list(new notes_pb_1.Void(), function (err, notes) {
    if (err)
        return console.log(err);
    console.log(notes.toObject());
});
client.find((new notes_pb_1.NoteFindRequest).setId(1), function (err, note) {
    if (err)
        return console.log(err);
    console.log(note.toObject());
});
client.find((new notes_pb_1.NoteFindRequest).setId(3), function (err, note) {
    if (err)
        return console.log(err.message);
    console.log(note.toObject());
});
//# sourceMappingURL=client.js.map