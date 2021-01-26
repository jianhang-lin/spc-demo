import { TranslateLoader } from '@ngx-translate/core';
import { SpcTranslationService } from '../services/spc-translation.service';
import { Observable } from 'rxjs';

export class SpcTranslateLoaderModel extends TranslateLoader {

    constructor(private translationService: SpcTranslationService) {
        super();
    }

    getTranslation(lang: string): Observable<any> {
        return this.translationService.getTranslation();
    }
}
