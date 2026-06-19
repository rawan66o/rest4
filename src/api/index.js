import axios from "axios";
const api =axios.create
({
    baseURL:import.meta.env.VITE_BASE_URL
    
})
// console.log(import.meta.env.VITE_BASE_URL);
api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
      const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwMTliOTQxMi1iYmEwLTcxOWYtOWYxZC05MmE2MjdiOGQ2NDUiLCJqdGkiOiJlZDc2ZGE1ZTkwZGIwZWExNzc5NjJkMWVmYWU1NzlmZTljNzE0NTE5OTBlZmQ5ZjcxODkzNzYzM2QzZjczN2NjN2FiZDk0Mjc3MWVmZjlkYiIsImlhdCI6MTc4MTAwNjg4OC43MTgyMiwibmJmIjoxNzgxMDA2ODg4LjcxODIyMywiZXhwIjoxNzgxMDkzMjg4LjY4ODU4Niwic3ViIjoiMDE5ZGYzOGYtZTNhYy03MWY1LTgxYjctZjA3ZWNiZGU1NDk4Iiwic2NvcGVzIjpbXX0.guIXFR4L4CeKAemewijwN5dkxWYqS4JGExsCWGOaQ-WM0oO2oous2HsZ7QiM5bPGJ6xCWIhXneog8SF1C_MtPthwt7XJXRdaLoH817TK0l6XYB6pAIN7y4hkiUlEVYQzVrSuq_B1X2x7fVlMrVLU-pwhYBjl1fWwmSD-N1KnmgbZ_h67M7DduWGEW1aCJKhNQFsZSe7vSTN5aLMAhyhGpcqvLYiOBWJR8c3L_JJTms7m_UHIdhoT4h90lWVqjSSZOOxbzFWX_3oqRtrr9VV0DJNJn8A9wyflxl2xgtEY8fdePqQNDSsh6jdsn7Y5Agwy9Q3u-0Wv_HgzBqwNKOPlqWNpHvcDENyLf3_qHWz87Koj5BsImGZZUJ7p2hsSQV5eB1OoyhL6KcVJMLFUY8XKE0OpvjpBrZ0cyg5LtqTZGSZTkgCAIq7howD-bSc6dtvHT_o3lJSErDM3hYMSeW0lhFrIeFyleN-GNaz8tmux-7vCpwDqsW-BrQcyWye0zSZl4vWMumiZXLnrJltQ6FZLhVcWb-qoDW_aVBd7m_L8BVGlKwEFKakBvmJeBf1LydYHjobpDHgk_3thOFI1IFYYs7ZU2GLHQ_PKyzHciEc9TXDly6WyIwEvdQsrJzGag3lu6RemHuEVJEphSOsn7DPuvRO9M1K1rjeTtyB0M-y_NgU";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    
  }
 config.headers.Accept = "application/json";
  return config;
});
export default api;