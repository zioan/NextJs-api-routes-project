function handler(req, res) {
  const eventId = req.query.eventId;

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
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    console.log(newComment);
    res.status(201).json({ message: 'Comment added!', comment: newComment });
  }

  if (req.method === 'GET') {
    const dummyList = [
      { id: 1, name: 'Ioan', text: 'My comment...', email: 'test@gmail.com' },
      { id: 2, name: 'Bob', text: 'Feedback...', email: 'bob@email.com' },
    ];

    res.status(200).json({ comments: dummyList });
  }
}

export default handler;
