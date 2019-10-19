// Detail list see https://www.tinymce.com/docs/advanced/editor-control-identifiers/#toolbarcontrols

const toolbar = [
  // tslint:disable-next-line: max-line-length
  'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | blockquote subscript superscript',
  // tslint:disable-next-line: max-line-length
  'alignleft aligncenter alignright alignjustify | outdent indent | hr numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | link image pagebreak insertdatetime | fullscreen preview',
];

export default toolbar;

const menubar = 'file edit insert view format table';

export { menubar };
