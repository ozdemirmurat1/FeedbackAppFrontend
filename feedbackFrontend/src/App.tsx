import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import type { FeedbackForm } from "./models/feedbackForm";
import { sendFeedback } from "./services/feedbackService";
import { handleApiError } from "./services/errorHandler";

function App() {
  const [form, setForm] = useState<FeedbackForm>({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {

      const response = await sendFeedback(form);

      if (response.status === 200 && response.data?.message) {
        toast.success(response.data.message);
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.warning("Beklenmeyen bir yanıt alındı.");
      }
    } catch (error: unknown) {

      handleApiError(error);

      // BU KIISM BACKENDDE EXCEPTİONHANDLE MİDDLEWARE AKTİF EDİLMEDĞİNDE ÇALIŞIR

      // const err = error as AxiosError<{ message: string }>;
      // if (err.response?.data?.message) {
      //   toast.error(err.response.data.message);
      // } else {
      //   toast.error("Sunucuya bağlanılamadı.");
      // }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "50px auto", fontFamily: "Arial" }}>
      <h2>Geri Bildirim Formu</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Adınız:</label><br />
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Email:</label><br />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Mesaj:</label><br />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <button type="submit" disabled={loading} style={{ padding: "10px 20px" }}>
          {loading ? "Gönderiliyor..." : "Gönder"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
