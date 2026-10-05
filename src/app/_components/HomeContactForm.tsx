"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export function HomeContactForm() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [company, setCompany] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    const mutation = api.services.submitContactForm.useMutation({
        onSuccess: (data) => {
            setStatusMessage(data.message);
            setName("");
            setPhone("");
            setCompany("");
        },
        onError: (error) => {
            setStatusMessage(error.shape?.message ?? "Произошла ошибка при отправке.");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMessage("");
        mutation.mutate({
            name,
            phone,
            company,
            email: "from-main-page@baltex.ru",
            message: `Заявка на экспресс-аудит. Компания/Ниша: ${company || "Не указана"}`,
        });
    };

    return (
        <section style={{
            padding: "6rem 2rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            background: "radial-gradient(ellipse at bottom, rgba(0, 112, 243, 0.04) 0%, rgba(0,0,0,0) 70%)",
            margin: "4rem 0 0 0",
            textAlign: "center"
        }}>
            <div style={{ maxWidth: "640px", margin: "0 auto" }}>

                {/* Дорогой заголовок с уменьшенным межбуквенным интервалом */}
                <h2 style={{
                    fontSize: "2.75rem",
                    fontWeight: "900",
                    marginBottom: "1.25rem",
                    letterSpacing: "-0.04em",
                    color: "#fff",
                    lineHeight: "1.1"
                }}>
                    Получить бесплатный аудит
                </h2>

                <p style={{
                    color: "rgba(255, 255, 255, 0.5)",
                    marginBottom: "4rem",
                    fontSize: "1.05rem",
                    lineHeight: "1.6",
                    fontWeight: "400",
                    letterSpacing: "-0.01em"
                }}>
                    Оставьте контакты. Мы удаленно подключимся к вашей 1С, найдём скрытые налоговые риски и сформируем персональный план оптимизации учета.
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem", textAlign: "left" }}>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
                        {/* Поле: Имя */}
                        <div style={{ position: "relative" }}>
                            <label className="premium-label">
                                Ваше имя <span style={{ color: "#0070f3" }}>*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="premium-input"
                                placeholder="Константин"
                            />
                        </div>

                        {/* Поле: Телефон */}
                        <div style={{ position: "relative" }}>
                            <label className="premium-label">
                                Телефон <span style={{ color: "#0070f3" }}>*</span>
                            </label>
                            <input
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="premium-input"
                                placeholder="+7 (999) 123-45-67"
                            />
                        </div>
                    </div>

                    {/* Поле: Компания */}
                    <div style={{ position: "relative" }}>
                        <label className="premium-label">
                            Компания или направление бизнеса
                        </label>
                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="premium-input"
                            placeholder="Продажи на Ozon / Производство оборудования"
                        />
                    </div>

                    {/* Премиальная глянцевая кнопка */}
                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="premium-button"
                    >
                        {mutation.isPending ? "Регистрация ТЗ..." : "Получить план оптимизации"}
                    </button>

                    {/* Статус отправки */}
                    {statusMessage && (
                        <div style={{
                            padding: "1.25rem",
                            borderRadius: "14px",
                            fontSize: "0.95rem",
                            fontWeight: "500",
                            letterSpacing: "-0.01em",
                            textAlign: "center",
                            border: mutation.isSuccess ? "1px solid rgba(74, 222, 128, 0.15)" : "1px solid rgba(248, 113, 113, 0.15)",
                            backgroundColor: mutation.isSuccess ? "rgba(74, 222, 128, 0.02)" : "rgba(248, 113, 113, 0.02)",
                            color: mutation.isSuccess ? "#4ade80" : "#f87171",
                            marginTop: "0.5rem"
                        }}>
                            {statusMessage}
                        </div>
                    )}
                </form>
            </div>

            {/* Профессиональные глобальные CSS-эффекты для интерактивности */}
            <style jsx global>{`
        .premium-label {
          display: block;
          zoom: 1;
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.75rem;
        }

        .premium-input {
          width: 100%;
          box-sizing: border-box;
          background-color: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 1.1rem 1.5rem;
          color: #fff;
          font-size: 1rem;
          font-weight: 400;
          letter-spacing: -0.01em;
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
        }

        .premium-input:focus {
          border-color: #0070f3;
          background-color: rgba(0, 112, 243, 0.01);
          box-shadow: 0 0 0 4px rgba(0, 112, 243, 0.15);
        }

        .premium-input::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }

        .premium-button {
          width: 100%;
          background: linear-gradient(180deg, #0070f3 0%, #0056b3 100%);
          border: 1px solid #0070f3;
          border-radius: 14px;
          color: #fff;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          padding: 1.1rem;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(0, 112, 243, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transition: transform 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease;
        }

        .premium-button:hover {
          filter: brightness(1.1);
          box-shadow: 0 6px 24px rgba(0, 112, 243, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .premium-button:active {
          transform: scale(0.99);
        }

        .premium-button:disabled {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.3);
          cursor: not-allowed;
          box-shadow: none;
        }
      `}</style>
        </section>
    );
}
