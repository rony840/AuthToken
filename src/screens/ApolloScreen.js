import { StyleSheet, SafeAreaView, FlatList, View, ActivityIndicator, Text, Alert, TextInput } from 'react-native';
import TextDisplay from '../components/TextDisplay';
import Background from '../components/Background';
import { gql, useQuery, useMutation, useSubscription } from "@apollo/client";
import FormButton from '../components/FormButton';
import ListItem from '../components/ListItem';
import { useState } from 'react';

const GET_BOOKS = gql`
  query books {
    books {
      id
      name
    }
  }
`;

const BOOKS_SUBSCRIPTION = gql`
  subscription onBookAdded {
    bookAdded {
      id
      name
    }
  }
`;

const EDIT_BOOK = gql`
  mutation editBook($id: ID!, $name: String!) {
    editBook(id: $id, name: $name) {
      id
      name
    }
  }
`;

const CREATE_BOOK = gql`
  mutation createBook($name: String!) {
    createBook(book:{name:$name, publisherId:"publisherid"}) {
      id
      name
    }
  }
`;

const Apollo = () => {
  const { loading, error, data, refetch } = useQuery(GET_BOOKS);
  const [editBook] = useMutation(EDIT_BOOK);
  const [createBook] = useMutation(CREATE_BOOK);
  const [bookName, setBookName] = useState('');

  // Subscription for real-time updates
  useSubscription(BOOKS_SUBSCRIPTION, {
    onData: ({ client, data }) => {
      const newBook = data.data.bookAdded;
      client.cache.modify({
        fields: {
          books(existingBooks = []) {
            return [...existingBooks, newBook];
          }
        }
      });
    }
  });

  // Edit book function
  const handleEditBook = (id) => {
    const newName = prompt('Enter new book name:', '');
    if (!newName) return;

    editBook({
      variables: { id, name: newName },
      optimisticResponse: {
        editBook: { id, name: newName, __typename: 'Book' }
      },
      update: (cache, { data: { editBook } }) => {
        const existingBooks = cache.readQuery({ query: GET_BOOKS });
        if (existingBooks) {
          cache.writeQuery({
            query: GET_BOOKS,
            data: {
              books: existingBooks.books.map(book => (book.id === id ? editBook : book))
            }
          });
        }
      }
    });
  };

  // Create new book function
  const handleCreateBook = () => {
    if (!bookName.trim()) {
      Alert.alert("Error", "Book name cannot be empty");
      return;
    }

    createBook({
      variables: { name: bookName },
      optimisticResponse: {
        createBook: { id: Math.random().toString(), name: bookName, __typename: 'Book' }
      },
      update: (cache, { data: { createBook } }) => {
        const existingBooks = cache.readQuery({ query: GET_BOOKS });
        if (existingBooks) {
          cache.writeQuery({
            query: GET_BOOKS,
            data: {
              books: [...existingBooks.books, createBook]
            }
          });
        }
      }
    });

    setBookName('');
  };

  const renderBooks = ({ item }) => (
    <ListItem
      id={item.id}
      title={item.name}
      onEdit={() => handleEditBook(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <View style={styles.contentContainer}>
        <TextDisplay txt="Apollo Screen" />
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {error && <Text style={{ color: 'red' }}>Error: {error.message}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Enter book name"
          value={bookName}
          onChangeText={setBookName}
        />
        <FormButton title="Add Book" onPress={handleCreateBook} />

        <View style={styles.bodyContainer}>
          <FlatList
            data={data?.books || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderBooks}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>

        <FormButton title="Refetch Books" onPress={() => refetch()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  bodyContainer: {
    flex: 1,
    marginTop: 20,
  },
  flatListContainer: {
    paddingBottom: 20,
  },
});

export default Apollo;
