import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReestablishPage } from './reestablish.page';

describe('ReestablishPage', () => {
  let component: ReestablishPage;
  let fixture: ComponentFixture<ReestablishPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReestablishPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReestablishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
