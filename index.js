const { ApolloServer, gql } = require("apollo-server");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    longestRaisingSequence(sequence: [Int!]!): [Int]
  }
`;

const getLongestRaisingSequence = (sequence) => {
  if (sequence.length <= 1) return sequence;
  if (sequence.length > 1) {
    let frontIndex = 1;
    let rearIndex = 0;
    let currentLongestLen = 1;
    let currentLongestRear = 0;
    let currentLongestFront = 1;
    let len = 0;
    while (frontIndex < sequence.length) {
      if (sequence[frontIndex] > sequence[frontIndex - 1]) {
        frontIndex++;
        len = frontIndex - rearIndex;
        if (len > currentLongestLen) {
          currentLongestLen = len;
          currentLongestRear = rearIndex;
          currentLongestFront = frontIndex;
        }
      } else {
        rearIndex = frontIndex;
        frontIndex++;
      }
    }
    return sequence.slice(currentLongestRear, currentLongestFront);
  }
};

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    longestRaisingSequence: (root, args, context) => {
      return getLongestRaisingSequence(args.sequence);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
