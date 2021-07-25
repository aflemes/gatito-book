import { FormGroup } from '@angular/forms';

export function novoUsuarioValidator(formGroup: FormGroup){
  const userName = formGroup.get('userName')?.value ?? '';
  const password = formGroup.get('password')?.value ?? '';

  return userName != password ? false : {senhaIgualUsuario: true};
}
