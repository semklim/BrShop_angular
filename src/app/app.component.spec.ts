import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: AppComponent;
  beforeEach(() => {
    fixture = new AppComponent();
  });

  it('should create the app', () => {
    expect(fixture).toBeTruthy();
  });

  it(`should have as title 'WebShop'`, () => {
    const title = fixture.title;
    expect(title).toEqual('WebShop');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('WebShop app is running!');
  // });
});
