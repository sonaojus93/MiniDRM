import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // 256-bit key
const iv = crypto.randomBytes(16);  // AES block size

export function encryptFile(inputPath: string, outputPath: string, key: Buffer, iv: Buffer): void {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);
    console.log("💾 output:");
    input.pipe(cipher).pipe(output);
}

export function decryptFile(inputPath: string, outputPath: string, key: Buffer, iv: Buffer): void {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);

    input.pipe(decipher).pipe(output);
}