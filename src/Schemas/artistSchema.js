import * as Yup from "yup";


 export const personalSchema = Yup.object().shape({
  fullName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  whatsapp: Yup.string().required("Required"),
  calling: Yup.string().required("Required"),
  shortBio: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  language: Yup.string().required("Required"),
  homeCity: Yup.string().required("Required"),
  homeState: Yup.string().required("Required"),
  currentCity: Yup.string().required("Required"),
  currentState: Yup.string().required("Required"),
  // instagram: Yup.string().url("Invalid URL"),
  // youtube: Yup.string().url("Invalid URL"),
  // twitter: Yup.string(),
  // linkedin: Yup.string().url("Invalid URL")     
});

export const professionalSchema = Yup.object().shape({
  talentCategory: Yup.string().required("Talent Category is required"),
  height: Yup.string().required("Height is required"),
  age: Yup.number().typeError("Age must be a number").required("Age is required"),
  screenAge: Yup.number().typeError("Screen Age must be a number").required("Screen Age is required"),
  videoReel: Yup.string().url("Enter a valid YouTube URL").required("Video reel link is required"),
  skills: Yup.array().of(Yup.string()).min(1, "Select at least one skill"),
  pastProjects: Yup.array().of(
    Yup.object().shape({
      projectName: Yup.string().required("Project name is required"),
      role: Yup.string().required("Role is required"),
      workLink: Yup.string().url("Enter a valid YouTube URL").required("Work link is required"),
    })
  )
});
 export const monologueSchema = Yup.object({
  haryanvi: Yup.string().url("Enter a valid URL").nullable(),
  rajasthani: Yup.string().url("Enter a valid URL").nullable(),
  bhojpuri: Yup.string().url("Enter a valid URL").nullable(),
  awadhi: Yup.string().url("Enter a valid URL").nullable(),
  maithili: Yup.string().url("Enter a valid URL").nullable(),
});