"use strict";
// Copyright (c) 2018, Zpalmtree
//
// Please see the included LICENSE file for more information.
Object.defineProperty(exports, "__esModule", { value: true });
const JsonSerialization_1 = require("./JsonSerialization");
class Block {
    constructor(coinbaseTransaction, transactions, blockHeight, blockHash, blockTimestamp) {
        this.coinbaseTransaction = coinbaseTransaction;
        this.transactions = transactions;
        this.blockHeight = blockHeight;
        this.blockHash = blockHash;
        this.blockTimestamp = blockTimestamp;
    }
}
exports.Block = Block;
class RawCoinbaseTransaction {
    constructor(keyOutputs, hash, transactionPublicKey, unlockTime) {
        this.keyOutputs = keyOutputs;
        this.hash = hash;
        this.transactionPublicKey = transactionPublicKey;
        this.unlockTime = unlockTime;
    }
}
exports.RawCoinbaseTransaction = RawCoinbaseTransaction;
class RawTransaction extends RawCoinbaseTransaction {
    constructor(keyOutputs, hash, transactionPublicKey, unlockTime, paymentID, keyInputs) {
        super(keyOutputs, hash, transactionPublicKey, unlockTime);
        this.paymentID = paymentID;
        this.keyInputs = keyInputs;
    }
}
exports.RawTransaction = RawTransaction;
class Transaction {
    static fromJSON(json) {
        const transaction = Object.create(Transaction.prototype);
        return Object.assign(transaction, json, {
            transfers: new Map(json.transfers.map((x) => [x.publicKey, x.amount])),
            hash: json.hash,
            fee: json.fee,
            blockHeight: json.blockHeight,
            timestamp: json.timestamp,
            paymentID: json.paymentID,
            unlockTime: json.unlockTime,
            isCoinbaseTransactions: json.isCoinbaseTransaction,
        });
    }
    constructor(transfers, hash, fee, blockHeight, timestamp, paymentID, unlockTime, isCoinbaseTransaction) {
        this.transfers = transfers;
        this.hash = hash;
        this.fee = fee;
        this.blockHeight = blockHeight;
        this.timestamp = timestamp;
        this.paymentID = paymentID;
        this.unlockTime = unlockTime;
        this.isCoinbaseTransaction = isCoinbaseTransaction;
    }
    toJSON() {
        return {
            transfers: JsonSerialization_1.transfersToVector(this.transfers),
            hash: this.hash,
            fee: this.fee,
            blockHeight: this.blockHeight,
            timestamp: this.timestamp,
            paymentID: this.paymentID,
            unlockTime: this.unlockTime,
            isCoinbaseTransaction: this.isCoinbaseTransaction,
        };
    }
}
exports.Transaction = Transaction;
class TransactionInput {
    static fromJSON(json) {
        const transactionInput = Object.create(TransactionInput.prototype);
        return Object.assign(transactionInput, json, {
            keyImage: json.keyImage,
            amount: json.amount,
            blockHeight: json.blockHeight,
            transactionPublicKey: json.transactionPublicKey,
            transactionIndex: json.transactionIndex,
            globalOutputIndex: json.globalOutputIndex,
            key: json.key,
            spendHeight: json.spendHeight,
            unlockTime: json.unlockTime,
            parentTransactionHash: json.parentTransactionHash,
        });
    }
    constructor(keyImage, amount, blockHeight, transactionPublicKey, transactionIndex, globalOutputIndex, key, spendHeight, unlockTime, parentTransactionHash) {
        this.keyImage = keyImage;
        this.amount = amount;
        this.blockHeight = blockHeight;
        this.transactionPublicKey = transactionPublicKey;
        this.transactionIndex = transactionIndex;
        this.globalOutputIndex = globalOutputIndex;
        this.key = key;
        this.spendHeight = spendHeight;
        this.unlockTime = unlockTime;
        this.parentTransactionHash = parentTransactionHash;
    }
    toJSON() {
        return {
            keyImage: this.keyImage,
            amount: this.amount,
            blockHeight: this.blockHeight,
            transactionPublicKey: this.transactionPublicKey,
            transactionIndex: this.transactionIndex,
            globalOutputIndex: this.globalOutputIndex,
            key: this.key,
            spendHeight: this.spendHeight,
            unlockTime: this.unlockTime,
            parentTransactionHash: this.parentTransactionHash,
        };
    }
}
exports.TransactionInput = TransactionInput;
/* A structure just used to display locked balance, due to change from
   sent transactions. We just need the amount and a unique identifier
   (hash+key), since we can't spend it, we don't need all the other stuff */
class UnconfirmedInput {
    static fromJSON(json) {
        const unconfirmedInput = Object.create(UnconfirmedInput.prototype);
        return Object.assign(unconfirmedInput, json, {
            amount: json.amount,
            key: json.key,
            parentTransactionHash: json.parentTransactionHash,
        });
    }
    constructor(amount, key, parentTransactionHash) {
        this.amount = amount;
        this.key = key;
        this.parentTransactionHash = parentTransactionHash;
    }
    toJSON() {
        return {
            amount: this.amount,
            key: this.key,
            parentTransactionHash: this.parentTransactionHash,
        };
    }
}
exports.UnconfirmedInput = UnconfirmedInput;
class KeyOutput {
    constructor(key, amount) {
        this.key = key;
        this.amount = amount;
    }
}
exports.KeyOutput = KeyOutput;
class KeyInput {
    constructor(amount, keyImage, outputIndexes) {
        this.amount = amount;
        this.keyImage = keyImage;
        this.outputIndexes = outputIndexes;
    }
}
exports.KeyInput = KeyInput;
class TransactionData {
    constructor() {
        this.transactionsToAdd = [];
        /* Mapping of public spend key to inputs */
        this.inputsToAdd = [];
        /* Mapping of public spend key to key image */
        this.keyImagesToMarkSpent = [];
    }
}
exports.TransactionData = TransactionData;
