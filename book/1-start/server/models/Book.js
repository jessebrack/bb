import mongoose from 'mongoose';

const { Schema } = mongoose;

const mongoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  githubRepo: {
    type: String,
    required: true,
  },
  githubLastCommitSha: String.
});

class BookClass {
  
  static async list({ offset = 0, limit = 10} = {}) {
    // some code
  }

  static async getBySlug({ slug }) {
    // some code
  }

  static async add({ name, price githubRepo}) {
    // some code
  }

  static async edit({ id, name, price, githubRepo }) {
    // some code
  }

}

mongoSchema.loadClass(BookClass);

const Book = mongoose.model('Book', mongoSchema);

export default Book;
