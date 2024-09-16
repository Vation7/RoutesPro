const mongoose = require('mongoose');
const { User, Thought } = require('./models');
const db = require('./config/connection');

// Sample data
const userData = [
  {
    username: 'john_doe',
    email: 'john@example.com',
  },
  {
    username: 'jane_doe',
    email: 'jane@example.com',
  },
  {
    username: 'alice_smith',
    email: 'alice@example.com',
  },
  {
    username: 'bob_jones',
    email: 'bob@example.com',
  },
];

const thoughtData = [
  {
    thoughtText: 'This is a thought from John!',
    username: 'john_doe',
  },
  {
    thoughtText: 'This is another thought from John!',
    username: 'john_doe',
  },
  {
    thoughtText: 'This is a thought from Jane!',
    username: 'jane_doe',
  },
  {
    thoughtText: 'Alice shares a thought!',
    username: 'alice_smith',
  },
  {
    thoughtText: 'Bob has an interesting thought!',
    username: 'bob_jones',
  },
  {
    thoughtText: 'Bob shares another thought!',
    username: 'bob_jones',
  },
];

const reactionData = [
  {
    reactionBody: 'Great thought!',
    username: 'jane_doe',
  },
  {
    reactionBody: 'Interesting!',
    username: 'alice_smith',
  },
  {
    reactionBody: 'I disagree',
    username: 'bob_jones',
  },
  {
    reactionBody: 'Nice one!',
    username: 'john_doe',
  },
];

db.once('open', async () => {
  try {
    // Clear the database
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Insert sample users
    const users = await User.insertMany(userData);

    // Insert sample thoughts and add reactions to some thoughts
    for (let i = 0; i < thoughtData.length; i++) {
      const thought = await Thought.create(thoughtData[i]);
      // Add a reaction to each thought
      const reactionIndex = i % reactionData.length; // Cycle through reactionData
      thought.reactions.push(reactionData[reactionIndex]);
      await thought.save();

      // Associate thoughts with users
      await User.findOneAndUpdate(
        { username: thought.username },
        { $push: { thoughts: thought._id } }
      );
    }

    // Add friends to some users
    await User.findOneAndUpdate(
      { username: 'john_doe' },
      { $push: { friends: users[1]._id, friends: users[2]._id } } // Adding jane_doe and alice_smith as friends
    );

    await User.findOneAndUpdate(
      { username: 'jane_doe' },
      { $push: { friends: users[0]._id, friends: users[3]._id } } // Adding john_doe and bob_jones as friends
    );

    await User.findOneAndUpdate(
      { username: 'alice_smith' },
      { $push: { friends: users[3]._id } } // Adding bob_jones as a friend
    );

    console.log('Database seeded successfully with larger data set!');
  } catch (error) {
    console.error(error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
});