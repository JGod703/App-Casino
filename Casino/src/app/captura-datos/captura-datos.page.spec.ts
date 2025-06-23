import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapturaDatosPage } from './captura-datos.page';

describe('CapturaDatosPage', () => {
  let component: CapturaDatosPage;
  let fixture: ComponentFixture<CapturaDatosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CapturaDatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
