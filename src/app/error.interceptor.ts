import {HttpEvent,HttpHandler,HttpRequest,HttpErrorResponse,HttpInterceptor} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export class ErrorIntercept implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    //let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        //errorMessage = `Error: ${error.error.message}`;
                        return Observable.throw("client Side Error: "+error.message);
                    } else {
                        //errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
                        return Observable.throw('SERVER ERROR:'+error.message+'!!\t'||"server side error");
                    }
                })
            )
    }
}