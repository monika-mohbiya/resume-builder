import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const canActivateGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);

  if (!isBrowser) {
    return false;
  } else {
    // const token = localStorage.getItem('Access Token:')
    const token = localStorage.getItem('accessToken')

    if (token) {
      return true;
    } else {
      router.navigateByUrl('/login');
      return false;
    }
  }



};
