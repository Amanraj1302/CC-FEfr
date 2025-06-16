const FORM_KEY = "multiPageFormData";

export const saveFormData = (data: Record<string, any>) => {
  try {
    localStorage.setItem("multiPageFormData", JSON.stringify(data));
  } catch (err) {
    console.error("Failed to save to localStorage:", err);
  }
};
export const getFormData = () => {
  const saved = localStorage.getItem(FORM_KEY);
  return saved ? JSON.parse(saved) : {};
};

export const clearFormData = () => {
  localStorage.removeItem(FORM_KEY);
};
