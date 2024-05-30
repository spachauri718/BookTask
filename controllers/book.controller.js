const db = require('../models');
const Book = db.Book;
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');


exports.uploadBooks = async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }

  const filePath = path.resolve(__dirname, '../uploads/', req.file.filename);

  console.log(`File uploaded to: ${filePath}`);

  try {
    const books = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        row.sellerId = req.userId;
        books.push(row);
      })
      .on('end', async () => {
        try {
          await Book.bulkCreate(books);
          res.status(200).send({ message: 'Books uploaded successfully!' });
        } catch (error) {
          res.status(500).send({ message: `Book upload failed: ${error.message}` });
        } finally {
          // Clean up the uploaded file
          fs.unlinkSync(filePath, (err) => {
            if (err) {
              console.error(`Failed to delete file: ${filePath}`, err);
            }
          });
        }
      })
      .on('error', (error) => {
        res.status(500).send({ message: `Error processing CSV file: ${error.message}` });
      });
  } catch (error) {
    res.status(500).send({ message: `Book upload failed: ${error.message}` });
  }
};









exports.getBooksBySeller = async (req, res) => {
  try {
    const books = await Book.findAll({ where: { sellerId: req.userId } });
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findOne({ where: { id: req.params.id, sellerId: req.userId } });
    if (!book) {
      return res.status(404).send({ message: 'Book not found or unauthorized' });
    }
    await book.update(req.body);
    res.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findOne({ where: { id: req.params.id, sellerId: req.userId } });
    if (!book) {
      return res.status(404).send({ message: 'Book not found or unauthorized' });
    }
    await book.destroy();
    res.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }
    res.status(200).send(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
