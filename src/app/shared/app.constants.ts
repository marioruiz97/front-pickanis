import { MatDialogConfig } from "@angular/material/dialog";

export const DIALOG_CONFIG: MatDialogConfig = {
  disableClose: true,
  maxWidth: '100vw',
  minWidth: '50vw',
};

/**
 * solo es obligatorio el width ya que es mas probable que solo cambie este, el height por defecto es el tamano del contenido
 * @param minWidth
 * @param maxWidth
 * @param minHeight
 * @param maxHeight
 * @returns un objeto de tipo @MatDialogConfig
 */
export const customConfig = (minWidth: string, minHeight?: string, maxWidth: string = '100vw', maxHeight: string = '100vh') => {
  const dialogConfig: MatDialogConfig = {
    disableClose: true,
    minWidth,
    maxWidth,
    maxHeight
  }
  if (minHeight) {
    dialogConfig.minHeight = minHeight;
  }
  return dialogConfig;
}
