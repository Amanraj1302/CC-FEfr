import * as Yup from "yup";

export const projectValidationSchema = Yup.object().shape({
  projectName: Yup.string().required("Project name is required"),
  typeOfProject: Yup.string().required("Type of project is required"),
  description: Yup.string().required("Project description is required"),

  castingStart: Yup.date().required("Casting start date is required"),
  castingEnd: Yup.date()
    .required("Casting end date is required")
    .min(Yup.ref("castingStart"), "End date must be after start date"),

  castingCity: Yup.string().required("Casting city is required"),
  castingState: Yup.string().required("Casting state is required"),
  castingCountry: Yup.string().required("Casting country is required"),

  shootingStart: Yup.date().required("Shooting start date is required"),
  shootingEnd: Yup.date()
    .required("Shooting end date is required")
    .min(Yup.ref("shootingStart"), "End date must be after start date"),

  shootingCity: Yup.string().required("Shooting city is required"),
  shootingState: Yup.string().required("Shooting state is required"),
  shootingCountry: Yup.string().required("Shooting country is required"),

  role: Yup.string().required("Role is required"),
  gender: Yup.string().required("Gender is required"),
  ageRange: Yup.string().required("Age range is required"),
  language: Yup.string().required("Language is required"),

  bannerPdf: Yup.mixed()
    .required("Please upload a PDF banner")
    .test("fileOrString", "Please upload a PDF banner", (value) => {
      if (!value) return false;
      if (typeof value === "string") return true; // existing file is fine
      return value instanceof File;
    })
    .test("fileSize", "PDF file size must be ≤ 5MB", (file) => {
      if (!file || typeof file === "string") return true;
      return file.size <= 1024 * 1024 * 5;
    })
    .test("fileType", "Only PDF format is allowed", (file) => {
      if (!file || typeof file === "string") return true;
      return file.type === "application/pdf";
    }),

  bannerImage: Yup.mixed()
    .required("Please upload an image banner")
    .test("fileOrString", "Please upload an image banner", (value) => {
      if (!value) return false;
      if (typeof value === "string") return true;
      return value instanceof File;
    })
    .test("fileSize", "Image file size must be ≤ 2MB", (file) => {
      if (!file || typeof file === "string") return true;
      return file.size <= 1024 * 1024 * 2;
    })
    .test("fileType", "Only JPG or PNG format is allowed", (file) => {
      if (!file || typeof file === "string") return true;
      return ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(file.type);
    }),
});
