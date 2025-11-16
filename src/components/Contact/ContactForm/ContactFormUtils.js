export const FORM_INPUTS = [
  {
    label: 'Imię i nazwisko',
    name: 'name',
    translationKey: 'fullName',
    type: 'text',
    minLength: 2,
    maxLength: 120,
  },
  {
    label: 'Email',
    name: 'email',
    translationKey: 'email',
    type: 'email',
    maxLength: 254, // RFC guideline
  },
  {
    label: 'Tytuł',
    name: 'title',
    translationKey: 'subject',
    type: 'text',
    minLength: 3,
    maxLength: 160,
  },
  {
    label: 'Wiadomość',
    name: 'message',
    translationKey: 'message',
    type: 'textarea',
    minLength: 10,
    maxLength: 2000,
  },
]
