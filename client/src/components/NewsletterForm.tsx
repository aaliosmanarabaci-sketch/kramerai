import React from "react";

export const NewsletterForm = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-card rounded-2xl shadow-md w-full sm:w-[480px] mx-auto border">
      <h2 className="text-xl font-semibold mb-2 text-foreground">
        KramerAI Bültenine Katıl
      </h2>
      <p className="text-muted-foreground text-sm mb-4 text-center">
        Yapay zeka ve fikir üretimiyle ilgili güncellemeleri almak ister misiniz?
      </p>

      <form
        action="https://app.us20.list-manage.com/subscribe/post?u=093799661af66a7874f64bd51&amp;id=7a1c4ab2e5&amp;f_id=00fb76eef0"
        method="post"
        target="_blank"
        className="flex flex-col sm:flex-row gap-2 w-full"
      >
        <input
          type="email"
          name="EMAIL"
          required
          placeholder="E-posta adresinizi girin"
          className="flex-1 border border-border rounded-lg p-2 text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 py-2 rounded-lg transition"
        >
          Abone Ol
        </button>
      </form>

      <p className="text-[10px] text-muted-foreground mt-2">
        Mailchimp ile güvenli bir şekilde gönderilir.
      </p>
    </div>
  );
};
