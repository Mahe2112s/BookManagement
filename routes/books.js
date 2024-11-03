const express = require("express");
const { books } = require("../Data/Books.json");
const { users } = require("../Data/users.json");
const router = express.Router();

/**
 * Route : /books
 * Method : GET
 * Description : Get all books
 * Access : Public
 * Parameter : None
 */

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: books,
  });
});

/**
 * Route : /books/issued
 * Method : GET
 * Description : GET all issued books
 * Access : Public
 * Parameter : id
 */

router.get("/issued", (req, res) => {
  const user_IssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });

  const IssuedBooks = [];

  user_IssuedBook.forEach((each) => {
    const book = books.find((e) => e.id === each.issuedBook);

    book.id = each.issuedBook;
    book.issuedto = each.name;
    book.issedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    IssuedBooks.push(book);
    console.log(IssuedBooks);
  });
  if (IssuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Book is not issued yet",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User With Issued Books",
    data: IssuedBooks,
  });
});

/**
 * Route : /books/:id
 * Method : GET
 * Description : Get book by it ID
 * Access : Public
 * Parameter : ID(user)
 */

//htpps://localhost:8081/users/id -> this url is always an request.
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book Not Found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Book Found",
    data: book,
  });
});

/**
 * Route : /users/
 * Method : POST
 * Description : Creating a new book
 * Access : Public
 * Parameter : None
 */
router.post("/", (req, res) => {
  const { id, name, author, genre, price, publisher } = req.body;

  const book = books.find((each) => each.id === id);
  if (book) {
    return res.status(404).json({
      success: false,
      message: "Book Already Exist",
    });
  }
  books.push({
    id,
    name,
    author,
    genre,
    price,
    publisher,
  });
  res.status(201).json({
    success: true,
    message: "Book added successfully",
    data: books,
  });
});

/**
 * Route : /books/:id
 * Method : PUT
 * Description : Updating book by id
 * Access : Public
 * Parameter : id
 */

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Id doesn't exist",
    });
  }
  const updateBookData = books.map((each) => {
    if (each.id === id) {
      return {
        ...book,
        ...data,
      };
    }
    return each;
  });
  return res.status(201).json({
    success: true,
    message: "Book Added Succesfully",
    data: updateBookData,
  });
});

/**
 * Route : /books/:id
 * Method : DELETE
 * Description : Delete book by id
 * Access : Public
 * Parameter : id
 */

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book with ID doesn't exist",
    });
  }
  const bookIndex = books.indexOf(book);
  books.splice(bookIndex, 1);
  return res.status(200).json({
    success: true,
    message: "Book deleted successfully",
    data: books,
  });
});

module.exports = router;
