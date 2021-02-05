import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MonitorGroup } from '../../domain/monitor-group.model';
import { FormState } from '../../domain/form-state.model';

export class MonitorGroupForm extends FormGroup {
    constructor(monitorGroup?: MonitorGroup, formState?: FormState) {
        super({
          collectSchema: new FormControl(monitorGroup && monitorGroup.collectSchema ? monitorGroup.collectSchema : ''),
          collectionSchema: new FormControl(monitorGroup && monitorGroup.collectionSchema ? monitorGroup.collectionSchema : ''),
          collectionDatasource: new FormControl(monitorGroup && monitorGroup.collectionDatasource ? monitorGroup.collectionDatasource : ''),
          communitId: new FormControl(monitorGroup && monitorGroup.communitId ? monitorGroup.communitId : null),
          configDatasource: new FormControl(monitorGroup && monitorGroup.configDatasource ? monitorGroup.configDatasource : ''),
          configSchema: new FormControl(monitorGroup && monitorGroup.configSchema ? monitorGroup.configSchema : ''),
          datasourceType: new FormControl(monitorGroup && monitorGroup.datasourceType ?
            monitorGroup.datasourceType : '', [Validators.required]),
          description: new FormControl(monitorGroup && monitorGroup.description ? monitorGroup.description : ''),
          engineServer: new FormControl(monitorGroup && monitorGroup.engineServer ? monitorGroup.engineServer : ''),
          engineServerPort: new FormControl(monitorGroup && monitorGroup.engineServerPort ? monitorGroup.engineServerPort : ''),
          id: new FormControl(monitorGroup && monitorGroup.id ? monitorGroup.id : null),
          mdsUrl: new FormControl(monitorGroup && monitorGroup.mdsUrl ? monitorGroup.mdsUrl : ''),
          name: new FormControl(monitorGroup && monitorGroup.name ? monitorGroup.name : '', [Validators.required]),
          netUserId: new FormControl(monitorGroup && monitorGroup.netUserId ? monitorGroup.netUserId : '', [Validators.required]),
          offSet: new FormControl(monitorGroup && monitorGroup.offSet ? monitorGroup.offSet : null),
          plant: new FormControl(monitorGroup && monitorGroup.plant ? monitorGroup.plant : ''),
          sendMds: new FormControl(monitorGroup && monitorGroup.sendMds ? monitorGroup.sendMds : false),
          sendMfg: new FormControl(monitorGroup && monitorGroup.sendMfg ? monitorGroup.sendMfg : false),
          sendSfdc: new FormControl(monitorGroup && monitorGroup.sendSfdc ? monitorGroup.sendSfdc : false),
          sfdcIp: new FormControl(monitorGroup && monitorGroup.sfdcIp ? monitorGroup.sfdcIp : ''),
          sfdcTimezone: new FormControl(monitorGroup && monitorGroup.sfdcTimezone ? monitorGroup.sfdcTimezone : '', [Validators.required]),
          sfdcWebService: new FormControl(monitorGroup && monitorGroup.sfdcWebService ? monitorGroup.sfdcWebService : ''),
          position: new FormControl(monitorGroup && monitorGroup.position ? monitorGroup.position : null),
        });
    }

    public isFieldValid(field: string) {
        return !this.get(field).valid && this.get(field).touched;
    }

    public isFieldRequired(field: string) {
        this.updateValueAndValidity();
        return this.controls[field].errors && this.controls[field].errors.required && this.get(field).touched;
    }

    setCustomerValue(customerDto, customerName) {
        // this.get('customer').setValue(customerDto);
        // this.get('customerLabel').setValue(customerName);
    }

    setSiteValue(currentSite, siteName) {
        // this.get('siteDto').setValue(currentSite);
        // this.get('siteLabel').setValue(siteName);
    }

    public formHasValues() {
        const formValue = this.value;
        const formHasSomeValues = Object.keys(formValue).some((key) => {
            return formValue[key] ? (Array.isArray(formValue[key]) ? (formValue[key] ? true : false) : formValue[key]) : false;
        });
        return formHasSomeValues;
    }
}
