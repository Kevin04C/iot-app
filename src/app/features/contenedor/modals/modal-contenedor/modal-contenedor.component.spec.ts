import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContenedorComponent } from './modal-contenedor.component';

describe('ModalContenedorComponent', () => {
  let component: ModalContenedorComponent;
  let fixture: ComponentFixture<ModalContenedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalContenedorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalContenedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
