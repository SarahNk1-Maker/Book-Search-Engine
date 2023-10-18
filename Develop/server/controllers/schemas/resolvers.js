const { User, Book } = require('../../models'); // Import your Mongoose models

const resolvers = {
  Query: {
    getMe: async (_, __, context) => {
      if (context.user) {
        // If a user is authenticated, return their user information
        const user = await User.findById(context.user._id);
        return user;
      }
      throw new Error('Not authenticated');
    },
  },
  Mutation: {
    loginUser: async (_, { email, password }) => {
      // Implement your authentication logic here
      // Verify email and password, generate a token, and return it along with the user
      // Example logic (this is for demonstration, you should use a secure authentication method):
      const user = await User.findOne({ email });

      if (!user || user.password !== password) {
        throw new Error('Invalid credentials');
      }

      const token = 'your_auth_token'; // Generate a token
      return { token, user };
    },

    createUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      // Generate a token for the new user (similar to the login mutation) and return it with the user
      const token = 'your_auth_token'; // Generate a token
      return { token, user };
    },

    saveBook: async (_, { input }, context) => {
      if (context.user) {
        // Add the book to the user's savedBooks
        const user = await User.findByIdAndUpdate(
          context.user._id,
          {
            $addToSet: { savedBooks: input },
          },
          { new: true }
        );

        return user;
      }
      throw new Error('Not authenticated');
    },

    removeBook: async (_, { bookId }, context) => {
      if (context.user) {
        // Remove the book from the user's savedBooks
        const user = await User.findByIdAndUpdate(
          context.user._id,
          {
            $pull: { savedBooks: { bookId } },
          },
          { new: true }
        );

        return user;
      }
      throw new Error('Not authenticated');
    },
  },
};

module.exports = resolvers;

