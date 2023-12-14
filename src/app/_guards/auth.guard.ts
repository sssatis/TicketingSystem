import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/accountService';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

// правила маршрутизації
export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toast = inject(ToastrService);  
  return accountService.currentUser$.pipe(
    map(user=>{
      if(user) return true;
      toast.error("Необхідно увійти в акаунт!");
      return false;
    })
  );
};
