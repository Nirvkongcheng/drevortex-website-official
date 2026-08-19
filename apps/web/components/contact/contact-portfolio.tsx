"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Circle,
  Chrome,
  Github,
  Eye,
  EyeOff,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  PhoneCall,
  MailOpen,
} from "lucide-react";

// ── StepItem: 步骤项 ──
function StepItem({
  number,
  text,
  active = false,
}: {
  number: string;
  text: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl px-6 py-4 transition-all ${
        active
          ? "bg-white text-black border border-white"
          : "bg-[#1A1A1A] text-white border-none"
      }`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
          active ? "bg-black text-white" : "bg-white/10 text-white/40"
        }`}
      >
        {number}
      </span>
      <span className="text-base font-medium">{text}</span>
    </div>
  );
}

// ── SocialButton: 社交登录按钮 ──
function SocialButton({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 bg-black border border-white/10 rounded-xl h-12 text-sm font-medium text-white hover:bg-white/5 transition-colors"
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

// ── InputGroup: 输入框组 ──
function InputGroup({
  label,
  placeholder,
  type = "text",
  id,
  value,
  onChange,
  required,
  inputMode,
  autoComplete,
}: {
  label: string;
  placeholder: string;
  type?: string;
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  inputMode?: "text" | "email" | "tel" | "numeric";
  autoComplete?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-white">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        inputMode={inputMode}
        autoComplete={autoComplete}
        className="w-full bg-[#1A1A1A] border-none rounded-xl h-11 px-4 text-white placeholder:text-white/20 focus:ring-2 focus:ring-white/20 outline-none transition-all"
      />
    </div>
  );
}

// ── 主组件 ──
export function ContactPortfolio() {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [verifyHint, setVerifyHint] = useState(
    '点击"获取验证码"，我们将为你在此手机号发送验证码进行验证',
  );
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 手机号验证
  const isValidChinaMobile = (p: string) => /^1[3-9]\d{9}$/.test(p.replace(/\s+/g, ""));

  const handleGetCode = () => {
    const normalized = phone.replace(/\s+/g, "");
    setPhoneError("");
    if (!isValidChinaMobile(normalized)) {
      setPhoneError("请输入正确的手机号（例如：1XXXXXXXXXX）。");
      return;
    }
    if (cooldown > 0) return;
    setVerifyHint("验证码已发送（前端模拟），请填写收到的6位数字。");
    setCooldown(60);
    cooldownRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          if (cooldownRef.current) clearInterval(cooldownRef.current);
          setVerifyHint('你可以再次点击"获取验证码"。');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = phone.replace(/\s+/g, "");
    setPhoneError("");
    if (!isValidChinaMobile(normalized)) {
      setPhoneError("请输入正确的手机号后再提交。");
      return;
    }
    if (!code.trim()) {
      setVerifyHint("请先获取验证码并填写验证码。");
      return;
    }
    setVerifyHint("咨询内容已记录，正式 API 接入后将走真实提交链路。");
  };

  return (
    <main className="flex min-h-screen w-full bg-black text-white selection:bg-white/30 p-2 transition-all duration-500 lg:h-screen lg:overflow-hidden lg:p-4">
      {/* ════ Left Column: Hero & Background Video ════ */}
      <div className="relative hidden lg:flex lg:w-[52%] flex-col items-center justify-center rounded-3xl overflow-hidden shadow-2xl h-full px-16 py-20"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.5) 100%), url(/legacy/home/hero-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Background Video - 无遮罩 */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_081238_406ed0e3-5d83-436e-a512-0bbff7ec5b95.mp4"
            type="video/mp4"
          />
        </video>

        {/* 主内容容器 - 垂直居中，大间距分布 */}
        <motion.div
          className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
        >
          {/* 品牌标识 */}
          <motion.div
            className="flex items-center gap-3 mb-20"
            initial={{ opacity: 0, y: -10, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Circle className="h-7 w-7 fill-white text-white" />
            <span className="text-2xl font-semibold tracking-tight">Drevortex</span>
          </motion.div>

          {/* 装饰引导线 */}
          <motion.div
            className="flex items-center gap-4 mb-10"
            initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="h-px w-16 bg-white/40" />
            <span className="text-sm font-medium uppercase tracking-[0.4em] text-white/60">
              Get in touch
            </span>
            <span className="h-px w-16 bg-white/40" />
          </motion.div>

          {/* 大标题 */}
          <motion.h1
            className="text-7xl xl:text-8xl font-medium tracking-tight leading-[1.05] mb-10"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            联系我们
          </motion.h1>

          {/* 描述文字 */}
          <motion.p
            className="text-white/70 text-lg xl:text-xl leading-relaxed max-w-lg mb-20"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            期待与您合作 · Follow these 3 quick phases to activate your space.
          </motion.p>

          {/* 步骤项 */}
          <motion.div
            className="flex flex-col gap-5 w-full max-w-md mb-20"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <StepItem number="1" text="在线咨询服务" active />
            <StepItem number="2" text="电话快速响应" />
            <StepItem number="3" text="邮件详细沟通" />
          </motion.div>

          {/* 分割线 */}
          <motion.div
            className="w-full max-w-md h-px bg-white/15 mb-10"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.8 }}
          />

          {/* 联系信息 - 2x2 网格 */}
          <motion.div
            className="grid grid-cols-2 gap-x-12 gap-y-5 max-w-md w-full"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <div className="flex items-center gap-3 text-base text-white/70 justify-self-end">
              <MapPin className="h-5 w-5 flex-shrink-0 text-white/50" />
              <span>地址：XXX</span>
            </div>
            <div className="flex items-center gap-3 text-base text-white/70 justify-self-start">
              <Phone className="h-5 w-5 flex-shrink-0 text-white/50" />
              <span>电话：XXX</span>
            </div>
            <div className="flex items-center gap-3 text-base text-white/70 justify-self-end">
              <Mail className="h-5 w-5 flex-shrink-0 text-white/50" />
              <a href="mailto:drevortex@163.com" className="hover:text-white transition-colors">
                drevortex@163.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-base text-white/70 justify-self-start">
              <Clock className="h-5 w-5 flex-shrink-0 text-white/50" />
              <span>周一至周五 9:00-18:00</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ════ Right Column: Sign Up Form ════ */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 lg:py-6 px-4 sm:px-12 lg:px-16 xl:px-24 overflow-y-auto lg:overflow-hidden">
        <motion.div
          className="w-full max-w-xl space-y-8 lg:space-y-6 sm:space-y-10"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-3xl font-medium tracking-tight">在线咨询</h2>
            <p className="text-white/40 text-sm">
              Input your basic details to begin the journey. · 输入您的基本信息以开始沟通
            </p>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <SocialButton icon={Chrome} label="Google" />
            <SocialButton icon={Github} label="Github" />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px border-t border-white/10" />
            <span className="bg-black px-4 text-xs font-medium text-white/40 uppercase tracking-widest">
              Or
            </span>
            <div className="flex-1 h-px border-t border-white/10" />
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* 姓名 + 邮箱 */}
            <div className="grid grid-cols-2 gap-4">
              <InputGroup
                id="firstName"
                label="姓名"
                placeholder="您的姓名"
                required
              />
              <InputGroup
                id="email"
                label="邮箱"
                placeholder="您的邮箱"
                type="email"
                required
              />
            </div>

            {/* 手机号 + 验证码 */}
            <div className="space-y-2">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-white">
                手机号
              </label>
              <div className="flex gap-2">
                <input
                  id="phoneNumber"
                  type="tel"
                  placeholder="您的手机号"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  className="flex-1 bg-[#1A1A1A] border-none rounded-xl h-11 px-4 text-white placeholder:text-white/20 focus:ring-2 focus:ring-white/20 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={handleGetCode}
                  disabled={cooldown > 0}
                  className="flex-shrink-0 px-4 h-11 bg-white/10 text-white text-sm font-medium rounded-xl hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {cooldown > 0 ? `${cooldown}秒后重试` : "获取验证码"}
                </button>
              </div>
              {phoneError && (
                <p className="text-red-400 text-xs">{phoneError}</p>
              )}
            </div>

            {/* 验证码 */}
            <div className="space-y-2">
              <label htmlFor="verifyCode" className="block text-sm font-medium text-white">
                验证码
              </label>
              <div className="relative">
                <input
                  id="verifyCode"
                  type={showPassword ? "text" : "password"}
                  placeholder="验证码"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  className="w-full bg-[#1A1A1A] border-none rounded-xl h-11 px-4 pr-12 text-white placeholder:text-white/20 focus:ring-2 focus:ring-white/20 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-white/40 text-xs">{verifyHint}</p>
            </div>

            {/* 留言内容 */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-white">
                留言内容
              </label>
              <textarea
                id="message"
                placeholder="请输入您的留言内容"
                rows={4}
                required
                className="w-full bg-[#1A1A1A] border-none rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:ring-2 focus:ring-white/20 outline-none transition-all resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-14 bg-white text-black font-semibold rounded-xl hover:bg-white/90 active:scale-[0.98] mt-4 transition-all flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" />
              提交咨询
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-sm text-white/40">
            已经是合作伙伴？{" "}
            <a href="mailto:drevortex@163.com" className="text-white hover:text-white/80 underline underline-offset-4 transition-colors">
              直接联系我们
            </a>
          </p>

          {/* Mobile-only contact info */}
          <div className="lg:hidden space-y-3 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3 text-sm text-white/60">
              <MessageSquare className="h-4 w-4 flex-shrink-0" />
              <span>在线咨询服务</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/60">
              <PhoneCall className="h-4 w-4 flex-shrink-0" />
              <span>电话快速响应</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/60">
              <MailOpen className="h-4 w-4 flex-shrink-0" />
              <span>邮件详细沟通</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/60">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>地址：XXX</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/60">
              <Mail className="h-4 w-4 flex-shrink-0" />
              <a href="mailto:drevortex@163.com" className="hover:text-white transition-colors">
                邮箱：drevortex@163.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/60">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span>工作时间：周一至周五 9:00 - 18:00</span>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
