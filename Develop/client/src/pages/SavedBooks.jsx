import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Container,
  Card,
  Button,
  Row,
  Col,
} from 'react-bootstrap';

import { GET_ME } from '../../utils/queries'; // Replace with the actual import path for GET_ME query
import { REMOVE_BOOK } from '../../utils/mutations'; // Replace with the actual import path for REMOVE_BOOK mutation
//import { removeBookId } from '../../utils/localStorage';
import Auth from '../../utils/auth';

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);

  const [removeBook] = useMutation(REMOVE_BOOK);

  const userData = data?.me || {};

  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeBook({
        variables: {
          bookId,
        },
      });

      // Filter out the deleted book from the savedBooks array
      const updatedUser = { ...userData };
      updatedUser.savedBooks = updatedUser.savedBooks.filter(
        (book) => book.bookId !== bookId
      );
      
      // Update the user data
      // Note: This is a temporary solution. In a production environment, you should use the Apollo Client cache for this
      // You can also refetch the user data with the GET_ME query

      // Set the updated user data
      // Note: Avoid direct state mutations. In a production environment, use state management libraries like Redux
      data.me = updatedUser;

      // Remove the book's ID from local storage
      removeBook(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border='dark'>
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;

