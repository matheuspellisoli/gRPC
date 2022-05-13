"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("util");
var notes_grpc_pb_1 = require("../proto/notes_grpc_pb");
var notes_pb_1 = require("../proto/notes_pb");
var grpc_js_1 = require("@grpc/grpc-js");
var notes = [
    { id: 1, title: 'Note 1', description: 'Content 1' },
    { id: 2, title: 'Note 2', description: 'Content 2' }
];
var NotesServer = /** @class */ (function () {
    function NotesServer() {
    }
    NotesServer.prototype.find = function (call, callback) {
        var id = call.request.getId();
        var foundNote = notes.find(function (note) { return note.id === id; });
        if (!foundNote)
            return callback(new Error('Note not found'), null);
        var response = new notes_pb_1.NoteFindResponse();
        response.setNote((new notes_pb_1.Note()).setTitle(foundNote.title).setId(foundNote.id).setDescription(foundNote.description));
        return callback(null, response);
    };
    NotesServer.prototype.list = function (_, callback) {
        var response = new notes_pb_1.NoteListResponse();
        notes.forEach(function (note) {
            response.addNotes((new notes_pb_1.Note).setId(note.id).setTitle(note.title).setDescription(note.description));
        });
        callback(null, response);
    };
    return NotesServer;
}());
var server = new grpc_js_1.Server();
server.addService(notes_grpc_pb_1.NotesService, new NotesServer());
var bindPromise = (0, util_1.promisify)(server.bindAsync).bind(server);
bindPromise('0.0.0.0:50052', grpc_js_1.ServerCredentials.createInsecure())
    .then(function (port) {
    console.log("listening on ".concat(port));
    server.start();
})
    .catch(console.error);
//# sourceMappingURL=server.js.map