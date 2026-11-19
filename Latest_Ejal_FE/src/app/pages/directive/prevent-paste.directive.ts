import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appPreventPaste]', // Use this selector to apply the directive
})
export class PreventPasteDirective {
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault(); // Prevent the paste action
    alert('Pasting is not allowed in this field.');
  }
}
