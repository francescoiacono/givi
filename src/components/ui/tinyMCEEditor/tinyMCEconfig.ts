export const config = {
  min_height: 500,
  menubar: false,
  elementpath: false,
  plugins: [
    'advlist',
    'autolink',
    'lists',
    'link',
    'image',
    'charmap',
    'preview',
    'anchor',
    'searchreplace',
    'visualblocks',
    'fullscreen',
    'insertdatetime',
    'media',
    'table',
    'wordcount'
  ],
  toolbar:
    'undo redo | blocks | ' +
    'bold italic forecolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
  content_style:
    'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }'
};
