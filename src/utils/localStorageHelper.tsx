const FORM_KEYS = {
  page1: "multiPageFormData_page1",
  page2: "multiPageFormData_page2",
  page3: "multiPageFormData_page3",
  page4: "multiPageFormData_page4",
};

export const saveFormData = (page: keyof typeof FORM_KEYS, data: Record<string, any>) => {
  try {
    localStorage.setItem(FORM_KEYS[page], JSON.stringify(data));
  } catch (err) {
    console.error(`Failed to save ${page} to localStorage:`, err);
  }
};

export const getFormData = (page: keyof typeof FORM_KEYS) => {
  const saved = localStorage.getItem(FORM_KEYS[page]);
  return saved ? JSON.parse(saved) : {};
};

export const clearAllFormData = () => {
  Object.values(FORM_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
};
