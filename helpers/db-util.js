import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://raw2002:soxaOFaVBk5IWsWj@cluster0.7ueiz.mongodb.net/events?retryWrites=true&w=majority'
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find()
    // .sort({ _id: -1 }) // sort in descending order (last is first)
    .sort(sort)
    .toArray();

  return documents;
}
