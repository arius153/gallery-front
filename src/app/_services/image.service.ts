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
    }
    if (page && searchParams) {
      pageForHttpRequest = new HttpParams().set("page",page).set("searchParams", searchParams);
    }
    
    
    return this.http.get<ImageResponseDTO[]>(this.imagesUrl, {params: pageForHttpRequest}).pipe(
      catchError(this.handleError<ImageResponseDTO[]>("Getting all images", []))
    );
  }

  getImage(id: number): Observable<ImageResponseDTO> {
    return this.http.get<ImageResponseDTO>(this.imagesUrl + `/data/${id}`).pipe(
      catchError(this.handleError<ImageResponseDTO>("Getting single image"))
    );
  }

  searchImages(term: string, page?: number): Observable<ImageResponseDTO[]> {
    if (!term)
    {
      term = "";
    }
    if (page)
    {
      return this.http.get<ImageResponseDTO[]>(this.imagesUrl + `?searchParams=${term}` + `&page=${page}`).pipe(catchError(this.handleError<ImageResponseDTO[]>("Searching images", [])));
      
    } else {
      return this.http.get<ImageResponseDTO[]>(this.imagesUrl + `?searchParams=${term}`).pipe(catchError(this.handleError<ImageResponseDTO[]>("Searching images", [])));
    }
  }

  deleteImage(id: number): Observable<ImageResponseDTO> {
    const url = this.imagesUrl + `/${id}`;
    return this.http.delete<ImageResponseDTO>(url).pipe(catchError(this.handleError<ImageResponseDTO>("deleting an image"))
     
    );
  }

  uploadImage(model: ImageAddDTO, selectedFile: File): Observable<number> {
    
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("imageAddDTO", JSON.stringify(model)); 
    return this.http.post<number>(this.imagesUrl, formData).pipe(catchError(this.handleError<number>("Uploading an image", -1)));
  }

  updateImage(id: number, selectedFile: File | undefined, model: any) {
    const url = this.imagesUrl + `/${id}`;
    const formData = new FormData();
    if (selectedFile)
    {
      formData.append("image", selectedFile);
    }
    formData.append("imageModifyDTO", JSON.stringify(model));
    return this.http.put(url, formData).pipe(catchError(this.handleError("Updating an image", "")));
  }

  getCount(searchParams?:string): Observable<number> {
    let httpParams;
    
    if (searchParams)
    {
      httpParams = new HttpParams().set("searchParams", searchParams);
    }
    return this.http.get<number>(this.imagesUrl + "/count", {params: httpParams}).pipe(catchError(this.handleError<number>("Getting count", 0))); 
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
}
