import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { ImageResponseDTO } from '../_models/image-response-dto';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';
import { ImageAddDTO } from '../_models/image-add-dto';



@Injectable({
  providedIn: 'root'
})
export class ImageService {
  
 
  

  private imagesUrl = 'http://localhost:8080/images';
  
  constructor(private http: HttpClient) { }

  getImages(page?: number, searchParams?: string): Observable<ImageResponseDTO[]> {

    let pageForHttpRequest;
    if (page)
    {
      pageForHttpRequest = new HttpParams().set("page", page);
      console.log(`Mes esam puslapy: ` + page);
      console.log(pageForHttpRequest.toString());
    }
    if (page && searchParams) {
      pageForHttpRequest = new HttpParams().set("page",page).set("searchParams", searchParams);
    }
    
    
    return this.http.get<ImageResponseDTO[]>(this.imagesUrl, {params: pageForHttpRequest}).pipe(
      tap(_ => console.log("we are trying to get images"))
    );
  }

  getImage(id: number): Observable<ImageResponseDTO> {
    return this.http.get<ImageResponseDTO>(this.imagesUrl + `/data/${id}`).pipe(
      tap(_ => console.log(`we are trying to get an image with id: ${id}`))
    );
  }

  searchImages(term: string): Observable<ImageResponseDTO[]> {
    if (!term.trim())
    {
      return of([]);
    }
    return this.http.get<ImageResponseDTO[]>(this.imagesUrl + `?searchParams=${term}`).pipe(
      tap(x => x.length ? 
        console.log(`found heroes matching ${term}`) :
        console.log(`no heroes matching "${term}"`))
    );
  }

  deleteImage(id: number): Observable<ImageResponseDTO> {
    const url = this.imagesUrl + `/${id}`;
    return this.http.delete<ImageResponseDTO>(url).pipe(
      tap(_ => console.log(`Deleted image with id=${id}`))
    );
  }

  uploadImage(model: ImageAddDTO, selectedFile: File): Observable<number> {
    console.log("Mes esame servise?");
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("imageAddDTO", JSON.stringify(model)); 
    return this.http.post<number>(this.imagesUrl, formData);
  }

  updateImage(id: number, selectedFile: File | undefined, model: any) {
    const url = this.imagesUrl + `/${id}`;
    const formData = new FormData();
    if (selectedFile)
    {
      formData.append("image", selectedFile);
    }
    formData.append("imageModifyDTO", JSON.stringify(model));
    return this.http.put(url, formData);
  }

  getCount(searchParams?:string): Observable<number> {
    let httpParams;
    
    if (searchParams)
    {
      httpParams = new HttpParams().set("searchParams", searchParams);
    }
    return this.http.get<number>(this.imagesUrl + "/count", {params: httpParams});
    
  }
}
