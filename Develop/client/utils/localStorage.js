// localStorage.js

// Function to store saved book IDs
export const saveBookIds = (bookIds) => {
  localStorage.setItem('savedBooks', JSON.stringify(bookIds));
};

// Function to retrieve saved book IDs
export const getSavedBookIds = () => {
  const savedBooks = localStorage.getItem('savedBooks');
  return savedBooks ? JSON.parse(savedBooks) : [];
};

// Function to remove a book ID from LocalStorage
export const removeBookId = (bookId) => {
  const savedBooks = getSavedBookIds();
  const updatedBooks = savedBooks.filter((id) => id !== bookId);
  saveBookIds(updatedBooks);
};
