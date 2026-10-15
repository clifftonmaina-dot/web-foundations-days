# Library API Design: Books Resource

## Endpoints

### 1. List all books
* **Method:** GET
* **Path:** `/api/books`
* **Description:** Retrieves a full list of all books in the library.
* **Success Status Code:** 200 OK

### 2. Get a single book
* **Method:** GET
* **Path:** `/api/books/:id`
* **Description:** Retrieves the details of a specific book by its unique ID.
* **Success Status Code:** 200 OK

### 3. List books by author
* **Method:** GET
* **Path:** `/api/books?author=name`
* **Description:** Retrieves a list of books filtered by a specific author using a query parameter.
* **Success Status Code:** 200 OK

### 4. Create a new book
* **Method:** POST
* **Path:** `/api/books`
* **Description:** Adds a new book to the library database.
* **Example Request Body:**
  ```json
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "published_year": 1925
  }