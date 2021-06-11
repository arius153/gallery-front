import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { ImageResponseDTO } from '../_models/image-response-dto';
import { AutheticationService } from '../_services/authetication.service';
import { ImageService } from '../_services/image.service';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-images-search',
  templateUrl: './images-search.component.html',
  styleUrls: ['./images-search.component.css']
})
export class ImagesSearchComponent implements OnInit {

  images$!: Observable<ImageResponseDTO[]>;
  private searchTerms = new Subject<string>();
  term?:string; 
  length: number = 0;
  pageSize: number = 12;
  pageIndex: number = 0;
  
  
  constructor(private imageService: ImageService, public authService: AutheticationService, private route: ActivatedRoute,
    private location: Location) { }


  search(term: string): void {
    this.term = term;
    this.pageIndex = 0;
    this.searchTerms.next(term);
    this.getImageCount(term);
  }

  ngOnInit(): void {
    

    this.images$ = this.searchTerms.pipe(
      debounceTime(300),
      //distinctUntilChanged(),
      switchMap((term: string) => this.imageService.searchImages(term, this.pageIndex))
    );

    const searchParam = String(this.route.snapshot.paramMap.get('searchParam'));
    if (searchParam != "null")
    {
      setTimeout(() => this.search(searchParam), 0);
      this.getImageCount(searchParam);
    } else {
      setTimeout(() => this.search(""), 0);
      this.getImageCount("");
    }
  }

  delete(image: ImageResponseDTO): void {
    this.imageService.deleteImage(image.id).subscribe();
    this.length -= 1;
    this.searchTerms.next(this.term);
  }

  pageChange(event: PageEvent)
  {
    this.pageIndex = event.pageIndex;
    this.searchTerms.next(this.term);
  }

  getImageCount(term?: string) {
    this.imageService.getCount(term).subscribe(imageCount => {
      this.length = imageCount;
    })
  }

}
