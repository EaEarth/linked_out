import { Socket } from 'socket.io-client';
import prompt from 'prompt';
//import readline from 'readline';
import util from 'util';
//import process from 'process';
var rl = require('readline');
var process = require('process');
const io = require("socket.io-client");
const prompt = require('prompt')

const r = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

const input = async (question: string) => new Promise((res, rej) => {
    r.question(question, (ans) => {
        res(ans);
    });
});


async function main() {
    const client = io('ws://127.0.0.1:8000');
    client.connect();
    prompt.start();
    client.on('msgToClient', (msg) => {
        console.log('[Server] ' + msg);
    });
    while (true) {
        try {
            const message = await input('> ');
            client.emit('send_message', {
                message:message,
                chatRoomId: 1
            });
        }
        catch (err) {
            console.error('Error:', err.stack);
        }
    }
}

try {
    main();
}
catch (err) {
    console.error('Error:', err.stack);
}