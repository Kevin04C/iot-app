import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaContenedoresComponent } from './lista-contenedores.component';

describe('ListaContenedoresComponent', () => {
  let component: ListaContenedoresComponent;
  let fixture: ComponentFixture<ListaContenedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaContenedoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaContenedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
