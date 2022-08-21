import {EInspectionStatus} from './../enum/inspection-status.enum';
import {EUserStatus} from './../enum/user-status.emun';
import {EUserRole} from './../enum/user-role.enum';
import {EGender} from './../enum/gender.enum';
import {IGenValue} from './../model/status.model';

export const findObject = (val: EGender | EUserStatus | EInspectionStatus | EUserRole, array: IGenValue<EGender | EUserRole | EUserStatus | EInspectionStatus>[]) => {
  return array.find(({ value }) => val === value);
}
