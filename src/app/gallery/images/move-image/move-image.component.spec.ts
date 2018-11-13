import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveImageComponent } from './move-image.component';

describe('MoveImageComponent', () => {
  let component: MoveImageComponent;
  let fixture: ComponentFixture<MoveImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoveImageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
