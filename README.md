# postman-collection-parser

Library that converts a Postman collection into a directory structure with test files.
- The directory structure generated corresponds to the folders in the Postman collection.
- Each request specification in the Postman collection gives rise to a file in the appropriate directory.
- File names and directory names are escaped so that the '/' character is replaced by a '|'.
- The core library function takes as a parameter a template function that defines the layout of the test files produced.
- See the `src/examples` directory for a complete example.

