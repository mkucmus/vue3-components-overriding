// CmsText component is exported, and will replace the one from external library
// change the name to CmsImageNew or remove an export and see what happens - the CmsText will be used from base library
export { default as CmsTextNew } from "./CmsText.vue";
// CmsImageNew does not exists in external library, won't replace the base one
export { default as CmsImageNew } from "./CmsImage.vue";

// uncomment line below to override the CmsIcon from base library
// export { default as CmsIcon } from "./CmsIcon.vue";
