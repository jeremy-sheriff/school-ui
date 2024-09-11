import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryComponentComponent } from './library-component.component';

describe('LibraryComponentComponent', () => {
  let component: LibraryComponentComponent;
  let fixture: ComponentFixture<LibraryComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
