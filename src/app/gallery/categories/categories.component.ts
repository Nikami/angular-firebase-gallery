import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { IFGalleryCategory } from '../../shared/shared.models';
import { Subscription } from 'rxjs/internal/Subscription';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddCategoryComponent } from './add-category/add-category.component';
import {
  MessageDialogActions,
  MessageDialogComponent
} from '../../shared/components/message-dialog/message-dialog.component';
import { RenameCategoryComponent } from './rename-category/rename-category.component';

@Component({
  selector: 'afg-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit, OnDestroy {
  @HostBinding('class') classList: string = 'd-flex flex-column w-100';

  public ctgs: IFGalleryCategory[] = [];
  public editMode: boolean = false;

  private categoriesSubscription: Subscription;

  constructor(private categories: CategoriesService,
              private cdRef: ChangeDetectorRef,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.subscribeToCategories();
  }

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
  }

  openAddCategoryDialog(): void {
    this.dialog.closeAll();
    this.dialog.open(AddCategoryComponent, {
      maxWidth: '450px',
      panelClass: 'dialog-primary'
    });
  }

  openRemoveDialog(category: IFGalleryCategory): void {
    this.dialog.closeAll();
    const dialogRef: MatDialogRef<MessageDialogComponent> = this.dialog.open(MessageDialogComponent, {
      maxWidth: '350px',
      panelClass: 'dialog-accent',
      data: {
        message: 'DIALOG.REMOVE_CATEGORY',
        translateParams: {
          name: category.name
        },
        actions: [MessageDialogActions.OK, MessageDialogActions.CANCEL]
      }
    });

    dialogRef.afterClosed().subscribe((isRemovalAccepted: boolean) => {
      if (isRemovalAccepted) {
        this.categories.remove(category).subscribe();
      }
    });
  }

  openRenameDialog(category: IFGalleryCategory): void {
    this.dialog.closeAll();
    this.dialog.open(RenameCategoryComponent, {
      maxWidth: '450px',
      panelClass: 'dialog-primary',
      data: { category }
    });
  }

  private subscribeToCategories(): void {
    this.categoriesSubscription = this.categories.get().subscribe((categories: IFGalleryCategory[]) => {
      this.ctgs = categories;
      this.cdRef.detectChanges();
    });
  }
}
