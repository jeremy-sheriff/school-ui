import {Component} from '@angular/core';
import {LibraryService} from "../../services/library/library.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-library-component',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        FormsModule,
        NgClass,
        RouterLink
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
  newBook = { bookTitle: '', bookAuthor: '' ,bookIsbn:''}; // New book model

  showIssueModal = false;
  isIssueClosing = false;

  showReturnModal = false;
  isReturnClosing = false;

  page = 0; // Current page index
  size = 10; // Page size
  totalPages = 1; // Total number of pages
  totalElements = 0; // Total number of students

  issueBookForm = {
    admNo: '',     // Admission Number
    bookIsbn: '',   // Book ISBN
    expectedDate: ''   // Book ISBN
  };

  returnBookForm = {
    admNo: '',     // Admission Number
    bookIsbn: '',   // Book ISBN
  };

  minDate: string;

  constructor(private libraryService: LibraryService) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.fetchBooks(this.page, this.size);
  }

  // Fetch books using the service
  fetchBooks(page: number, size: number) {
    this.libraryService.getBooks(page, size).subscribe({
      next: (response) => {
        this.books = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.loading = false; // Hide loader when data is fetched
      },
      error: (err) => {
        this.errorMessage = 'Error fetching books';
        this.loading = false; // Hide loader on error
        console.error(err);
      }
    });
  }

  // Method to open the Issue Book modal
  openIssueModal() {
    this.showIssueModal = true;
    this.isIssueClosing = false;  // Reset closing state
  }

  // Method to open the Issue Book modal
  openReturnModal() {
    this.showReturnModal = true;
    this.isReturnClosing = false;  // Reset closing state
  }

  // Method to close the Issue Book modal with animation
  closeIssueModal() {
    this.isIssueClosing = true;
    setTimeout(() => {
      this.showIssueModal = false;
      this.isIssueClosing = false;
      this.issueBookForm = { admNo: '', bookIsbn: '' ,expectedDate:''};  // Reset form fields
    }, 500);  // Match the duration of the closing animation (0.5s)
  }

  // Method to close the Issue Book modal with animation
  closeReturnModal() {
    this.isReturnClosing = true;
    setTimeout(() => {
      this.showReturnModal = false;
      this.isReturnClosing = false;
      this.returnBookForm = { admNo: '', bookIsbn: ''};  // Reset form fields
    }, 500);  // Match the duration of the closing animation (0.5s)
  }

  // Open modal to create a book
  openModal() {
    this.showModal = true;
  }

  issueBook() {
    if (this.issueBookForm.admNo && this.issueBookForm.bookIsbn) {
      // Call the service method to issue the book
      this.libraryService.issueBook(this.issueBookForm).subscribe({
        next: (data) => {
          console.log('Book successfully issued:', data);
          this.closeIssueModal();  // Close the modal after successful issuing
        },
        error: (err) => {
          console.error('Error issuing book:', err);
        }
      });
    }
  }

  returnBook() {
    if (this.returnBookForm.admNo && this.returnBookForm.bookIsbn) {
      console.log(this.returnBookForm);
      // Call the service method to issue the book
      this.libraryService.returnBook(this.returnBookForm).subscribe({
        next: (data) => {
          console.log('Book successfully returned:', data);
          this.closeReturnModal();  // Close the modal after successful issuing
        },
        error: (err) => {
          console.error('Error returning the book:', err);
        }
      });
    }
  }

  closeModal() {
    this.isClosing = true;  // Start the closing animation
    setTimeout(() => {
      this.showModal = false;  // Hide the modal after the animation
      this.isClosing = false;  // Reset the closing state
      this.newBook = { bookTitle: '', bookAuthor: '', bookIsbn: ''}; // Reset the form
    }, 500);  // Match the duration of your closing animation (0.5s)
  }



  // Create a new book
  createBook() {
    if (this.newBook.bookTitle && this.newBook.bookAuthor && this.newBook.bookIsbn) {
      // // Assuming libraryService has a method to add a book, this should be replaced with an actual service call
      this.libraryService.createBook(this.newBook).subscribe({
        next: (book) => {
          this.fetchBooks(this.page, this.size);
          // this.books.push(this.newBook); // Add the new book to the list
          this.closeModal(); // Close the modal after submission
        },
        error: (err) => {
          this.errorMessage = 'Error adding book';
          console.error(err);
        }
      });
    }
  }

  onSubmit() {

  }

  // Change page
  changePage(newPage: number) {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.fetchBooks(this.page, this.size);
    }
  }
}
