import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessLetterComponent } from './guess-letter.component';

describe('GuessLetterComponent', () => {
  let component: GuessLetterComponent;
  let fixture: ComponentFixture<GuessLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessLetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
