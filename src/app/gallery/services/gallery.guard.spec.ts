import { TestBed, async, inject } from '@angular/core/testing';

import { GalleryGuard } from './gallery.guard';

describe('GalleryGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GalleryGuard]
    });
  });

  it('should ...', inject([GalleryGuard], (guard: GalleryGuard) => {
    expect(guard).toBeTruthy();
  }));
});
