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

  banner: Yup.mixed()
    .required("Please upload a banner")
    .test("fileSize", "File size is too large", (file) =>
      file ? file.size <= 1024 * 1024 * 5 : true // 5MB
    )
    .test("fileType", "Unsupported file format", (file) =>
      file ? ["application/pdf", "image/jpeg", "image/png"].includes(file.type) : true
    ),
});
