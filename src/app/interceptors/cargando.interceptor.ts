import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { BlockUIService, BLOCKUI_DEFAULT, NgBlockUI, BlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
declare let alertify: any;

@Injectable()
export class CargandoInterceptor implements HttpInterceptor {
  @BlockUI() blockUI: NgBlockUI;
  constructor(
    private router: Router,
    private toast: ToastrService,
    // private blockUI: BlockUIService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    // this.blockUI.start(BLOCKUI_DEFAULT);
    this.blockUI.start();
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {

        // this.blockUI.stop(BLOCKUI_DEFAULT);

        this.blockUI.stop();
        if (event instanceof HttpResponse) {
          console.log('event:: ', event);

          if (event.status !== 200) {
            this.toast.error('La cagaste!', 'Not Toastr fun!', {
              timeOut: 3000,
            });
          } else {
            this.toast.success('tremendo!', 'Toastr fun!');
          }
        }
        return event;
      }),
      catchError((err) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
        return throwError(err);
      })
    );
  }
}
