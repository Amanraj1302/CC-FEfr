import * as Yup from "yup";

export const personalSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  whatsapp: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Enter a valid phone number")
    .required("WhatsApp number is required"),
  calling: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Enter a valid phone number")
    .required("Calling number is required"),
  shortBio: Yup.string()
    .min(10, "Too short")
    .max(300, "Too long")
    .required("Short bio is required"),
  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Invalid gender")
    .required("Gender is required"),
  language: Yup.string().required("Language is required"),
  homeCity: Yup.string().required("Home city is required"),
  homeState: Yup.string().required("Home state is required"),
  currentCity: Yup.string().required("Current city is required"),
  currentState: Yup.string().required("Current state is required"),
  instagram: Yup.string()
    .url("Enter a valid URL")
    .required("Instagram link is required"),
  youtube: Yup.string()
    .url("Enter a valid URL")
    .required("YouTube link is required"),
  twitter: Yup.string()
    .url("Enter a valid URL")
    .required("Twitter link is required"),
  linkedin: Yup.string()
    .url("Enter a valid URL")
    .required("LinkedIn link is required"),
});

export const professionalSchema = Yup.object().shape({
  talentCategory: Yup.string().required("Talent category is required"),
  height: Yup.string().matches(/^\d{2,3}\s?(cm|in)?$/, "Enter valid height like 170 cm").required("Height is required"),
  age: Yup.number().typeError("Age must be a number").min(1).max(100).required("Age is required"),
  screenAge: Yup.number().typeError("Screen age must be a number").min(1).max(100).required("Screen age is required"),
  videoReel: Yup.string().url("Enter a valid video URL").required("Video reel link is required"),
  skills: Yup.array().of(Yup.string().min(2)).min(1, "Select at least one skill"),
  pastProjects: Yup.array().of(
    Yup.object().shape({
      projectName: Yup.string().required("Project name is required"),
      role: Yup.string().required("Role is required"),
      workLink: Yup.string().url("Enter a valid work link").required("Work link is required"),
    })
  ),
});


const FILE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/webp"];

const fileValidation = Yup.mixed()
  .required("This field is required")
  .test("fileSize", "File too large (max 5MB)", value => value && value.size <= FILE_SIZE)
  .test("fileFormat", "Unsupported file format", value => value && SUPPORTED_FORMATS.includes(value.type));

const optionalFileValidation = Yup.mixed()
  .nullable()
  .notRequired()
  .test("fileSize", "File too large (max 5MB)", value => !value || value.size <= FILE_SIZE)
  .test("fileFormat", "Unsupported file format", value => !value || SUPPORTED_FORMATS.includes(value.type));

export const uploadPhotosSchema = Yup.object().shape({
  headshot: fileValidation.label("Headshot"),
  smilingHeadshot: fileValidation.label("Smiling Headshot"),
  fullBody: fileValidation.label("Full Body Shot"),
  threeQuarter: fileValidation.label("Three-Quarter Shot"),
  profile: optionalFileValidation.label("Profile Shot (Optional)"),
});


export const monologueSchema = Yup.object({
  haryanvi: Yup.string().url("Enter a valid URL").nullable(),
  rajasthani: Yup.string().url("Enter a valid URL").nullable(),
  bhojpuri: Yup.string().url("Enter a valid URL").nullable(),
  awadhi: Yup.string().url("Enter a valid URL").nullable(),
  maithili: Yup.string().url("Enter a valid URL").nullable(),
});
