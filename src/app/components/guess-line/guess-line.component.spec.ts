import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessLineComponent } from './guess-line.component';

describe('GuessLineComponent', () => {
  let component: GuessLineComponent;
  let fixture: ComponentFixture<GuessLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
