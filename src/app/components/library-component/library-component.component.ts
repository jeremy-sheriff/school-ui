import {Component} from '@angular/core';
import {LibraryService} from "../../services/library/library.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-library-component',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    NgClass
  ],
  templateUrl: './library-component.component.html',
  styleUrls: ['./library-component.component.css'] // Fix typo from `styleUrl` to `styleUrls`
})
export class LibraryComponentComponent {
  isClosing = false; // Controls the closing animation state
  books: any[] = []; // Store book data
  errorMessage: string | null = null; // Store any error message
  loading: boolean = true; // Loading state to show/hide the loader
  showModal: boolean = false; // State to control the modal visibility
  newBook = { title: '', author: '' ,isbn:'',borrowed:''}; // New book model

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  // Fetch books using the service
  fetchBooks() {
    this.libraryService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false; // Hide loader when data is fetched
      },
      error: (err) => {
        this.errorMessage = 'Error fetching books';
        this.loading = false; // Hide loader on error
        console.error(err);
      }
    });
  }

  // Open modal to create a book
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.isClosing = true;  // Start the closing animation
    setTimeout(() => {
      this.showModal = false;  // Hide the modal after the animation
      this.isClosing = false;  // Reset the closing state
      this.newBook = { title: '', author: '', isbn: '', borrowed: '' }; // Reset the form
    }, 500);  // Match the duration of your closing animation (0.5s)
  }



  // Create a new book
  createBook() {
    if (this.newBook.title && this.newBook.author) {
      // // Assuming libraryService has a method to add a book, this should be replaced with an actual service call
      // this.libraryService.addBook(this.newBook).subscribe({
      //   next: (book) => {
      //     this.books.push(book); // Add the new book to the list
      //     this.closeModal(); // Close the modal after submission
      //   },
      //   error: (err) => {
      //     this.errorMessage = 'Error adding book';
      //     console.error(err);
      //   }
      // });
    }
  }

  onSubmit() {

  }
}
