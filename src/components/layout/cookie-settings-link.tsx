"use client";

const consentCookie = "lacdia_cookie_consent";

export default function CookieSettingsLink({ label }: { label: string }) {
  const handleClick = () => {
    document.cookie = `${consentCookie}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-sm text-[#8892b0] hover:text-[#f0f4ff] transition-colors text-left"
    >
      {label}
    </button>
  );
}
