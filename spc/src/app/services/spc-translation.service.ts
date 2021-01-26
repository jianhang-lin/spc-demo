import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationService } from 'shared-ui';

@Injectable({
  providedIn: 'root'
})
export class SpcTranslationService extends TranslationService {

    private widgetNames = ['user-administration-ui-users-list-widget', 'user-administration-ui-sign-in-widget'];

    getTranslation(): Observable<any> {
        return super.getTranslation(this.widgetNames);
    }
}
