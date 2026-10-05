"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [company, setCompany] = useState("");
    const [message, setMessage] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    const mutation = api.services.submitContactForm.useMutation({
        onSuccess: (data) => {
            setStatusMessage(data.message);
            setName("");
            setEmail("");
            setPhone("");
            setCompany("");
            setMessage("");
        },
        onError: (error) => {
            setStatusMessage(error.shape?.message ?? "Произошла непредвиденная ошибка. Попробуйте позже.");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMessage("");
        mutation.mutate({ name, email, phone, company, message });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-6 border border-white/5 bg-white/[0.01] p-8 sm:p-10 rounded-3xl backdrop-blur-md">
            <div>
                <h3 className="text-2xl font-black text-white tracking-tight mb-1">Начать сотрудничество</h3>
                <p className="text-sm text-white/50">Заполните экспресс-бриф, и мы сразу включимся в задачу.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">
                        Ваше имя <span className="text-[#0070f3]">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/[0.015] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm outline-none focus:border-[#0070f3] focus:ring-4 focus:ring-[#0070f3]/10 transition-all placeholder:text-white/20"
                        placeholder="Константин"
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">
                        Телефон <span className="text-[#0070f3]">*</span>
                    </label>
                    <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white/[0.015] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm outline-none focus:border-[#0070f3] focus:ring-4 focus:ring-[#0070f3]/10 transition-all placeholder:text-white/20"
                        placeholder="+7 (999) 123-45-67"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">
                        Email для связи <span className="text-[#0070f3]">*</span>
                    </label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/[0.015] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm outline-none focus:border-[#0070f3] focus:ring-4 focus:ring-[#0070f3]/10 transition-all placeholder:text-white/20"
                        placeholder="ceo@company.ru"
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">
                        Компания / Ниша бизнеса
                    </label>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full bg-white/[0.015] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm outline-none focus:border-[#0070f3] focus:ring-4 focus:ring-[#0070f3]/10 transition-all placeholder:text-white/20"
                        placeholder="Продажи на Ozon"
                    />
                </div>
            </div>

            <div>
                <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">
                    Детали задачи или текущие проблемы с учетом <span className="text-[#0070f3]">*</span>
                </label>
                <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white/[0.015] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm outline-none focus:border-[#0070f3] focus:ring-4 focus:ring-[#0070f3]/10 transition-all placeholder:text-white/20 resize-none"
                    placeholder="Опишите ваши обороты, текущую систему налогообложения или требования к интеграциям с 1С..."
                />
            </div>

            <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-gradient-to-b from-[#0070f3] to-[#0056b3] border border-[#0070f3] text-white text-sm font-bold py-3.5 px-4 rounded-xl hover:brightness-110 active:scale-[0.99] disabled:bg-white/5 disabled:border-transparent disabled:text-white/30 transition-all shadow-lg shadow-[#0070f3]/25"
            >
                {mutation.isPending ? "Регистрация спецификации..." : "Отправить бриф эксперту"}
            </button>

            {statusMessage && (
                <div className={`p-4 rounded-xl text-xs font-semibold border text-center ${mutation.isSuccess
                        ? "bg-green-950/20 border-green-900/50 text-green-400"
                        : "bg-red-950/20 border-red-900/50 text-red-400"
                    }`}>
                    {statusMessage}
                </div>
            )}
        </form>
    );
}
