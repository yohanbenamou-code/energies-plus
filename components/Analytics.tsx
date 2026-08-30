"use client";

import Script from "next/script";

/**
 * Emplacements de tracking. Chaque script ne se charge que si la variable
 * d'environnement correspondante est définie (voir .env.example) :
 *   - NEXT_PUBLIC_GTM_ID            : Google Tag Manager
 *   - NEXT_PUBLIC_META_PIXEL_ID    : Meta Pixel (événement "Lead" sur /merci)
 *   - NEXT_PUBLIC_GADS_CONVERSION_ID : Google Ads (gtag)
 *
 * TODO: placeholder à remplacer par Yohan/Énergies Plus — renseigner les IDs.
 */
export function Analytics() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const gadsId = process.env.NEXT_PUBLIC_GADS_CONVERSION_ID;

  return (
    <>
      {gtmId ? (
        <Script id="gtm-base" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      ) : null}

      {metaPixelId ? (
        <Script id="meta-pixel-base" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId}');
fbq('track', 'PageView');`}
        </Script>
      ) : null}

      {gadsId ? (
        <>
          <Script
            id="gads-lib"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gadsId}`}
          />
          <Script id="gads-base" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gadsId}');`}
          </Script>
        </>
      ) : null}
    </>
  );
}
