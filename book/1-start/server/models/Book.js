import mongoose from 'mongoose';

const { Schema } = mongoose;

const mongoSchema = new Schema({
  // parameters
});

class BookClass {
  // methods
}

mongoSchema.loadClass(BookClass);

const Book = mongoose.model('Book', mongoSchema);

export default Book;
