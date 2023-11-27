import { IFormInput, INPUT_TYPE } from "sources-types";

export const postList = [
  {
    title: "test",
    subTitle: "test",
    image: "https://material.angular.io/assets/img/examples/shiba2.jpg",
    alt: "ShiBa Inu",
    content: `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
        A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
        bred for hunting.`,
  },
  {
    title: "test",
    subTitle: "test",
    image: "https://material.angular.io/assets/img/examples/shiba2.jpg",
    alt: "ShiBa Inu",
    content: `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
        A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
        bred for hunting.`,
  },
  {
    title: "test",
    subTitle: "test",
    image: "https://material.angular.io/assets/img/examples/shiba2.jpg",
    alt: "ShiBa Inu",
    content: `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
        A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
        bred for hunting.`,
  },
  {
    title: "test",
    subTitle: "test",
    image: "https://material.angular.io/assets/img/examples/shiba2.jpg",
    alt: "ShiBa Inu",
    content: `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
        A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
        bred for hunting.`,
  },
  {
    title: "test",
    subTitle: "test",
    image: "https://material.angular.io/assets/img/examples/shiba2.jpg",
    alt: "ShiBa Inu",
    content: `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
        A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
        bred for hunting.`,
  },
];

export const postEditFormList: IFormInput[] = [
  {
    id: "content",
    type: INPUT_TYPE.TEXTAREA,
    key: "content",
    label: "Content",
    value: "",
  },
  {
    id: "video",
    type: INPUT_TYPE.TEXT,
    label: "Video Embed URL",
    key: "video",
    value: "",
    placeholder: "Add embed video url",
  },
  {
    id: "image",
    type: INPUT_TYPE.UPLOAD,
    label: "Your Image",
    key: "image",
    value: "",
    placeholder: "Edit image",
    documentPath: "postImage",
    documentCategory: "blog",
  },
];

export const editArticleFormList: IFormInput[] = [
  {
    id: "title",
    type: INPUT_TYPE.TEXT,
    label: "Blog Title",
    key: "title",
    value: "",
    placeholder: "Edit blog title",
  },
  {
    id: "subTitle",
    type: INPUT_TYPE.TEXT,
    label: "Blog SubTitle",
    key: "subTitle",
    value: "",
    placeholder: "Edit blog sub title",
  },
  {
    id: "description",
    type: INPUT_TYPE.TEXTAREA,
    label: "Blog Description",
    key: "description",
    value: "",
  },
];

export const quillEditorModule = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button

    ["link", "image", "video"], // link and image, video
  ],
};
