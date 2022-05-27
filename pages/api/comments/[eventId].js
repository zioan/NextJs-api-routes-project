import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from '../../../helpers/db-util';

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      // 422 - invalid input
      res.status(422).json({ message: 'Invalid or empty fields' });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'Comment added!', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
    }
  }

  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(client, 'comments', { _id: -1 });
      res.status(200).json({ comments: documents });
      // {_id: -1} // sort in descending order (last is first)
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed' });
      return;
    }
  }

  client.close();
}

export default handler;
