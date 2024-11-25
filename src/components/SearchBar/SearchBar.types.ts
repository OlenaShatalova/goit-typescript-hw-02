export interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export interface FormElements
  extends HTMLFormControlsCollection {
  search: HTMLInputElement; // типізуємо поле search як HTMLInputElement
}

export interface Form extends HTMLFormElement {
  elements: FormElements; // form.elements типізовані як FormElements
}
